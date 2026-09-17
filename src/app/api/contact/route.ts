import { NextResponse } from "next/server";

import {
  ContactDeliveryNotConfiguredError,
  deliverContactLead,
} from "@/features/contact/server/deliver-contact-lead";
import { validateContactPayload } from "@/features/contact/validation";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const result = validateContactPayload(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
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
