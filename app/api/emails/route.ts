import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export async function POST() {
  try {
    const recipient = process.env.SMTP_TEST_RECIPIENT || process.env.SMTP_FROM_EMAIL;

    if (!recipient) {
      return NextResponse.json(
        { error: "Missing SMTP_TEST_RECIPIENT or SMTP_FROM_EMAIL" },
        { status: 500 },
      );
    }

    const data = await sendMail({
      to: recipient,
      subject: "Hello world",
      html: "<p>Hello world</p>",
      text: "Hello world",
    });

    return NextResponse.json(
      data, 
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}