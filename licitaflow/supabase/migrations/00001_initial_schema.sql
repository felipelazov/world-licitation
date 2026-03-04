-- ============================================================
-- Migration 00001: Schema Base — Tenants, Profiles, Subscriptions
-- LicitaFlow — Plataforma SaaS de Gestao Licitatoria
-- ============================================================

-- ============================================================
-- TENANTS (empresas)
-- ============================================================
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cnpj VARCHAR(18) UNIQUE NOT NULL,
  razao_social TEXT NOT NULL,
  nome_fantasia TEXT,
  inscricao_estadual TEXT,
  segmento TEXT DEFAULT 'alimentos',
  regiao TEXT,
  capacidade_mensal INTEGER,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- PROFILES (usuarios vinculados a tenant)
-- ============================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'manager', 'operator', 'viewer')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- SUBSCRIPTIONS (planos)
-- ============================================================
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'enterprise')),
  status TEXT DEFAULT 'trialing' CHECK (status IN ('active', 'cancelled', 'past_due', 'trialing')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  trial_ends_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '14 days'),
  current_period_start TIMESTAMPTZ DEFAULT now(),
  current_period_end TIMESTAMPTZ DEFAULT (now() + INTERVAL '14 days'),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- INDICES
-- ============================================================
CREATE INDEX idx_profiles_tenant ON public.profiles(tenant_id);
CREATE INDEX idx_subscriptions_tenant ON public.subscriptions(tenant_id);
CREATE INDEX idx_tenants_cnpj ON public.tenants(cnpj);

-- ============================================================
-- RLS — Row Level Security
-- ============================================================

-- Habilitar RLS
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Helper function: retorna tenant_id do usuario autenticado
CREATE OR REPLACE FUNCTION public.get_user_tenant_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
$$;

-- TENANTS: usuario so ve/edita seu proprio tenant
CREATE POLICY "tenants_select_own" ON public.tenants
  FOR SELECT USING (id = public.get_user_tenant_id());

CREATE POLICY "tenants_update_own" ON public.tenants
  FOR UPDATE USING (id = public.get_user_tenant_id());

-- PROFILES: usuario ve profiles do mesmo tenant
CREATE POLICY "profiles_select_own_tenant" ON public.profiles
  FOR SELECT USING (tenant_id = public.get_user_tenant_id());

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (id = auth.uid());

-- SUBSCRIPTIONS: usuario ve subscription do seu tenant
CREATE POLICY "subscriptions_select_own" ON public.subscriptions
  FOR SELECT USING (tenant_id = public.get_user_tenant_id());

-- ============================================================
-- TRIGGER: updated_at automatico
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER tenants_updated_at
  BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- STORAGE: bucket de documentos
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Policy: usuarios autenticados podem gerenciar seus arquivos
CREATE POLICY "documents_tenant_access" ON storage.objects
  FOR ALL USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = public.get_user_tenant_id()::text
  );
