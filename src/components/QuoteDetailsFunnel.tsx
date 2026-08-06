"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LeadFunnel, type CapturedContact } from "@/components/LeadFunnel";
import { QUOTE_CONTACT_STORAGE_KEY } from "@/components/QuoteCaptureFunnel";

/**
 * Page 2 of the split /get-a-quote flow — picks up the contact saved by
 * page 1 and asks the qualifying questions (service/ZIPs/size/timing).
 * Anyone landing here without a stored contact (direct link, bot, cleared
 * storage) gets bounced back to start at page 1.
 */
export function QuoteDetailsFunnel() {
  const router = useRouter();
  const [contact, setContact] = useState<CapturedContact | null | "loading">(
    "loading",
  );

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(QUOTE_CONTACT_STORAGE_KEY);
      if (raw) {
        setContact(JSON.parse(raw) as CapturedContact);
        return;
      }
    } catch {
      // fall through to redirect
    }
    setContact(null);
  }, []);

  useEffect(() => {
    if (contact === null) router.replace("/get-a-quote");
  }, [contact, router]);

  if (contact === "loading" || contact === null) {
    return <div className="quote-page-funnel-loading" aria-hidden />;
  }

  return (
    <LeadFunnel
      variant="inline"
      source={contact.source || "get-a-quote-page"}
      className="quote-page-funnel"
      startPhase="service"
      initialContact={contact}
      onBackToStart={() => router.push("/get-a-quote")}
    />
  );
}
