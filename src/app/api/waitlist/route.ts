import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase/client";

const WaitlistSchema = z.object({
  email: z.string().email(),
  full_name: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = WaitlistSchema.parse(json);

    const { error } = await supabase.from("waitlist_signups").insert({
      email: parsed.email,
      full_name: parsed.full_name || null,
      city: parsed.city || null,
    });

    if (error) {
      if (error.message.toLowerCase().includes("duplicate")) {
        return NextResponse.json(
          { error: "That email is already on the waitlist." },
          { status: 409 },
        );
      }

      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid request payload.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
