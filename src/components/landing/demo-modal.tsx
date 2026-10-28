"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  User,
  Building2,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";

export function DemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Listen for clicks on any element with data-demo-trigger
  useEffect(() => {
    function handleGlobalClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target) return;

      const trigger = target.closest("[data-demo-trigger]");
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        setSuccess(false);
        setErrorMsg("");
        setIsOpen(true);
      }
    }

    function handleCustomEvent() {
      setSuccess(false);
      setErrorMsg("");
      setIsOpen(true);
    }

    document.addEventListener("click", handleGlobalClick, true);
    window.addEventListener("open-demo-modal", handleCustomEvent);

    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
      window.removeEventListener("open-demo-modal", handleCustomEvent);
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg("Please enter your phone or WhatsApp number.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please enter a valid business email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        company_name: "",
        phone: "",
        email: "",
      });
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0e0f11] p-6 sm:p-8 text-left shadow-[0_25px_60px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top green accent glow */}
        <span
          aria-hidden="true"
          className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#3ddc97]/80 to-transparent"
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg border border-white/10 bg-[#141518] text-[#8a8f98] transition-colors hover:border-white/20 hover:text-white"
          aria-label="Close dialog"
        >
          <X className="size-4" />
        </button>

        {!success ? (
          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3ddc97]/30 bg-[#3ddc97]/10 px-2.5 py-0.5 font-mono text-xs font-medium text-[#3ddc97]">
                <span className="size-1.5 rounded-full bg-[#3ddc97] animate-pulse" />
                Priority Access
              </span>
              <span className="font-mono text-xs text-[#8a8f98]">
                1-on-1 Guided Setup
              </span>
            </div>

            {/* Title & Description */}
            <h2
              id="demo-modal-title"
              className="mt-4 text-2xl font-bold tracking-tight text-white"
            >
              Request a Demo &amp; Setup
            </h2>
            <p className="mt-2 text-sm text-[#8a8f98] leading-relaxed">
              Fill in your details below and our team will get in touch to schedule
              your personalized walkthrough and assist with complete WhatsApp onboarding.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#edeef0]">
                  Full Name <span className="text-[#3ddc97]">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8a8f98]">
                    <User className="size-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shubham Sharma"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#141518] py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#8a8f98]/60 transition-colors focus:border-[#3ddc97] focus:outline-none focus:ring-1 focus:ring-[#3ddc97]"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#edeef0]">
                  Company Name <span className="text-[#8a8f98]">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8a8f98]">
                    <Building2 className="size-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Acme Technologies"
                    value={formData.company_name}
                    onChange={(e) =>
                      setFormData({ ...formData, company_name: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#141518] py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#8a8f98]/60 transition-colors focus:border-[#3ddc97] focus:outline-none focus:ring-1 focus:ring-[#3ddc97]"
                  />
                </div>
              </div>

              {/* Two columns: Phone & Email */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#edeef0]">
                    Phone / WhatsApp <span className="text-[#3ddc97]">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8a8f98]">
                      <Phone className="size-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#141518] py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#8a8f98]/60 transition-colors focus:border-[#3ddc97] focus:outline-none focus:ring-1 focus:ring-[#3ddc97]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#edeef0]">
                    Business Email <span className="text-[#3ddc97]">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8a8f98]">
                      <Mail className="size-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#141518] py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#8a8f98]/60 transition-colors focus:border-[#3ddc97] focus:outline-none focus:ring-1 focus:ring-[#3ddc97]"
                    />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#3ddc97] py-3 px-5 text-sm font-semibold text-[#04110b] shadow-[0_4px_20px_rgba(61,220,151,0.35)] transition-all hover:bg-[#34c486] active:translate-y-px disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Submitting Request…
                  </>
                ) : (
                  <>
                    Request Demo &amp; Setup
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>

              {/* Privacy / SLA note */}
              <div className="mt-1 flex items-center justify-center gap-2 text-center text-xs text-[#8a8f98]">
                <ShieldCheck className="size-3.5 text-[#3ddc97]" />
                <span>Direct notification sent to system@lireach.tech</span>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="py-6 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-[#3ddc97]/30 bg-[#3ddc97]/15 text-[#3ddc97]">
              <CheckCircle2 className="size-8" />
            </div>
            <h3 className="mt-5 text-2xl font-bold tracking-tight text-white">
              Demo Request Received!
            </h3>
            <p className="mt-3 text-sm text-[#8a8f98] leading-relaxed">
              Thank you for reaching out! Your information has been securely saved,
              and a notification has been sent to our team at{" "}
              <span className="font-mono text-white">system@lireach.tech</span>.
            </p>
            <p className="mt-2 text-xs text-[#8a8f98]">
              We will contact you via WhatsApp and email within 2 business hours.
            </p>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#1b1c20] border border-white/15 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
