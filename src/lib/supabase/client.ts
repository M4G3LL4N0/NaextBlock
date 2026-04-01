import { createClient, SupabaseClient } from "@supabase/supabase-js";

type NaextBlockSupabaseClient = SupabaseClient;

function isValidHttpUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const schema = "naextblock";

let client: NaextBlockSupabaseClient | null = null;

export function getSupabaseClient(): NaextBlockSupabaseClient | null {
  if (client) return client;

  if (!isValidHttpUrl(supabaseUrl) || !supabaseAnonKey) {
    return null;
  }

  client = createClient(supabaseUrl, supabaseAnonKey, {
    db: { schema },
  });

  return client;
}

export function hasValidSupabaseEnv(): boolean {
  return Boolean(isValidHttpUrl(supabaseUrl) && supabaseAnonKey);
}
