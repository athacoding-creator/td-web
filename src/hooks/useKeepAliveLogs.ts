import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface KeepAliveLog {
  id: string;
  status: string;
  message: string | null;
  created_at: string;
}

export const useKeepAliveLogs = (limit = 50) => {
  return useQuery({
    queryKey: ["keep-alive-logs", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("keep_alive_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as KeepAliveLog[];
    },
  });
};

export const useTriggerKeepAlive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(
        "https://geijbsqbxetxoplrjmro.supabase.co/functions/v1/keep-alive",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlaWpic3FieGV0eG9wbHJqbXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5NTg3MjgsImV4cCI6MjA4NDUzNDcyOH0.uQ9OWzPnE32kSRolFG_7ri-646Eu3eL55roKD0qqAy0`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to trigger keep-alive");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keep-alive-logs"] });
    },
  });
};
