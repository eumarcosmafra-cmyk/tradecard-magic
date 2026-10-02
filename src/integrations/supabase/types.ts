export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      early_access_leads: {
        Row: {
          consent_accepted: boolean
          consent_at: string
          cpf: string
          created_at: string
          email: string | null
          id: string
          instagram: string | null
          landing_path: string | null
          nome: string
          origem: string | null
          pre_cadastro: boolean
          promo_redeemed: boolean
          redeem_code: string | null
          redeemed_at: string | null
          referrer: string | null
          terms_version: string
          updated_at: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          whatsapp: string | null
        }
        Insert: {
          consent_accepted?: boolean
          consent_at?: string
          cpf: string
          created_at?: string
          email?: string | null
          id?: string
          instagram?: string | null
          landing_path?: string | null
          nome: string
          origem?: string | null
          pre_cadastro?: boolean
          promo_redeemed?: boolean
          redeem_code?: string | null
          redeemed_at?: string | null
          referrer?: string | null
          terms_version?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          whatsapp?: string | null
        }
        Update: {
          consent_accepted?: boolean
          consent_at?: string
          cpf?: string
          created_at?: string
          email?: string | null
          id?: string
          instagram?: string | null
          landing_path?: string | null
          nome?: string
          origem?: string | null
          pre_cadastro?: boolean
          promo_redeemed?: boolean
          redeem_code?: string | null
          redeemed_at?: string | null
          referrer?: string | null
          terms_version?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      influencer_rsvps: {
        Row: {
          attended: boolean
          attended_at: string | null
          consent_accepted: boolean
          created_at: string
          email: string
          id: string
          instagram: string
          landing_path: string | null
          nome: string
          origem: string | null
          referrer: string | null
          updated_at: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          whatsapp: string
        }
        Insert: {
          attended?: boolean
          attended_at?: string | null
          consent_accepted?: boolean
          created_at?: string
          email: string
          id?: string
          instagram: string
          landing_path?: string | null
          nome: string
          origem?: string | null
          referrer?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          whatsapp: string
        }
        Update: {
          attended?: boolean
          attended_at?: string | null
          consent_accepted?: boolean
          created_at?: string
          email?: string
          id?: string
          instagram?: string
          landing_path?: string | null
          nome?: string
          origem?: string | null
          referrer?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          whatsapp?: string
        }
        Relationships: []
      }
      leads_b2b: {
        Row: {
          cep: string
          cnpj: string
          created_at: string
          email: string
          endereco_completo: string
          id: string
          nome: string
          observacoes: string | null
          sent_to_whatsapp: boolean
          telefone: string
          volume_interesse: string
        }
        Insert: {
          cep: string
          cnpj: string
          created_at?: string
          email: string
          endereco_completo: string
          id?: string
          nome: string
          observacoes?: string | null
          sent_to_whatsapp?: boolean
          telefone: string
          volume_interesse: string
        }
        Update: {
          cep?: string
          cnpj?: string
          created_at?: string
          email?: string
          endereco_completo?: string
          id?: string
          nome?: string
          observacoes?: string | null
          sent_to_whatsapp?: boolean
          telefone?: string
          volume_interesse?: string
        }
        Relationships: []
      }
      retiradas: {
        Row: {
          atendente: string | null
          created_at: string
          estornado_em: string | null
          estornado_por: string | null
          estorno_motivo: string | null
          id: string
          lead_id: string
          quantidade: number
          status: string
        }
        Insert: {
          atendente?: string | null
          created_at?: string
          estornado_em?: string | null
          estornado_por?: string | null
          estorno_motivo?: string | null
          id?: string
          lead_id: string
          quantidade: number
          status?: string
        }
        Update: {
          atendente?: string | null
          created_at?: string
          estornado_em?: string | null
          estornado_por?: string | null
          estorno_motivo?: string | null
          id?: string
          lead_id?: string
          quantidade?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "retiradas_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "early_access_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      estornar_retirada: {
        Args: { _id: string; _motivo: string; _por: string }
        Returns: undefined
      }
      registrar_retirada: {
        Args: { _atendente: string; _lead_id: string; _qtd: number }
        Returns: number
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff", "user"],
    },
  },
} as const
