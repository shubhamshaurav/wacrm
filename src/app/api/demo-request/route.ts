import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/flows/admin-client";
import { sendDemoNotificationEmail } from "@/lib/email/send-demo-notification";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company_name, phone, email } = body || {};

    // Basic Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (
      !email ||
      typeof email !== "string" ||
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedCompany = company_name ? company_name.trim() : "";
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim().toLowerCase();

    const supabase = supabaseAdmin();

    // 1. Try saving to public.demo_requests table if it exists
    let savedToDemoRequests = false;
    try {
      const { error: demoError } = await supabase.from("demo_requests").insert({
        name: trimmedName,
        company_name: trimmedCompany || null,
        phone: trimmedPhone,
        email: trimmedEmail,
        status: "new",
      });

      if (!demoError) {
        savedToDemoRequests = true;
      } else {
        console.warn("[Demo API] Notice on demo_requests table:", demoError.message);
      }
    } catch (err: any) {
      console.warn("[Demo API] demo_requests insert skipped:", err?.message);
    }

    // 2. Also save into CRM contacts table so it immediately appears in the dashboard
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("user_id, account_id")
        .limit(1)
        .single();

      if (profile?.user_id && profile?.account_id) {
        const { data: contact, error: contactError } = await supabase
          .from("contacts")
          .insert({
            user_id: profile.user_id,
            account_id: profile.account_id,
            name: trimmedName,
            company: trimmedCompany || null,
            phone: trimmedPhone,
            email: trimmedEmail,
          })
          .select("id")
          .single();

        if (contact?.id) {
          // Add note to contact
          await supabase.from("contact_notes").insert({
            contact_id: contact.id,
            user_id: profile.user_id,
            account_id: profile.account_id,
            note_text: `🎯 Demo / Setup requested via landing page form.\nCompany: ${trimmedCompany || "N/A"}\nEmail: ${trimmedEmail}\nPhone: ${trimmedPhone}`,
          });
        } else if (contactError) {
          console.warn("[Demo API] Contact insert note:", contactError.message);
        }
      }
    } catch (err: any) {
      console.warn("[Demo API] Sync to contacts table note:", err?.message);
    }

    // 3. Send email notification to system@lireach.tech
    const emailResult = await sendDemoNotificationEmail({
      name: trimmedName,
      company_name: trimmedCompany,
      phone: trimmedPhone,
      email: trimmedEmail,
    });

    return NextResponse.json({
      success: true,
      message: "Demo request received successfully.",
      emailSent: emailResult.sent,
      savedToDatabase: true,
    });
  } catch (error: any) {
    console.error("[Demo Request API Error]:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
