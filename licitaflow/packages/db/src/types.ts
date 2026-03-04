// Tipos gerados manualmente ate rodar `supabase gen types`
// Apos setup do Supabase (local ou hosted), rodar:
//   pnpm --filter @licitaflow/db generate

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string
          cnpj: string
          razao_social: string
          nome_fantasia: string | null
          inscricao_estadual: string | null
          segmento: string
          regiao: string | null
          capacidade_mensal: number | null
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cnpj: string
          razao_social: string
          nome_fantasia?: string | null
          inscricao_estadual?: string | null
          segmento?: string
          regiao?: string | null
          capacidade_mensal?: number | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cnpj?: string
          razao_social?: string
          nome_fantasia?: string | null
          inscricao_estadual?: string | null
          segmento?: string
          regiao?: string | null
          capacidade_mensal?: number | null
          onboarding_completed?: boolean
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          tenant_id: string
          full_name: string | null
          role: 'admin' | 'manager' | 'operator' | 'viewer'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          tenant_id: string
          full_name?: string | null
          role?: 'admin' | 'manager' | 'operator' | 'viewer'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          tenant_id?: string
          full_name?: string | null
          role?: 'admin' | 'manager' | 'operator' | 'viewer'
          avatar_url?: string | null
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          tenant_id: string
          plan: 'free' | 'starter' | 'pro' | 'enterprise'
          status: 'active' | 'cancelled' | 'past_due' | 'trialing'
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_ends_at: string | null
          current_period_start: string | null
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          plan?: 'free' | 'starter' | 'pro' | 'enterprise'
          status?: 'active' | 'cancelled' | 'past_due' | 'trialing'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          plan?: 'free' | 'starter' | 'pro' | 'enterprise'
          status?: 'active' | 'cancelled' | 'past_due' | 'trialing'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          updated_at?: string
        }
      }
      edital_sources: {
        Row: {
          id: string
          name: string
          portal_url: string | null
          scraper_type: string | null
          is_active: boolean
          last_scraped_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          portal_url?: string | null
          scraper_type?: string | null
          is_active?: boolean
          last_scraped_at?: string | null
          created_at?: string
        }
        Update: {
          name?: string
          portal_url?: string | null
          scraper_type?: string | null
          is_active?: boolean
          last_scraped_at?: string | null
        }
      }
      editals: {
        Row: {
          id: string
          tenant_id: string
          source_id: string | null
          external_id: string | null
          portal_url: string | null
          numero: string | null
          uasg: string | null
          orgao: string
          objeto: string
          modalidade: string | null
          valor_estimado: number | null
          local_entrega: string | null
          prazo_entrega: string | null
          data_sessao: string | null
          data_publicacao: string | null
          status: 'novo' | 'analisando' | 'go' | 'no_go' | 'proposta_enviada' | 'em_pregao' | 'adjudicado' | 'nao_adjudicado' | 'contrato' | 'descartado'
          pdf_url: string | null
          pdf_storage_path: string | null
          raw_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          source_id?: string | null
          external_id?: string | null
          portal_url?: string | null
          numero?: string | null
          uasg?: string | null
          orgao: string
          objeto: string
          modalidade?: string | null
          valor_estimado?: number | null
          local_entrega?: string | null
          prazo_entrega?: string | null
          data_sessao?: string | null
          data_publicacao?: string | null
          status?: 'novo' | 'analisando' | 'go' | 'no_go' | 'proposta_enviada' | 'em_pregao' | 'adjudicado' | 'nao_adjudicado' | 'contrato' | 'descartado'
          pdf_url?: string | null
          pdf_storage_path?: string | null
          raw_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          tenant_id?: string
          source_id?: string | null
          external_id?: string | null
          portal_url?: string | null
          numero?: string | null
          uasg?: string | null
          orgao?: string
          objeto?: string
          modalidade?: string | null
          valor_estimado?: number | null
          local_entrega?: string | null
          prazo_entrega?: string | null
          data_sessao?: string | null
          data_publicacao?: string | null
          status?: 'novo' | 'analisando' | 'go' | 'no_go' | 'proposta_enviada' | 'em_pregao' | 'adjudicado' | 'nao_adjudicado' | 'contrato' | 'descartado'
          pdf_url?: string | null
          pdf_storage_path?: string | null
          raw_data?: Json | null
          updated_at?: string
        }
      }
      edital_filters: {
        Row: {
          id: string
          tenant_id: string
          name: string
          keywords: string[] | null
          regioes: string[] | null
          valor_min: number | null
          valor_max: number | null
          modalidades: string[] | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          name: string
          keywords?: string[] | null
          regioes?: string[] | null
          valor_min?: number | null
          valor_max?: number | null
          modalidades?: string[] | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          tenant_id?: string
          name?: string
          keywords?: string[] | null
          regioes?: string[] | null
          valor_min?: number | null
          valor_max?: number | null
          modalidades?: string[] | null
          is_active?: boolean
        }
      }
      edital_analyses: {
        Row: {
          id: string
          tenant_id: string
          edital_id: string
          analyzed_by: string | null
          decision: 'go' | 'no_go' | 'pendente' | null
          score_total: number | null
          justificativa: string | null
          criteria: Json
          analyzed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          edital_id: string
          analyzed_by?: string | null
          decision?: 'go' | 'no_go' | 'pendente' | null
          score_total?: number | null
          justificativa?: string | null
          criteria: Json
          analyzed_at?: string
          created_at?: string
        }
        Update: {
          tenant_id?: string
          edital_id?: string
          analyzed_by?: string | null
          decision?: 'go' | 'no_go' | 'pendente' | null
          score_total?: number | null
          justificativa?: string | null
          criteria?: Json
          analyzed_at?: string
        }
      }
      document_categories: {
        Row: {
          id: string
          name: string
          slug: string
          sort_order: number
          is_system: boolean
        }
        Insert: {
          id?: string
          name: string
          slug: string
          sort_order?: number
          is_system?: boolean
        }
        Update: {
          name?: string
          slug?: string
          sort_order?: number
          is_system?: boolean
        }
      }
      documents: {
        Row: {
          id: string
          tenant_id: string
          category_id: string | null
          name: string
          description: string | null
          file_path: string | null
          file_type: string | null
          file_size: number | null
          issued_at: string | null
          expires_at: string | null
          status: 'valido' | 'vencendo' | 'vencido' | 'pendente'
          alert_days_before: number
          notes: string | null
          version: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          category_id?: string | null
          name: string
          description?: string | null
          file_path?: string | null
          file_type?: string | null
          file_size?: number | null
          issued_at?: string | null
          expires_at?: string | null
          status?: 'valido' | 'vencendo' | 'vencido' | 'pendente'
          alert_days_before?: number
          notes?: string | null
          version?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          tenant_id?: string
          category_id?: string | null
          name?: string
          description?: string | null
          file_path?: string | null
          file_type?: string | null
          file_size?: number | null
          issued_at?: string | null
          expires_at?: string | null
          status?: 'valido' | 'vencendo' | 'vencido' | 'pendente'
          alert_days_before?: number
          notes?: string | null
          version?: number
          updated_at?: string
        }
      }
      document_alerts: {
        Row: {
          id: string
          tenant_id: string
          document_id: string
          alert_date: string
          alert_type: 'vencendo' | 'vencido' | 'renovar' | null
          sent: boolean
          sent_at: string | null
          channel: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          document_id: string
          alert_date: string
          alert_type?: 'vencendo' | 'vencido' | 'renovar' | null
          sent?: boolean
          sent_at?: string | null
          channel?: string | null
          created_at?: string
        }
        Update: {
          tenant_id?: string
          document_id?: string
          alert_date?: string
          alert_type?: 'vencendo' | 'vencido' | 'renovar' | null
          sent?: boolean
          sent_at?: string | null
          channel?: string | null
        }
      }
      cost_sheets: {
        Row: {
          id: string
          tenant_id: string
          edital_id: string | null
          name: string
          custo_total: number | null
          margem_desejada: number | null
          margem_piso: number | null
          preco_venda: number | null
          preco_piso: number | null
          preco_referencia: number | null
          impostos_percentual: number | null
          regime_tributario: string | null
          is_template: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          edital_id?: string | null
          name: string
          custo_total?: number | null
          margem_desejada?: number | null
          margem_piso?: number | null
          preco_venda?: number | null
          preco_piso?: number | null
          preco_referencia?: number | null
          impostos_percentual?: number | null
          regime_tributario?: string | null
          is_template?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          tenant_id?: string
          edital_id?: string | null
          name?: string
          custo_total?: number | null
          margem_desejada?: number | null
          margem_piso?: number | null
          preco_venda?: number | null
          preco_piso?: number | null
          preco_referencia?: number | null
          impostos_percentual?: number | null
          regime_tributario?: string | null
          is_template?: boolean
          updated_at?: string
        }
      }
      cost_items: {
        Row: {
          id: string
          cost_sheet_id: string
          categoria: string
          descricao: string
          quantidade: number | null
          unidade: string | null
          custo_unitario: number | null
          custo_total: number | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          cost_sheet_id: string
          categoria: string
          descricao: string
          quantidade?: number | null
          unidade?: string | null
          custo_unitario?: number | null
          custo_total?: number | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          cost_sheet_id?: string
          categoria?: string
          descricao?: string
          quantidade?: number | null
          unidade?: string | null
          custo_unitario?: number | null
          custo_total?: number | null
          sort_order?: number
        }
      }
      bidding_sessions: {
        Row: {
          id: string
          tenant_id: string
          edital_id: string
          cost_sheet_id: string | null
          data_sessao: string
          preco_piso: number | null
          preco_abertura: number | null
          preco_final: number | null
          margem_final: number | null
          resultado: 'adjudicado' | 'classificado' | 'nao_classificado' | 'desclassificado' | 'deserto' | 'fracassado' | 'pendente' | null
          classificacao: number | null
          observacoes: string | null
          pre_checklist: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          edital_id: string
          cost_sheet_id?: string | null
          data_sessao: string
          preco_piso?: number | null
          preco_abertura?: number | null
          preco_final?: number | null
          margem_final?: number | null
          resultado?: 'adjudicado' | 'classificado' | 'nao_classificado' | 'desclassificado' | 'deserto' | 'fracassado' | 'pendente' | null
          classificacao?: number | null
          observacoes?: string | null
          pre_checklist?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          tenant_id?: string
          edital_id?: string
          cost_sheet_id?: string | null
          data_sessao?: string
          preco_piso?: number | null
          preco_abertura?: number | null
          preco_final?: number | null
          margem_final?: number | null
          resultado?: 'adjudicado' | 'classificado' | 'nao_classificado' | 'desclassificado' | 'deserto' | 'fracassado' | 'pendente' | null
          classificacao?: number | null
          observacoes?: string | null
          pre_checklist?: Json | null
          updated_at?: string
        }
      }
      bids: {
        Row: {
          id: string
          session_id: string
          valor: number
          margem: number | null
          is_mine: boolean
          concorrente: string | null
          bid_at: string
        }
        Insert: {
          id?: string
          session_id: string
          valor: number
          margem?: number | null
          is_mine?: boolean
          concorrente?: string | null
          bid_at?: string
        }
        Update: {
          session_id?: string
          valor?: number
          margem?: number | null
          is_mine?: boolean
          concorrente?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          tenant_id: string
          user_id: string | null
          type: string
          title: string
          body: string | null
          data: Json | null
          read: boolean
          read_at: string | null
          channel: string | null
          sent: boolean
          sent_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          user_id?: string | null
          type: string
          title: string
          body?: string | null
          data?: Json | null
          read?: boolean
          read_at?: string | null
          channel?: string | null
          sent?: boolean
          sent_at?: string | null
          created_at?: string
        }
        Update: {
          tenant_id?: string
          user_id?: string | null
          type?: string
          title?: string
          body?: string | null
          data?: Json | null
          read?: boolean
          read_at?: string | null
          channel?: string | null
          sent?: boolean
          sent_at?: string | null
        }
      }
      notification_preferences: {
        Row: {
          id: string
          tenant_id: string
          user_id: string
          type: string
          push_enabled: boolean
          email_enabled: boolean
        }
        Insert: {
          id?: string
          tenant_id: string
          user_id: string
          type: string
          push_enabled?: boolean
          email_enabled?: boolean
        }
        Update: {
          tenant_id?: string
          user_id?: string
          type?: string
          push_enabled?: boolean
          email_enabled?: boolean
        }
      }
    }
    Views: Record<string, never>
    Functions: {
      get_user_tenant_id: {
        Args: Record<string, never>
        Returns: string
      }
    }
    Enums: Record<string, never>
  }
}
