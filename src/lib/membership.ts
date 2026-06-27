import type { SupabaseClient } from "@supabase/supabase-js";

export async function hasActiveMembership(supabase: SupabaseClient, userId: string) {
  const { data } = await supabase
    .from("memberships")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "active")
    .gte("expires_at", new Date().toISOString())
    .limit(1)
    .maybeSingle();

  return Boolean(data);
}
