import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface DashboardStats {
  totalArticles: number;
  totalPrograms: number;
  totalCampaigns: number;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    totalPrograms: 0,
    totalCampaigns: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch total articles
        const { count: articlesCount } = await supabase
          .from("articles")
          .select("*", { count: "exact", head: true });

        // Fetch total programs
        const { count: programsCount } = await supabase
          .from("programs")
          .select("*", { count: "exact", head: true });

        // Fetch total campaigns
        const { count: campaignsCount } = await supabase
          .from("campaigns")
          .select("*", { count: "exact", head: true });

        setStats({
          totalArticles: articlesCount || 0,
          totalPrograms: programsCount || 0,
          totalCampaigns: campaignsCount || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};
