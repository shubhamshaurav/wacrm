import type { Metadata } from "next";
import { BLOG_HEADER, BLOG_FOOTER } from "../blog-shell";
import { KOMMO_CONTENT } from "./content";
import { DemoModal } from "@/components/landing/demo-modal";

export const metadata: Metadata = {
  title: "WAcrm vs Kommo: an honest WhatsApp CRM alternative comparison | WAcrm | LiReach",
  description:
    "Kommo bills per user with a 6-month minimum. WAcrm | LiReach provides a modern cloud WhatsApp CRM with no locked contracts and full team access from day one.",
  openGraph: {
    title: "WAcrm vs Kommo: an honest WhatsApp CRM alternative comparison",
    description:
      "Kommo bills per user with a 6-month minimum. WAcrm | LiReach provides a modern cloud WhatsApp CRM with no locked contracts and full team access from day one.",
    url: "https://lireach.tech/blog/wacrm-vs-kommo",
    siteName: "WAcrm | LiReach",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "WAcrm vs Kommo: an honest WhatsApp CRM alternative comparison",
    description:
      "Kommo bills per user with a 6-month minimum. WAcrm | LiReach provides a modern cloud WhatsApp CRM with no locked contracts and full team access from day one.",
  },
};

export default function WacrmVsKommoPage() {
  const fullHtml = BLOG_HEADER + KOMMO_CONTENT + BLOG_FOOTER;

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
