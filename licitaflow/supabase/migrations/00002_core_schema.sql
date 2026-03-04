-- ============================================================
-- Migration 00002: Schema Core — Todos os modulos do MVP
-- LicitaFlow — Plataforma SaaS de Gestao Licitatoria
-- ============================================================

-- ===========================
-- EDITAL SOURCES (compartilhado — sem tenant_id)
-- ===========================
CREATE TABLE public.edital_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  portal_url TEXT,
  scraper_type TEXT,
  is_active BOOLEAN DEFAULT true,
  last_scraped_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================
-- EDITAIS (M1 - Radar)
-- ===========================
CREATE TABLE public.editals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  source_id UUID REFERENCES public.edital_sources(id),
  external_id TEXT,
  portal_url TEXT,
  numero TEXT,
  uasg TEXT,
  orgao TEXT NOT NULL,
  objeto TEXT NOT NULL,
  modalidade TEXT,
  valor_estimado DECIMAL(15,2),
  local_entrega TEXT,
  prazo_entrega TEXT,
  data_sessao TIMESTAMPTZ,
  data_publicacao TIMESTAMPTZ,
  status TEXT DEFAULT 'novo' CHECK (status IN (
    'novo', 'analisando', 'go', 'no_go', 'proposta_enviada',
    'em_pregao', 'adjudicado', 'nao_adjudicado', 'contrato', 'descartado'
  )),
  pdf_url TEXT,
  pdf_storage_path TEXT,
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Unique: nao duplicar edital do mesmo portal pro mesmo tenant
CREATE UNIQUE INDEX idx_editals_unique_external ON public.editals(tenant_id, source_id, external_id)
  WHERE external_id IS NOT NULL;

CREATE TABLE public.edital_filters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  keywords TEXT[],
  regioes TEXT[],
  valor_min DECIMAL(15,2),
  valor_max DECIMAL(15,2),
  modalidades TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================
-- ANALISE GO/NO-GO (M2)
-- ===========================
CREATE TABLE public.edital_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  edital_id UUID REFERENCES public.editals(id) ON DELETE CASCADE NOT NULL,
  analyzed_by UUID REFERENCES public.profiles(id),
  decision TEXT CHECK (decision IN ('go', 'no_go', 'pendente')),
  score_total DECIMAL(4,2),
  justificativa TEXT,
  criteria JSONB NOT NULL,
  analyzed_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================
-- DOCUMENTOS (M3)
-- ===========================
CREATE TABLE public.document_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_system BOOLEAN DEFAULT false
);

CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.document_categories(id),
  name TEXT NOT NULL,
  description TEXT,
  file_path TEXT,
  file_type TEXT,
  file_size INTEGER,
  issued_at DATE,
  expires_at DATE,
  status TEXT DEFAULT 'pendente' CHECK (status IN (
    'valido', 'vencendo', 'vencido', 'pendente'
  )),
  alert_days_before INTEGER DEFAULT 30,
  notes TEXT,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.document_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE NOT NULL,
  alert_date DATE NOT NULL,
  alert_type TEXT CHECK (alert_type IN ('vencendo', 'vencido', 'renovar')),
  sent BOOLEAN DEFAULT false,
  sent_at TIMESTAMPTZ,
  channel TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================
-- CUSTO E PROPOSTA (M4)
-- ===========================
CREATE TABLE public.cost_sheets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  edital_id UUID REFERENCES public.editals(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  custo_total DECIMAL(15,2),
  margem_desejada DECIMAL(5,2),
  margem_piso DECIMAL(5,2),
  preco_venda DECIMAL(15,2),
  preco_piso DECIMAL(15,2),
  preco_referencia DECIMAL(15,2),
  impostos_percentual DECIMAL(5,2),
  regime_tributario TEXT,
  is_template BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.cost_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cost_sheet_id UUID REFERENCES public.cost_sheets(id) ON DELETE CASCADE NOT NULL,
  categoria TEXT NOT NULL,
  descricao TEXT NOT NULL,
  quantidade DECIMAL(10,3),
  unidade TEXT,
  custo_unitario DECIMAL(10,2),
  custo_total DECIMAL(10,2),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================
-- PREGAO (M5)
-- ===========================
CREATE TABLE public.bidding_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  edital_id UUID REFERENCES public.editals(id) ON DELETE CASCADE NOT NULL,
  cost_sheet_id UUID REFERENCES public.cost_sheets(id) ON DELETE SET NULL,
  data_sessao TIMESTAMPTZ NOT NULL,
  preco_piso DECIMAL(15,2),
  preco_abertura DECIMAL(15,2),
  preco_final DECIMAL(15,2),
  margem_final DECIMAL(5,2),
  resultado TEXT CHECK (resultado IN (
    'adjudicado', 'classificado', 'nao_classificado',
    'desclassificado', 'deserto', 'fracassado', 'pendente'
  )),
  classificacao INTEGER,
  observacoes TEXT,
  pre_checklist JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.bidding_sessions(id) ON DELETE CASCADE NOT NULL,
  valor DECIMAL(15,2) NOT NULL,
  margem DECIMAL(5,2),
  is_mine BOOLEAN DEFAULT true,
  concorrente TEXT,
  bid_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================
-- NOTIFICACOES (M9)
-- ===========================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  data JSONB,
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  channel TEXT,
  sent BOOLEAN DEFAULT false,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  push_enabled BOOLEAN DEFAULT true,
  email_enabled BOOLEAN DEFAULT true,
  UNIQUE(user_id, type)
);

-- ============================================================
-- INDICES
-- ============================================================
CREATE INDEX idx_editals_tenant ON public.editals(tenant_id);
CREATE INDEX idx_editals_status ON public.editals(tenant_id, status);
CREATE INDEX idx_editals_data_sessao ON public.editals(data_sessao);
CREATE INDEX idx_editals_objeto ON public.editals USING gin(to_tsvector('portuguese', objeto));
CREATE INDEX idx_edital_filters_tenant ON public.edital_filters(tenant_id);
CREATE INDEX idx_edital_analyses_edital ON public.edital_analyses(edital_id);
CREATE INDEX idx_documents_tenant ON public.documents(tenant_id);
CREATE INDEX idx_documents_expires ON public.documents(tenant_id, expires_at);
CREATE INDEX idx_documents_status ON public.documents(tenant_id, status);
CREATE INDEX idx_document_alerts_date ON public.document_alerts(alert_date, sent);
CREATE INDEX idx_cost_sheets_tenant ON public.cost_sheets(tenant_id);
CREATE INDEX idx_cost_sheets_edital ON public.cost_sheets(edital_id);
CREATE INDEX idx_cost_items_sheet ON public.cost_items(cost_sheet_id);
CREATE INDEX idx_bidding_sessions_tenant ON public.bidding_sessions(tenant_id);
CREATE INDEX idx_bidding_sessions_edital ON public.bidding_sessions(edital_id);
CREATE INDEX idx_bids_session ON public.bids(session_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, read);
CREATE INDEX idx_notifications_tenant ON public.notifications(tenant_id, created_at DESC);

-- ============================================================
-- RLS — Row Level Security
-- ============================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.edital_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edital_filters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edital_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_sheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bidding_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- EDITAL SOURCES: leitura publica (compartilhada entre tenants)
CREATE POLICY "edital_sources_select_all" ON public.edital_sources
  FOR SELECT USING (true);

-- DOCUMENT CATEGORIES: leitura publica (categorias do sistema)
CREATE POLICY "document_categories_select_all" ON public.document_categories
  FOR SELECT USING (true);

-- Tabelas com tenant isolation (padrao)
-- Macro: SELECT/INSERT/UPDATE/DELETE filtrado por tenant_id

-- EDITALS
CREATE POLICY "editals_select" ON public.editals
  FOR SELECT USING (tenant_id = public.get_user_tenant_id());
CREATE POLICY "editals_insert" ON public.editals
  FOR INSERT WITH CHECK (tenant_id = public.get_user_tenant_id());
CREATE POLICY "editals_update" ON public.editals
  FOR UPDATE USING (tenant_id = public.get_user_tenant_id());
CREATE POLICY "editals_delete" ON public.editals
  FOR DELETE USING (tenant_id = public.get_user_tenant_id());

-- EDITAL FILTERS
CREATE POLICY "edital_filters_select" ON public.edital_filters
  FOR SELECT USING (tenant_id = public.get_user_tenant_id());
CREATE POLICY "edital_filters_insert" ON public.edital_filters
  FOR INSERT WITH CHECK (tenant_id = public.get_user_tenant_id());
CREATE POLICY "edital_filters_update" ON public.edital_filters
  FOR UPDATE USING (tenant_id = public.get_user_tenant_id());
CREATE POLICY "edital_filters_delete" ON public.edital_filters
  FOR DELETE USING (tenant_id = public.get_user_tenant_id());

-- EDITAL ANALYSES
CREATE POLICY "edital_analyses_select" ON public.edital_analyses
  FOR SELECT USING (tenant_id = public.get_user_tenant_id());
CREATE POLICY "edital_analyses_insert" ON public.edital_analyses
  FOR INSERT WITH CHECK (tenant_id = public.get_user_tenant_id());
CREATE POLICY "edital_analyses_update" ON public.edital_analyses
  FOR UPDATE USING (tenant_id = public.get_user_tenant_id());

-- DOCUMENTS
CREATE POLICY "documents_select" ON public.documents
  FOR SELECT USING (tenant_id = public.get_user_tenant_id());
CREATE POLICY "documents_insert" ON public.documents
  FOR INSERT WITH CHECK (tenant_id = public.get_user_tenant_id());
CREATE POLICY "documents_update" ON public.documents
  FOR UPDATE USING (tenant_id = public.get_user_tenant_id());
CREATE POLICY "documents_delete" ON public.documents
  FOR DELETE USING (tenant_id = public.get_user_tenant_id());

-- DOCUMENT ALERTS
CREATE POLICY "document_alerts_select" ON public.document_alerts
  FOR SELECT USING (tenant_id = public.get_user_tenant_id());
CREATE POLICY "document_alerts_insert" ON public.document_alerts
  FOR INSERT WITH CHECK (tenant_id = public.get_user_tenant_id());

-- COST SHEETS
CREATE POLICY "cost_sheets_select" ON public.cost_sheets
  FOR SELECT USING (tenant_id = public.get_user_tenant_id());
CREATE POLICY "cost_sheets_insert" ON public.cost_sheets
  FOR INSERT WITH CHECK (tenant_id = public.get_user_tenant_id());
CREATE POLICY "cost_sheets_update" ON public.cost_sheets
  FOR UPDATE USING (tenant_id = public.get_user_tenant_id());
CREATE POLICY "cost_sheets_delete" ON public.cost_sheets
  FOR DELETE USING (tenant_id = public.get_user_tenant_id());

-- COST ITEMS (acesso via cost_sheet → tenant)
CREATE POLICY "cost_items_select" ON public.cost_items
  FOR SELECT USING (
    cost_sheet_id IN (SELECT id FROM public.cost_sheets WHERE tenant_id = public.get_user_tenant_id())
  );
CREATE POLICY "cost_items_insert" ON public.cost_items
  FOR INSERT WITH CHECK (
    cost_sheet_id IN (SELECT id FROM public.cost_sheets WHERE tenant_id = public.get_user_tenant_id())
  );
CREATE POLICY "cost_items_update" ON public.cost_items
  FOR UPDATE USING (
    cost_sheet_id IN (SELECT id FROM public.cost_sheets WHERE tenant_id = public.get_user_tenant_id())
  );
CREATE POLICY "cost_items_delete" ON public.cost_items
  FOR DELETE USING (
    cost_sheet_id IN (SELECT id FROM public.cost_sheets WHERE tenant_id = public.get_user_tenant_id())
  );

-- BIDDING SESSIONS
CREATE POLICY "bidding_sessions_select" ON public.bidding_sessions
  FOR SELECT USING (tenant_id = public.get_user_tenant_id());
CREATE POLICY "bidding_sessions_insert" ON public.bidding_sessions
  FOR INSERT WITH CHECK (tenant_id = public.get_user_tenant_id());
CREATE POLICY "bidding_sessions_update" ON public.bidding_sessions
  FOR UPDATE USING (tenant_id = public.get_user_tenant_id());

-- BIDS (acesso via session → tenant)
CREATE POLICY "bids_select" ON public.bids
  FOR SELECT USING (
    session_id IN (SELECT id FROM public.bidding_sessions WHERE tenant_id = public.get_user_tenant_id())
  );
CREATE POLICY "bids_insert" ON public.bids
  FOR INSERT WITH CHECK (
    session_id IN (SELECT id FROM public.bidding_sessions WHERE tenant_id = public.get_user_tenant_id())
  );

-- NOTIFICATIONS
CREATE POLICY "notifications_select" ON public.notifications
  FOR SELECT USING (tenant_id = public.get_user_tenant_id());
CREATE POLICY "notifications_update" ON public.notifications
  FOR UPDATE USING (tenant_id = public.get_user_tenant_id());

-- NOTIFICATION PREFERENCES
CREATE POLICY "notification_prefs_select" ON public.notification_preferences
  FOR SELECT USING (tenant_id = public.get_user_tenant_id());
CREATE POLICY "notification_prefs_insert" ON public.notification_preferences
  FOR INSERT WITH CHECK (tenant_id = public.get_user_tenant_id());
CREATE POLICY "notification_prefs_update" ON public.notification_preferences
  FOR UPDATE USING (tenant_id = public.get_user_tenant_id());

-- ============================================================
-- TRIGGERS — updated_at automatico
-- ============================================================
CREATE TRIGGER editals_updated_at
  BEFORE UPDATE ON public.editals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER cost_sheets_updated_at
  BEFORE UPDATE ON public.cost_sheets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER bidding_sessions_updated_at
  BEFORE UPDATE ON public.bidding_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- SEED: Dados de referencia
-- ============================================================

-- Fontes de editais
INSERT INTO public.edital_sources (name, portal_url, scraper_type) VALUES
  ('Compras.gov.br', 'https://www.gov.br/compras', 'hybrid'),
  ('BEC-SP', 'https://www.bec.sp.gov.br', 'headless'),
  ('Licitacoes-e', 'https://www.licitacoes-e.com.br', 'headless'),
  ('PNCP', 'https://pncp.gov.br', 'api');

-- Categorias de documentos
INSERT INTO public.document_categories (name, slug, sort_order, is_system) VALUES
  ('Habilitacao Juridica', 'juridica', 1, true),
  ('Regularidade Fiscal Federal', 'fiscal-federal', 2, true),
  ('Regularidade Fiscal Estadual/Municipal', 'fiscal-estadual-municipal', 3, true),
  ('Qualificacao Tecnica', 'tecnica', 4, true),
  ('Qualificacao Economico-Financeira', 'economico-financeira', 5, true);
