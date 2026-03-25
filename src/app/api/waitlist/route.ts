import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase/client";
import type { WaitlistSignupInput } from "@/lib/types";

const WaitlistSchema = z.object({
  email: z.string().email(),
  full_name: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = WaitlistSchema.parse(json) as WaitlistSignupInput;

    const { error } = await supabase
      .from("waitlist_signups")
      .insert({
        email: parsed.email,
        full_name: parsed.full_name || null,
        city: parsed.city || null,
      });

    if (error) {
      if (error.code === "23505") {
        const { data: existing } = await supabase
          .from("waitlist_signups")
          .select("email")
          .eq("email", parsed.email)
          .maybeSingle();

        if (existing) {
          return NextResponse.json(
            { error: "That email is already on the waitlist." },
            { status: 409 },
          );
        }
      }
      return NextResponse.json(
        { error: "Failed to add to waitlist. Please try again." },
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
