import type { Metadata } from "next";
import { BLOG_HEADER, BLOG_FOOTER } from "../blog-shell";
import { BEST_OSS_CONTENT } from "./content";
import { DemoModal } from "@/components/landing/demo-modal";

export const metadata: Metadata = {
  title: "The Best WhatsApp CRMs & Alternatives (2026 Guide) | WAcrm | LiReach",
  description:
    "An honest review of the best WhatsApp CRMs in 2026: WAcrm | LiReach, Chatwoot, Vocero, Frappe CRM and more, and why official API vs WhatsApp Web matters.",
  openGraph: {
    title: "The Best WhatsApp CRMs & Alternatives (2026 Guide)",
    description:
      "An honest review of the best WhatsApp CRMs in 2026: WAcrm | LiReach, Chatwoot, Vocero, Frappe CRM and more, and why official API vs WhatsApp Web matters.",
    url: "https://lireach.tech/blog/best-open-source-whatsapp-crm",
    siteName: "WAcrm | LiReach",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Best WhatsApp CRMs & Alternatives (2026 Guide)",
    description:
      "An honest review of the best WhatsApp CRMs in 2026: WAcrm | LiReach, Chatwoot, Vocero, Frappe CRM and more, and why official API vs WhatsApp Web matters.",
  },
};

export default function BestOpenSourceWhatsappCrmPage() {
  const fullHtml = BLOG_HEADER + BEST_OSS_CONTENT + BLOG_FOOTER;

  return (
    <>
      <link rel="stylesheet" href="/wacrm-site.css" />
      <style>{`
        .wacrm-site-wrapper {
          --background: #08090a;
          --foreground: #edeef0;
          --body: #b4b8bf;
          --muted-foreground: #8a8f98;
          --surface: #0e0f11;
          --surface-2: #141518;
          --surface-3: #1b1c20;
          --card: var(--surface);
          --card-foreground: var(--foreground);
          --signal: #3ddc97;
          --signal-foreground: #04110b;
          --signal-soft: #3ddc971a;
          --primary: #3ddc97 !important;
          --primary-foreground: #04110b !important;
          --border: #ffffff14;
          --border-strong: #ffffff24;
          --ring: #3ddc97;
          background-color: #08090a !important;
          color: #b4b8bf !important;
        }

        .wacrm-site-wrapper a {
          color: inherit;
        }

        .wacrm-site-wrapper h1,
        .wacrm-site-wrapper h2,
        .wacrm-site-wrapper h3 {
          color: #edeef0;
        }
      `}</style>
      <div
        className="wacrm-site-wrapper min-h-screen bg-[#08090a]"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: fullHtml }}
      />
      <DemoModal />
    </>
  );
}
