"use client";

import { useEffect } from "react";

export function LandingInteractive() {
  useEffect(() => {
    // 1. Tour tabs logic
    function selectTab(index: number) {
      const tabButtons = Array.from(
        document.querySelectorAll<HTMLButtonElement>("#tour button[role='tab']")
      );
      const tabPanels = Array.from(
        document.querySelectorAll<HTMLDivElement>("#tour div[role='tabpanel']")
      );

      tabButtons.forEach((btn, idx) => {
        if (idx === index) {
          btn.setAttribute("data-active", "");
          btn.setAttribute("aria-selected", "true");
          btn.removeAttribute("tabindex");
        } else {
          btn.removeAttribute("data-active");
          btn.setAttribute("aria-selected", "false");
          btn.setAttribute("tabindex", "-1");
        }
      });

      tabPanels.forEach((panel, idx) => {
        if (idx === index) {
          panel.removeAttribute("hidden");
          panel.removeAttribute("data-hidden");
          panel.removeAttribute("inert");
          panel.setAttribute("tabindex", "0");
        } else {
          panel.setAttribute("hidden", "");
          panel.setAttribute("data-hidden", "");
          panel.setAttribute("inert", "");
          panel.setAttribute("tabindex", "-1");
        }
      });
    }

    // Check hash on load or click for tour tabs (e.g. #tour-inbox, #tour-automations, etc.)
    function handleHash() {
      const hash = window.location.hash;
      if (hash === "#tour-inbox" || hash === "#tour") {
        selectTab(0);
      } else if (hash === "#tour-automations") {
        selectTab(1);
      } else if (hash === "#tour-pipelines") {
        selectTab(2);
      } else if (hash === "#tour-analytics") {
        selectTab(3);
      }
    }

    window.addEventListener("hashchange", handleHash);
    handleHash();

    // 2. Global click handler for tabs, accordions, and anchor links
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Handle Tour tabs click
      const tabBtn = target.closest<HTMLButtonElement>("#tour button[role='tab']");
      if (tabBtn) {
        const tabButtons = Array.from(
          document.querySelectorAll<HTMLButtonElement>("#tour button[role='tab']")
        );
        const idx = tabButtons.indexOf(tabBtn);
        if (idx !== -1) {
          selectTab(idx);
          return;
        }
      }

      // Handle FAQ accordion click
      const accordionTrigger = target.closest<HTMLButtonElement>(
        "[data-slot='accordion-trigger']"
      );
      if (accordionTrigger) {
        const item = accordionTrigger.closest<HTMLDivElement>(
          "[data-slot='accordion-item']"
        );
        if (item) {
          const content = item.querySelector<HTMLDivElement>(
            "[data-slot='accordion-content']"
          );
          if (content) {
            const isCurrentlyOpen =
              accordionTrigger.getAttribute("aria-expanded") === "true";

            if (isCurrentlyOpen) {
              // Close
              accordionTrigger.setAttribute("aria-expanded", "false");
              accordionTrigger.removeAttribute("data-open");
              accordionTrigger.setAttribute("data-closed", "");
              accordionTrigger.setAttribute("data-hidden", "");

              content.setAttribute("hidden", "");
              content.setAttribute("data-closed", "");
              content.setAttribute("data-hidden", "");
              content.removeAttribute("data-open");
              content.style.display = "none";
            } else {
              // Open
              accordionTrigger.setAttribute("aria-expanded", "true");
              accordionTrigger.setAttribute("data-open", "");
              accordionTrigger.removeAttribute("data-closed");
              accordionTrigger.removeAttribute("data-hidden");

              content.removeAttribute("hidden");
              content.removeAttribute("data-closed");
              content.removeAttribute("data-hidden");
              content.setAttribute("data-open", "");
              content.style.display = "block";

              const inner = content.firstElementChild as HTMLElement;
              if (inner) {
                const height = inner.scrollHeight || 100;
                content.style.setProperty("--accordion-panel-height", `${height}px`);
                inner.style.height = "auto";
              }
            }
            return;
          }
        }
      }

      // Handle anchor links (#tour, #how-it-works, #faq, #features)
      const anchor = target.closest<HTMLAnchorElement>("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("/#")) {
          const id = href.replace("/#", "");
          if (id.startsWith("tour-")) {
            e.preventDefault();
            if (id === "tour-inbox") selectTab(0);
            else if (id === "tour-automations") selectTab(1);
            else if (id === "tour-pipelines") selectTab(2);
            else if (id === "tour-analytics") selectTab(3);

            const el = document.getElementById("tour");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          } else {
            const el = document.getElementById(id);
            if (el) {
              e.preventDefault();
              el.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("hashchange", handleHash);
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return null;
}
