import { createClient } from "@supabase/supabase-js";

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
const schema = "naextblock" as const;

let cachedClient: unknown = null;

export function getSupabaseClient(): any | null {
  if (cachedClient) {
    return cachedClient as any;
  }

  if (!isValidHttpUrl(supabaseUrl) || !supabaseAnonKey) {
    return null;
  }

  cachedClient = createClient(supabaseUrl, supabaseAnonKey, {
    db: { schema },
  }) as any;

  return cachedClient as any;
}

export function hasValidSupabaseEnv(): boolean {
  return Boolean(isValidHttpUrl(supabaseUrl) && supabaseAnonKey);
}
