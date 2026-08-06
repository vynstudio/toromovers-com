"use client";

import { useRouter } from "next/navigation";
import { LeadFunnel, type CapturedContact } from "@/components/LeadFunnel";

export const QUOTE_CONTACT_STORAGE_KEY = "toro-quote-contact";

/**
 * Page 1 of the split /get-a-quote flow — captures name/phone/email only,
 * saves the soft lead, then hands the contact to page 2 via sessionStorage
 * instead of transitioning in-place (keeps this page's job to just one
 * question, and the qualifying steps out of its JS path).
 */
export function QuoteCaptureFunnel() {
  const router = useRouter();

  function handleSoftCaptured(contact: CapturedContact) {
    try {
      sessionStorage.setItem(QUOTE_CONTACT_STORAGE_KEY, JSON.stringify(contact));
    } catch {
      // sessionStorage unavailable (private mode, etc.) — details page will
      // redirect back to /get-a-quote if it can't find a stored contact.
    }
    router.push("/get-a-quote/details");
  }

  return (
    <LeadFunnel
      variant="inline"
      source="get-a-quote-page"
      className="quote-page-funnel"
      onSoftCaptured={handleSoftCaptured}
    />
  );
}
