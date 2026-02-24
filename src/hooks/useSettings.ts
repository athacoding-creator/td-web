import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Setting {
  id: string;
  key: string;
  value: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .order("key");

      if (error) throw error;
      return data as Setting[];
    },
  });
};

export const useSetting = (key: string) => {
  return useQuery({
    queryKey: ["setting", key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("key", key)
        .single();

      if (error) throw error;
      return data as Setting;
    },
  });
};

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { data, error } = await supabase
        .from("settings")
        .update({ value })
        .eq("key", key)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      queryClient.invalidateQueries({ queryKey: ["setting"] });
      toast.success("Setting berhasil diupdate");
    },
    onError: (error: Error) => {
      console.error("Error updating setting:", error);
      toast.error("Gagal update setting: " + error.message);
    },
  });
};
