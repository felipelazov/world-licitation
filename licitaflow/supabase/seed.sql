-- ============================================================
-- Seed: Dados de teste — LicitaFlow
-- ============================================================

-- Nota: Este seed roda APOS as migrations.
-- O usuario de teste precisa ser criado via Supabase Auth (Dashboard ou API).
-- Este seed popula dados de referencia e um tenant de teste.

-- Tenant de teste
INSERT INTO public.tenants (id, cnpj, razao_social, nome_fantasia, inscricao_estadual, segmento, regiao, capacidade_mensal)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  '37.393.689/0001-71',
  'Empresa Teste LTDA',
  'Cesta Boa',
  '124.130.401.113',
  'alimentos',
  'SP',
  3000
) ON CONFLICT (cnpj) DO NOTHING;

-- Subscription de teste (free trial)
INSERT INTO public.subscriptions (tenant_id, plan, status, trial_ends_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'free',
  'trialing',
  now() + INTERVAL '14 days'
) ON CONFLICT (tenant_id) DO NOTHING;

-- ============================================================
-- Edital Sources — portais monitorados (Story 2.1)
-- ============================================================

INSERT INTO public.edital_sources (id, name, slug, base_url, active) VALUES
  ('00000000-0000-0000-0000-000000000010', 'Compras.gov.br', 'compras-gov-br', 'https://comprasnet.gov.br', true),
  ('00000000-0000-0000-0000-000000000011', 'BEC-SP', 'bec-sp', 'https://www.bec.sp.gov.br', true),
  ('00000000-0000-0000-0000-000000000012', 'Licitações-e', 'licitacoes-e', 'https://www.licitacoes-e.com.br', true),
  ('00000000-0000-0000-0000-000000000013', 'PNCP', 'pncp', 'https://pncp.gov.br', true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Document Categories — categorias padrão (Story 2.1)
-- ============================================================

INSERT INTO public.document_categories (id, name, slug, description, default_validity_days) VALUES
  ('00000000-0000-0000-0000-000000000020', 'Certidões Negativas', 'certidoes-negativas', 'CND Federal, Estadual, Municipal e Trabalhista', 180),
  ('00000000-0000-0000-0000-000000000021', 'Documentos Societários', 'documentos-societarios', 'Contrato social, alterações, procurações', 365),
  ('00000000-0000-0000-0000-000000000022', 'Qualificação Técnica', 'qualificacao-tecnica', 'Atestados de capacidade técnica, registros profissionais', 365),
  ('00000000-0000-0000-0000-000000000023', 'Documentos Fiscais', 'documentos-fiscais', 'Balanço patrimonial, demonstrações contábeis, SICAF', 365),
  ('00000000-0000-0000-0000-000000000024', 'Licenças e Alvarás', 'licencas-alvaras', 'Alvará sanitário (VISA), licença ambiental, alvará de funcionamento', 365)
ON CONFLICT (slug) DO NOTHING;
