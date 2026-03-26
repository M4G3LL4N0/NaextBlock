import { createClient, SupabaseClient } from "@supabase/supabase-js";

type Database = {
  naextblock: {
    waitlist_signups: {
      email: string;
      full_name: string | null;
      city: string | null;
    };
  };
};

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
const schema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "naextblock";

let cachedClient: SupabaseClient<Database> | null = null;

export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (cachedClient) {
    return cachedClient;
  }

  if (!isValidHttpUrl(supabaseUrl) || !supabaseAnonKey) {
    return null;
  }

  cachedClient = createClient(supabaseUrl, supabaseAnonKey, {
    db: { schema },
  });

  return cachedClient;
}

export function hasValidSupabaseEnv(): boolean {
  return Boolean(isValidHttpUrl(supabaseUrl) && supabaseAnonKey);
}
