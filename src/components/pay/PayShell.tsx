import type { ReactNode } from "react";
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export function PayLockup({ href = "/" }: { href?: string | null }) {
  const inner = (
    <>
      <span className="pay-lockup-mark" aria-hidden>
        {/* native img: pay.css constrains the box so global height:auto cannot blow the SVG up */}
        <img src="/logos/toro-bull-black.svg" alt="" width={72} height={56} />
      </span>
      <span>
        TORO
        <span className="pay-lockup-movers">MOVERS</span>
      </span>
    </>
  );

  if (!href) {
    return (
      <span className="pay-lockup" aria-label={BUSINESS_NAME}>
        {inner}
      </span>
    );
  }

  return (
    <a href={href} className="pay-lockup" aria-label={`${BUSINESS_NAME} home`}>
      {inner}
    </a>
  );
}

export function PayHeader() {
  return (
    <header className="pay-header">
      <div className="pay-header-inner">
        <PayLockup />
        <a className="pay-call" href={PHONE_TEL}>
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </header>
  );
}

export function PayShell({ children }: { children: ReactNode }) {
  return (
    <div className="pay-page">
      <PayHeader />
      {children}
    </div>
  );
}
