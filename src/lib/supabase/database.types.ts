export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.18';
  };
  public: {
    Tables: {
      book_purchase_links: {
        Row: {
          book_id: string;
          created_at: string;
          format: string | null;
          id: string;
          price_label: string | null;
          retailer_name: string;
          sort_order: number;
          url: string;
        };
        Insert: {
          book_id: string;
          created_at?: string;
          format?: string | null;
          id?: string;
          price_label?: string | null;
          retailer_name: string;
          sort_order?: number;
          url: string;
        };
        Update: {
          book_id?: string;
          created_at?: string;
          format?: string | null;
          id?: string;
          price_label?: string | null;
          retailer_name?: string;
          sort_order?: number;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'book_purchase_links_book_id_fkey';
            columns: ['book_id'];
            isOneToOne: false;
            referencedRelation: 'press_books';
            referencedColumns: ['id'];
          },
        ];
      };
      inquiries: {
        Row: {
          consent: boolean;
          created_at: string;
          division: string | null;
          email: string;
          id: string;
          inquiry_type: string;
          message: string;
          name: string;
          organisation: string | null;
          status: string;
          subject: string;
        };
        Insert: {
          consent: boolean;
          created_at?: string;
          division?: string | null;
          email: string;
          id?: string;
          inquiry_type: string;
          message: string;
          name: string;
          organisation?: string | null;
          status?: string;
          subject: string;
        };
        Update: {
          consent?: boolean;
          created_at?: string;
          division?: string | null;
          email?: string;
          id?: string;
          inquiry_type?: string;
          message?: string;
          name?: string;
          organisation?: string | null;
          status?: string;
          subject?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          can_upload: boolean;
          created_at: string;
          full_name: string | null;
          id: string;
          role: Database['public']['Enums']['app_role'];
          updated_at: string;
        };
        Insert: {
          can_upload?: boolean;
          created_at?: string;
          full_name?: string | null;
          id: string;
          role?: Database['public']['Enums']['app_role'];
          updated_at?: string;
        };
        Update: {
          can_upload?: boolean;
          created_at?: string;
          full_name?: string | null;
          id?: string;
          role?: Database['public']['Enums']['app_role'];
          updated_at?: string;
        };
        Relationships: [];
      };
      press_books: {
        Row: {
          author_names: string[];
          back_cover_image_url: string | null;
          category: string;
          cover_image_url: string | null;
          created_at: string;
          created_by: string | null;
          division_ids: string[];
          editor_names: string[];
          id: string;
          is_visible: boolean;
          isbn13: string | null;
          keywords: string[];
          page_count: number | null;
          publication_year: number | null;
          publisher: string;
          slug: string;
          status: string;
          subtitle: string | null;
          summary: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          author_names?: string[];
          back_cover_image_url?: string | null;
          category: string;
          cover_image_url?: string | null;
          created_at?: string;
          created_by?: string | null;
          division_ids?: string[];
          editor_names?: string[];
          id?: string;
          is_visible?: boolean;
          isbn13?: string | null;
          keywords?: string[];
          page_count?: number | null;
          publication_year?: number | null;
          publisher?: string;
          slug: string;
          status?: string;
          subtitle?: string | null;
          summary: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          author_names?: string[];
          back_cover_image_url?: string | null;
          category?: string;
          cover_image_url?: string | null;
          created_at?: string;
          created_by?: string | null;
          division_ids?: string[];
          editor_names?: string[];
          id?: string;
          is_visible?: boolean;
          isbn13?: string | null;
          keywords?: string[];
          page_count?: number | null;
          publication_year?: number | null;
          publisher?: string;
          slug?: string;
          status?: string;
          subtitle?: string | null;
          summary?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: {
      app_role: 'user' | 'admin';
    };
    CompositeTypes: { [_ in never]: never };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends { Insert: infer I }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends { Update: infer U }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ['user', 'admin'],
    },
  },
} as const;
