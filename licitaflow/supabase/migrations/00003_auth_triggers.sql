-- ============================================================
-- Migration 00003: Auth Triggers
-- Cria profile automaticamente ao criar user no Supabase Auth
-- ============================================================

-- Funcao que cria profile ao registrar usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, tenant_id, full_name, role)
  VALUES (
    NEW.id,
    (NEW.raw_user_meta_data ->> 'tenant_id')::UUID,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', ''),
    'admin'
  );
  RETURN NEW;
END;
$$;

-- Trigger que dispara ao criar user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
