import type { Metadata } from "next";
import Link from "next/link";
import { MoveChecklistWizard } from "@/components/move-checklist/wizard";
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import "./checklist.css";

export const metadata: Metadata = {
  title: "Confirm your move",
  description:
    "Deposit received. Finish this checklist. Toro Movers sends the booking confirmation after review.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/move-day-checklist" },
};

export default function MoveDayChecklistPage() {
  return (
    <main className="jsf-page mdc-page">
      <header className="jsf-bar">
        <div className="jsf-bar-inner">
          <Link href="/" className="jsf-brand" aria-label={`${BUSINESS_NAME} home`}>
            Toro Movers
          </Link>
          <a href={PHONE_TEL} className="jsf-phone">
            {PHONE_DISPLAY}
          </a>
        </div>
        <p className="mdc-status">
          Deposit received. Finish this checklist. We send the booking
          confirmation after we review it.
        </p>
      </header>
      <MoveChecklistWizard />
    </main>
  );
}
