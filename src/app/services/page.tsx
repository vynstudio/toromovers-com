import type { Metadata } from "next";
import QuoteWizard from "@/components/home/QuoteWizard";
import QuotesFaq from "@/components/funnel/QuotesFaq";
import boxes from "../../assets/home/family-boxes-2.jpg";
import carrying from "../../assets/home/family-carrying-boxes-5.jpg";
import newHouse from "../../assets/home/family-new-house-3.jpg";
import smiles from "../../assets/home/family-smiles-4.jpg";
import together from "../../assets/home/family-together-6.jpg";
import family from "../../assets/home/family-with-boxes.jpg";
import happyFamily from "../../assets/home/happy-family.jpg";
import keys from "../../assets/home/couple-keys-7.jpg";
import parentChild from "../../assets/home/parent-and-child.jpg";
import taping from "../../assets/home/woman-taping-boxes.jpg";
import {
  SERVICES_DESCRIPTION,
  SERVICES_FOOT,
  SERVICES_H1,
  SERVICES_LEDE,
  SERVICES_OG_TITLE,
  SERVICES_PATH,
  SERVICES_PHONE,
  SERVICES_PHONE_TEL,
  SERVICES_TITLE,
  SERVICES_URL,
  servicesFaqGraph,
  servicesPagePrimary,
  servicesPageSecondary,
  type ServicesPageCard,
} from "@/lib/services-page";

const PHOTOS: { src: string; alt: string }[] = [
  { src: assetSrc(happyFamily), alt: "Kids running into their new home on moving day" },
  { src: assetSrc(newHouse), alt: "Parents and a child at the door of a new home" },
  { src: assetSrc(boxes), alt: "A couple with moving boxes in a living room" },
  { src: assetSrc(taping), alt: "A woman taping boxes on moving day" },
  { src: assetSrc(parentChild), alt: "A parent and child moving into a new home" },
  { src: assetSrc(family), alt: "A family carrying boxes into a new home" },
  { src: assetSrc(together), alt: "A family standing with moving boxes in a new home" },
  { src: assetSrc(keys), alt: "Couple holding keys to a new home" },
  { src: assetSrc(carrying), alt: "A family carrying boxes on moving day" },
  { src: assetSrc(smiles), alt: "A family smiling with boxes in a new home" },
];

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src;
}

export const metadata: Metadata = {
  title: SERVICES_TITLE,
  description: SERVICES_DESCRIPTION,
  alternates: { canonical: SERVICES_PATH },
  openGraph: {
    title: SERVICES_OG_TITLE,
    description: SERVICES_DESCRIPTION,
    url: SERVICES_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SERVICES_OG_TITLE,
    description: SERVICES_DESCRIPTION,
  },
};

function ServiceCard({ item, index }: { item: ServicesPageCard; index: number }) {
  const photo = PHOTOS[index % PHOTOS.length];
  return (
    <li>
      <a href={item.href} className="svc-card" data-cta={`services-hub-${item.href.replace(/\//g, "")}`}>
        <img src={photo.src} alt={photo.alt} width={960} height={720} />
        <span className="svc-card-body">
          {item.badge ? <span className="svc-badge">{item.badge}</span> : null}
          <span className="svc-card-title">{item.title}</span>
          <span className="svc-card-copy">{item.body}</span>
          <span className="svc-card-link">
            {item.linkLabel} <span aria-hidden>→</span>
          </span>
        </span>
      </a>
    </li>
  );
}

/**
 * Services hub. Homepage header and footer come from the page shell.
 * Leads from the quote wizard are tagged services_page.
 */
export default function ServicesPage() {
  return (
    <main id="main" className="services-rebrand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesFaqGraph()),
        }}
      />
      <section className="svc-hero" aria-labelledby="services-hub-heading">
        <div className="svc-copy">
          <p className="eyebrow">Moving services</p>
          <h1 id="services-hub-heading">{SERVICES_H1}</h1>
          <p className="aeo-answer">{SERVICES_LEDE}</p>
          <a className="btn btn-red" href={SERVICES_PHONE_TEL} data-cta="services-hub-call">
            <span>Call {SERVICES_PHONE}</span>
          </a>
        </div>
        <QuoteWizard
          source="services_page"
          phoneDisplay={SERVICES_PHONE}
          phoneTel={SERVICES_PHONE_TEL}
          formId="quote-form"
        />
      </section>

      <section className="svc-list" aria-labelledby="services-main-heading">
        <h2 id="services-main-heading">Main services</h2>
        <ul className="svc-grid">
          {servicesPagePrimary.map((item, index) => (
            <ServiceCard key={item.href} item={item} index={index} />
          ))}
        </ul>
        <h2 id="services-more-heading">More ways we help</h2>
        <ul className="svc-grid svc-grid-more" aria-labelledby="services-more-heading">
          {servicesPageSecondary.map((item, index) => (
            <ServiceCard key={item.href} item={item} index={index + servicesPagePrimary.length} />
          ))}
        </ul>
        <p className="svc-foot">{SERVICES_FOOT}</p>
      </section>

      <QuotesFaq />
    </main>
  );
}
