import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface StatsConfig {
  id: string;
  config_key: string;
  title: string | null;
  description: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export const useStatsConfig = () => {
  return useQuery({
    queryKey: ["stats_config"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stats_config")
        .select("*")
        .eq("config_key", "stats_section")
        .single();

      if (error) {
        console.error("Error fetching stats config:", error);
        throw error;
      }

      return data as StatsConfig;
    },
  });
};

export const useUpdateStatsConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      const { data, error } = await supabase
        .from("stats_config")
        .update({ title })
        .eq("config_key", "stats_section")
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats_config"] });
      toast.success("Judul section berhasil diperbarui");
    },
    onError: (error: Error) => {
      toast.error(`Gagal memperbarui judul: ${error.message}`);
    },
  });
};
