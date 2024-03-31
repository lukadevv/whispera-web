export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contact_requests: {
        Row: {
          accepted: boolean
          created_at: string
          id: string
          user_from: string
          user_to: string
        }
        Insert: {
          accepted?: boolean
          created_at?: string
          id?: string
          user_from: string
          user_to: string
        }
        Update: {
          accepted?: boolean
          created_at?: string
          id?: string
          user_from?: string
          user_to?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_contact_requests_user_from_fkey"
            columns: ["user_from"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_contact_requests_user_to_fkey"
            columns: ["user_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          avatar: string | null
          code: string
          created_at: string
          display_name: string
          id: string
          online: boolean
        }
        Insert: {
          avatar?: string | null
          code?: string
          created_at?: string
          display_name?: string
          id?: string
          online?: boolean
        }
        Update: {
          avatar?: string | null
          code?: string
          created_at?: string
          display_name?: string
          id?: string
          online?: boolean
        }
        Relationships: []
      }
      private_chats: {
        Row: {
          contact_request: string
          created_at: string
          id: string
          is_from_typing: boolean
          is_to_typing: boolean
          user_from: string
          user_to: string
        }
        Insert: {
          contact_request: string
          created_at?: string
          id?: string
          is_from_typing?: boolean
          is_to_typing?: boolean
          user_from: string
          user_to: string
        }
        Update: {
          contact_request?: string
          created_at?: string
          id?: string
          is_from_typing?: boolean
          is_to_typing?: boolean
          user_from?: string
          user_to?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_private_chats_contact_request_fkey"
            columns: ["contact_request"]
            isOneToOne: true
            referencedRelation: "contact_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_private_chats_user_from_fkey"
            columns: ["user_from"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_private_chats_user_to_fkey"
            columns: ["user_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      private_messages: {
        Row: {
          chat: string
          created_at: string
          id: string
          is_edit: boolean
          is_read: boolean
          message: string
          send_by: string
        }
        Insert: {
          chat: string
          created_at?: string
          id?: string
          is_edit?: boolean
          is_read?: boolean
          message: string
          send_by: string
        }
        Update: {
          chat?: string
          created_at?: string
          id?: string
          is_edit?: boolean
          is_read?: boolean
          message?: string
          send_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_messages_send_by_fkey"
            columns: ["send_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_private_messages_chat_fkey"
            columns: ["chat"]
            isOneToOne: false
            referencedRelation: "private_chats"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          contact: string
          created_at: string
          id: string
        }
        Insert: {
          contact: string
          created_at?: string
          id?: string
        }
        Update: {
          contact?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_users_contact_fkey"
            columns: ["contact"]
            isOneToOne: true
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      acceptRequest: {
        Args: {
          contact_request_id: string
        }
        Returns: undefined
      }
      findUserContact: {
        Args: {
          user_find_id: string
        }
        Returns: Record<string, unknown>
      }
      gen_random_name: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      gen_unique_random_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      myContact: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>
      }
      readMessages: {
        Args: {
          chat_id: string
        }
        Returns: undefined
      }
      sendMessage: {
        Args: {
          message_text: string
          user_to_id: string
        }
        Returns: undefined
      }
      sendRequest: {
        Args: {
          contact_code: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
