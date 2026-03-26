import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseClient } from "@/lib/supabase/client";

const WaitlistSchema = z.object({
  email: z.string().email(),
  full_name: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured yet. Add valid environment variables." },
        { status: 500 },
      );
    }

    const json = await request.json();
    const parsed = WaitlistSchema.parse(json);

    const payload = {
      email: parsed.email,
      full_name: parsed.full_name || null,
      city: parsed.city || null,
    };

    const table = (supabase.from("waitlist_signups") as any);
    const { error } = await table.insert([payload]);

    if (error) {
      const message = String(error.message || "").toLowerCase();

      if (message.includes("duplicate") || message.includes("unique")) {
        return NextResponse.json(
          { error: "That email is already on the waitlist." },
          { status: 409 },
        );
      }

      return NextResponse.json(
        { error: error.message || "Failed to save waitlist signup." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid request payload.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
