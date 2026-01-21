import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProfilSection {
  id: string;
  section_key: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  metadata: Record<string, unknown> | null;
}

export const useProfilTD = () => {
  return useQuery({
    queryKey: ["profil-td"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profil_td")
        .select("*");

      if (error) throw error;
      
      // Convert array to object keyed by section_key for easier access
      const sections: Record<string, ProfilSection> = {};
      (data as ProfilSection[]).forEach((section) => {
        sections[section.section_key] = section;
      });
      return sections;
    },
  });
};
