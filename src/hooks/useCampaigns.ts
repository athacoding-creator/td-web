import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  target: string | null;
  status: string | null;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
}

export const useCampaigns = () => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Campaign[];
    },
  });
};
