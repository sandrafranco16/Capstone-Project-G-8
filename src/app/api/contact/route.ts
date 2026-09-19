import { NextResponse } from "next/server";

import {
  ContactDeliveryNotConfiguredError,
  deliverContactLead,
} from "@/features/contact/server/deliver-contact-lead";
import {
  isHoneypotTriggered,
  validateContactPayload,
  verifyTurnstileToken,
} from "@/features/contact/validation";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Spam check: honeypot
  if (isHoneypotTriggered(body)) {
    // Silently accept to avoid revealing detection to bots
    return NextResponse.json({ accepted: true }, { status: 202 });
  }

  const result = validateContactPayload(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  // Spam check: Turnstile
  const input = body as Record<string, unknown>;
  const turnstileToken =
    typeof input.turnstileToken === "string" ? input.turnstileToken : "";
  const hasTurnstileSecret = !!process.env.TURNSTILE_SECRET_KEY;

  if (hasTurnstileSecret) {
    const isValid = await verifyTurnstileToken(turnstileToken);
    if (!isValid) {
      return NextResponse.json(
        { errors: ["Verification failed. Please try again."] },
        { status: 400 },
      );
    }
  }

  try {
    await deliverContactLead(result.data);
    return NextResponse.json({ accepted: true }, { status: 202 });
  } catch (error) {
    if (error instanceof ContactDeliveryNotConfiguredError) {
      return NextResponse.json(
        { error: "Contact delivery is not configured." },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "Unable to deliver contact request." },
      { status: 502 },
    );
  }
}
