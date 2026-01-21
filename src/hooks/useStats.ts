import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { toast } from "sonner";

export type Stat = Tables<"stats">;
export type StatInsert = TablesInsert<"stats">;
export type StatUpdate = TablesUpdate<"stats">;

export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stats")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Stat[];
    },
  });
};

export const useCreateStat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newStat: StatInsert) => {
      const { data, error } = await supabase
        .from("stats")
        .insert(newStat)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Statistik berhasil ditambahkan");
    },
    onError: (error: Error) => {
      toast.error(`Gagal menambahkan statistik: ${error.message}`);
    },
  });
};

export const useUpdateStat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: StatUpdate }) => {
      const { data, error } = await supabase
        .from("stats")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Statistik berhasil diperbarui");
    },
    onError: (error: Error) => {
      toast.error(`Gagal memperbarui statistik: ${error.message}`);
    },
  });
};

export const useDeleteStat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("stats")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Statistik berhasil dihapus");
    },
    onError: (error: Error) => {
      toast.error(`Gagal menghapus statistik: ${error.message}`);
    },
  });
};
