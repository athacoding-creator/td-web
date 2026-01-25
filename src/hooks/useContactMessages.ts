import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: "new" | "in_progress" | "replied" | "closed";
  priority: "low" | "medium" | "high";
  assigned_to?: string;
  replied_at?: string;
  created_at: string;
  updated_at: string;
}

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
      setData(messages || []);
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
    status: ContactMessage["status"]
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
    priority: ContactMessage["priority"]
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
