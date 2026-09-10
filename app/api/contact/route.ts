import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";

export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, consent } = body ?? {};

    const errors: string[] = [];

    if (typeof name !== "string" || name.trim().length < 2) {
      errors.push("Please provide your full name.");
    }
    if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      errors.push("Please provide a valid email address.");
    }
    if (typeof phone !== "string" || phone.replace(/\D/g, "").length < 10) {
      errors.push("Please provide a valid phone number.");
    }
    if (typeof message !== "string" || message.trim().length < 10) {
      errors.push("Please provide a message with at least 10 characters.");
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, error: errors.join(" ") }, { status: 400 });
    }

    await connectToDatabase();
    await ContactSubmission.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service: typeof service === "string" ? service.trim() : undefined,
      message: message.trim(),
      consent: Boolean(consent),
      status: "new",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
