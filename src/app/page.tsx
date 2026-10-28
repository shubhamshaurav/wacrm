import type { Metadata } from "next";
import { LANDING_HTML } from "./landing-html";
import { LandingInteractive } from "./landing-interactive";
import { DemoModal } from "@/components/landing/demo-modal";

export const metadata: Metadata = {
  title: "WAcrm | LiReach — Cloud WhatsApp CRM & Team Inbox",
  description:
    "WAcrm | LiReach is the all-in-one cloud WhatsApp CRM: shared team inbox, visual sales pipelines, broadcasts, and no-code automations on the official Meta WhatsApp Business API. Sign up and start in minutes.",
  openGraph: {
    title: "WAcrm | LiReach — Cloud WhatsApp CRM & Team Inbox",
    description:
      "WAcrm | LiReach is the all-in-one cloud WhatsApp CRM: shared team inbox, visual sales pipelines, broadcasts, and no-code automations on the official Meta WhatsApp Business API. Sign up and start in minutes.",
    url: "https://wacrm.tech",
    siteName: "WAcrm | LiReach",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WAcrm | LiReach — Cloud WhatsApp CRM & Team Inbox",
    description:
      "WAcrm | LiReach is the all-in-one cloud WhatsApp CRM: shared team inbox, visual sales pipelines, broadcasts, and no-code automations on the official Meta WhatsApp Business API. Sign up and start in minutes.",
  },
};

export default function LandingPage() {
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
          --popover: var(--surface);
          --popover-foreground: var(--foreground);
          --signal: #3ddc97;
          --signal-foreground: #04110b;
          --signal-soft: #3ddc971a;
          --primary: #3ddc97 !important;
          --primary-foreground: #04110b !important;
          --secondary: var(--surface-2);
          --secondary-foreground: var(--foreground);
          --muted: var(--surface-2);
          --accent: var(--surface-3);
          --accent-foreground: var(--foreground);
          --destructive: #f87171;
          --border: #ffffff14;
          --border-strong: #ffffff24;
          --input: #ffffff1f;
          --ring: #3ddc97;
          --radius: .5rem;
          background-color: #08090a !important;
          color: #b4b8bf !important;
        }

        .wacrm-site-wrapper .bg-primary {
          background-color: #3ddc97 !important;
          color: #04110b !important;
        }

        .wacrm-site-wrapper .glow-signal {
          box-shadow: 0 0 0 1px #3ddc9759, 0 10px 32px -10px #3ddc978c !important;
        }

        .wacrm-site-wrapper [data-slot="accordion-content"][hidden],
        .wacrm-site-wrapper [data-slot="accordion-content"][data-closed] {
          display: none !important;
        }

        .wacrm-site-wrapper [data-slot="accordion-content"][data-open],
        .wacrm-site-wrapper [data-slot="accordion-content"]:not([hidden]):not([data-closed]) {
          display: block !important;
          height: auto !important;
          overflow: visible !important;
        }

        .wacrm-site-wrapper [data-slot="accordion-content"][data-open] > div,
        .wacrm-site-wrapper [data-slot="accordion-content"]:not([hidden]):not([data-closed]) > div {
          height: auto !important;
        }
      `}</style>
      <div
        className="wacrm-site-wrapper"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: LANDING_HTML }}
      />
      <LandingInteractive />
      <DemoModal />
    </>
  );
}
