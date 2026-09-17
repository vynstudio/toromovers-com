import type { Metadata } from "next";
import AdsShortForm from "@/components/funnel/AdsShortForm";
import { ToroLockup } from "@/components/funnel/ToroLockup";
import { FUNNEL_SLA, FUNNEL_TRUST_CHIPS } from "@/lib/funnel-offer";
import { quotePage, quotePageGraph, QUOTE_PAGE_URL } from "@/lib/quote-page";
import {
  EMAIL,
  EMAIL_HREF,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/site";

export const dynamic = "force-static";

const page = quotePage;

export const metadata: Metadata = {
  title: page.metadata.title,
  description: page.metadata.description,
  alternates: { canonical: QUOTE_PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: [
    "local moving quote Orlando",
    "up-front hourly movers",
    "movers from $75 per hour",
    "no fuel surcharge movers",
    "bilingual movers Orlando",
    "long-distance movers Orlando",
    "interstate movers Florida",
    "Central Florida moving quote",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: QUOTE_PAGE_URL,
    siteName: "Toro Movers",
    title: page.metadata.ogTitle,
    description: page.metadata.ogDescription,
    images: [
      {
        url: page.metadata.ogImage,
        width: 1200,
        height: 630,
        alt: page.metadata.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: page.metadata.ogTitle,
    description: page.metadata.ogDescription,
    images: [page.metadata.ogImage],
  },
};

export default function GetMyPricePage() {
  return (
    <main id="main" className="gmp-page min-h-screen bg-white text-[#0A0A0A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(quotePageGraph()),
        }}
      />
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5">
          <ToroLockup className="w-full justify-center" />
          <a
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-xl bg-[#E20613] px-4 py-2.5 text-sm font-extrabold whitespace-nowrap text-white transition hover:bg-[#B80510] sm:min-h-0 sm:w-auto"
            href={PHONE_TEL}
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-5 py-6 sm:py-10">
        <nav aria-label="Breadcrumb" className="gmp-crumbs">
          <ol>
            {page.breadcrumb.map((item, i) => (
              <li key={item.href}>
                {i < page.breadcrumb.length - 1 ? (
                  <a href={item.href}>{item.name}</a>
                ) : (
                  <span aria-current="page">{item.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            {page.hero.h1}
          </h1>
          <p className="aeo-answer mx-auto mt-3 max-w-2xl text-base leading-6 text-zinc-700 sm:text-lg">
            {page.hero.lede}
          </p>
          <ul className="aeo-facts mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-2">
            {page.hero.facts.map((fact) => (
              <li
                key={fact}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-bold text-[#0A0A0A] sm:text-sm"
              >
                {fact}
              </li>
            ))}
          </ul>
          <ul className="mx-auto mt-3 flex max-w-2xl flex-wrap items-center justify-center gap-2">
            {FUNNEL_TRUST_CHIPS.map((chip) => (
              <li
                key={chip}
                className="rounded-full bg-[#FCE6E8] px-3 py-1.5 text-xs font-bold text-[#0A0A0A] sm:text-sm"
              >
                {chip}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-600">
            {FUNNEL_SLA}.
          </p>
        </div>
        <AdsShortForm />

        <section id="gmp-howto" className="gmp-seo" aria-labelledby="gmp-howto-heading">
          <h2 id="gmp-howto-heading">{page.howTo.h2}</h2>
          <p>{page.howTo.intro}</p>
          <ol>
            {page.howTo.steps.map((step, i) => (
              <li key={step.name}>
                <strong>
                  {i + 1}. {step.name}.
                </strong>{" "}
                {step.text}
              </li>
            ))}
          </ol>
        </section>

        <section className="gmp-seo" aria-labelledby="gmp-services-heading">
          <h2 id="gmp-services-heading">{page.services.h2}</h2>
          <p>{page.services.intro}</p>
          <ul className="gmp-service-links">
            {page.services.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
                <span> — {link.note}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="gmp-faq" className="gmp-seo" aria-labelledby="gmp-faq-heading">
          <h2 id="gmp-faq-heading">Moving quote FAQs</h2>
          {page.faqs.map((item) => (
            <div key={item.q} className="gmp-faq-item">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </section>
      </section>

      <footer className="gmp-nap">
        <p>{page.footer.nap}</p>
        <p>{page.footer.hours}</p>
        <p>
          <a href={PHONE_TEL}>Call {PHONE_DISPLAY}</a>
          {" · "}
          <a href={EMAIL_HREF}>{EMAIL}</a>
          {" · "}
          <a href="/privacy">Privacy</a>
        </p>
      </footer>
    </main>
  );
}
