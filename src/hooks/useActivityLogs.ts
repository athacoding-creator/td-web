import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Json } from "@/integrations/supabase/types";

interface ActivityLog {
  id: string;
  user_id: string | null;
  user_email: string | null;
  action: string;
  table_name: string | null;
  record_id: string | null;
  description: string | null;
  metadata: Json | null;
  created_at: string;
}

export const useActivityLogs = (filters?: { action?: string; table_name?: string }, limit = 100) => {
  return useQuery({
    queryKey: ["activity-logs", filters, limit],
    queryFn: async () => {
      let query = supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (filters?.action && filters.action !== "all") {
        query = query.eq("action", filters.action);
      }

      if (filters?.table_name && filters.table_name !== "all") {
        query = query.eq("table_name", filters.table_name);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as ActivityLog[];
    },
  });
};

export const useLogActivity = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      action,
      table_name,
      record_id,
      description,
      metadata,
    }: {
      action: string;
      table_name?: string;
      record_id?: string;
      description?: string;
      metadata?: Json;
    }) => {
      const { error } = await supabase.from("activity_logs").insert([{
        user_id: user?.id,
        user_email: user?.email,
        action,
        table_name,
        record_id,
        description,
        metadata,
      }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity-logs"] });
    },
  });
};
