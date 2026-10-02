import type { Metadata } from "next";
import {
  THANKS_BACK,
  THANKS_DESCRIPTION,
  THANKS_H1,
  THANKS_HELP,
  THANKS_OG_TITLE,
  THANKS_PATH,
  THANKS_PHONE,
  THANKS_PHONE_TEL,
  THANKS_SLA,
  THANKS_TITLE,
} from "@/lib/thank-you-page";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: THANKS_TITLE,
  description: THANKS_DESCRIPTION,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: { canonical: THANKS_PATH },
  openGraph: {
    title: THANKS_OG_TITLE,
    description: THANKS_DESCRIPTION,
    url: `${SITE_URL}${THANKS_PATH}`,
  },
  twitter: {
    card: "summary_large_image",
    title: THANKS_OG_TITLE,
    description: THANKS_DESCRIPTION,
  },
};

/**
 * Post-quote confirmation. No site nav and no footer: the page is a single
 * card. Lead and generate_lead fire on the form before this redirect.
 */
export default function ThankYouPage() {
  return (
    <main className="thanks-rebrand">
      <section className="thanks-card" aria-labelledby="thanks-heading">
        <img
          className="thanks-logo"
          src="/logos/toro-lockup-navy.svg"
          alt="Toro Movers"
          width={184}
          height={46}
        />
        <figure className="thanks-photo">
          <img
            src="/images/pay-confirm-family.webp"
            srcSet="/images/pay-confirm-family-640.webp 640w, /images/pay-confirm-family.webp 1200w"
            sizes="(max-width: 760px) calc(100vw - 64px), 440px"
            width={1200}
            height={1666}
            alt="A smiling boy runs down the hallway of his family's new home past moving boxes as his sister and parents follow behind"
          />
        </figure>
        <h1 id="thanks-heading">{THANKS_H1}</h1>
        <p className="thanks-sla">{THANKS_SLA}</p>
        <p className="thanks-help">{THANKS_HELP}</p>
        <div className="thanks-actions">
          <a className="btn btn-red" href={THANKS_PHONE_TEL} data-cta="thanks-call">
            <span>Call {THANKS_PHONE}</span>
          </a>
          <a className="thanks-back" href="/">
            {THANKS_BACK}
          </a>
        </div>
      </section>
    </main>
  );
}
