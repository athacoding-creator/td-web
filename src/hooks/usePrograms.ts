import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Program {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  category: string;
  logo_url: string | null;
  images: string[];
  is_active: boolean;
  display_order: number;
}

export const usePrograms = () => {
  return useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Program[];
    },
  });
};
