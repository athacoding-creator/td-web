import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type ContactMessage = Tables<"contact_messages">;

export const useContactMessages = () => {
  const [data, setData] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const { data: messages, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setData((messages as ContactMessage[]) || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitMessage = async (messageData: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }) => {
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([messageData])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
    await fetchMessages();
  };

  const updatePriority = async (
    id: string,
    priority: string
  ) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ priority, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
    await fetchMessages();
  };

  const markAsReplied = async (id: string) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({
        status: "replied",
        replied_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) throw error;
    await fetchMessages();
  };

  return {
    data,
    isLoading,
    error,
    submitMessage,
    updateStatus,
    updatePriority,
    markAsReplied,
    refetch: fetchMessages,
  };
};
