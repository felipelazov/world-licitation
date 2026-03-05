-- ============================================================
-- Migration 00004: Monitoramento Automatico de Editais
-- Story 9.1 — Integracao PNCP + Compras.gov
-- ============================================================

-- ===========================
-- ADICIONAR CAMPOS NA TABELA editals
-- ===========================
ALTER TABLE public.editals
  ADD COLUMN IF NOT EXISTS uf TEXT,
  ADD COLUMN IF NOT EXISTS municipio_ibge TEXT,
  ADD COLUMN IF NOT EXISTS relevance_score INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS pncp_id TEXT,
  ADD COLUMN IF NOT EXISTS link_sistema_origem TEXT,
  ADD COLUMN IF NOT EXISTS orgao_cnpj TEXT,
  ADD COLUMN IF NOT EXISTS synced_at TIMESTAMPTZ;

-- Indice para busca por UF
CREATE INDEX IF NOT EXISTS idx_editals_uf ON public.editals(uf);

-- Indice para busca por relevancia
CREATE INDEX IF NOT EXISTS idx_editals_relevance ON public.editals(tenant_id, relevance_score DESC);

-- Indice para pncp_id (evitar duplicatas na sync)
CREATE UNIQUE INDEX IF NOT EXISTS idx_editals_pncp_id ON public.editals(tenant_id, pncp_id)
  WHERE pncp_id IS NOT NULL;

-- Full-text search em portugues no campo objeto
CREATE INDEX IF NOT EXISTS idx_editals_objeto_fts ON public.editals
  USING gin(to_tsvector('portuguese', objeto));

-- ===========================
-- CONFIGURACAO DE MONITORAMENTO POR TENANT
-- ===========================
CREATE TABLE public.tenant_monitoring_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL UNIQUE,
  ufs TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT ARRAY[
    'cesta basica',
    'cesta básica',
    'generos alimenticios',
    'gêneros alimentícios',
    'kit alimentacao',
    'kit alimentação',
    'alimentos nao pereciveis',
    'alimentos não perecíveis',
    'cesta de alimentos'
  ],
  modalidades INTEGER[] DEFAULT ARRAY[6, 8],  -- 6=pregao eletronico, 8=dispensa
  valor_min DECIMAL(15,2),
  valor_max DECIMAL(15,2),
  relevance_threshold INTEGER DEFAULT 40,
  sync_enabled BOOLEAN DEFAULT true,
  notify_on_new_edital BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.tenant_monitoring_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "monitoring_config_select" ON public.tenant_monitoring_config
  FOR SELECT USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "monitoring_config_insert" ON public.tenant_monitoring_config
  FOR INSERT WITH CHECK (tenant_id = public.get_user_tenant_id());

CREATE POLICY "monitoring_config_update" ON public.tenant_monitoring_config
  FOR UPDATE USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "monitoring_config_delete" ON public.tenant_monitoring_config
  FOR DELETE USING (tenant_id = public.get_user_tenant_id());

-- Trigger updated_at
CREATE TRIGGER update_tenant_monitoring_config_updated_at
  BEFORE UPDATE ON public.tenant_monitoring_config
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ===========================
-- LOGS DE SINCRONIZACAO
-- ===========================
CREATE TABLE public.sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  source TEXT NOT NULL,  -- 'pncp', 'compras_gov'
  status TEXT NOT NULL CHECK (status IN ('running', 'success', 'error')),
  editais_found INTEGER DEFAULT 0,
  editais_relevant INTEGER DEFAULT 0,
  editais_saved INTEGER DEFAULT 0,
  error_message TEXT,
  duration_ms INTEGER,
  params JSONB,  -- filtros usados na busca
  started_at TIMESTAMPTZ DEFAULT now(),
  finished_at TIMESTAMPTZ
);

ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sync_logs_select" ON public.sync_logs
  FOR SELECT USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "sync_logs_insert" ON public.sync_logs
  FOR INSERT WITH CHECK (tenant_id = public.get_user_tenant_id());

CREATE INDEX idx_sync_logs_tenant ON public.sync_logs(tenant_id, started_at DESC);

-- ===========================
-- CRIAR CONFIG DEFAULT PARA TENANTS EXISTENTES
-- ===========================
INSERT INTO public.tenant_monitoring_config (tenant_id)
SELECT id FROM public.tenants
WHERE id NOT IN (SELECT tenant_id FROM public.tenant_monitoring_config)
ON CONFLICT DO NOTHING;
