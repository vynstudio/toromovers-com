import {
  BUSINESS_NAME,
  EMAIL,
  GOOGLE_MAPS_REVIEWS_URL,
  GOOGLE_RATING,
  PHONE_E164,
  POSTAL_CODE,
  REVIEW_COUNT,
  SERVICE_BASE_LOCALITY,
  SERVICE_REGION,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_PROFILES,
  SLOGAN,
} from "@/lib/site";
import { faq, process } from "@/lib/content";
import type { CityPageContent } from "@/lib/city-pages";
import { googleReviews } from "@/lib/reviews";

/** Organization / LocalBusiness description — visible-facts only. */
const organizationDescription =
  "Toro Movers is a family-owned Orlando moving company serving Central Florida with full-service moves, labor-only loading and unloading, apartment moving, bilingual English and Spanish crews, and up-front hourly rates.";

/** Homepage WebPage description — keep aligned with meta (SERP + AEO). */
const homepageDescription = SITE_DESCRIPTION;

/** Freshness for WebPage / GEO audits */
const DATE_MODIFIED = new Date().toISOString().slice(0, 10);

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "MovingCompany"],
        "@id": `${SITE_URL}/#movingcompany`,
        name: BUSINESS_NAME,
        legalName: "Toro Movers LLC",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logos/toro-lockup-navy.svg`,
        },
        image: `${SITE_URL}/images/moves/real-23.webp`,
        description: organizationDescription,
        slogan: SLOGAN,
        telephone: PHONE_E164,
        email: EMAIL,
        priceRange: "$$",
        currenciesAccepted: "USD",
        paymentAccepted: "Cash, Credit Card, Debit Card",
        address: {
          "@type": "PostalAddress",
          addressLocality: SERVICE_BASE_LOCALITY,
          addressRegion: "FL",
          postalCode: POSTAL_CODE,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 28.5383,
          longitude: -81.3792,
        },
        areaServed: [
          { "@type": "City", name: "Orlando" },
          { "@type": "AdministrativeArea", name: "Orange County" },
          { "@type": "AdministrativeArea", name: "Seminole County" },
          { "@type": "AdministrativeArea", name: "Osceola County" },
          { "@type": "AdministrativeArea", name: "Lake County" },
          { "@type": "AdministrativeArea", name: "Polk County" },
          { "@type": "AdministrativeArea", name: SERVICE_REGION },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: GOOGLE_RATING,
          bestRating: "5",
          reviewCount: REVIEW_COUNT,
        },
        review: googleReviews.slice(0, 5).map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.name },
          reviewBody: r.text,
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(r.rating),
            bestRating: "5",
          },
        })),
        sameAs: [
          ...SOCIAL_PROFILES,
          GOOGLE_MAPS_REVIEWS_URL,
        ].filter(Boolean),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "07:00",
            closes: "19:00",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Moving services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Full-service local moving",
                serviceType: "Full-service moving",
                areaServed: SERVICE_REGION,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Labor-only loading and unloading",
                serviceType: "Labor-only moving",
                areaServed: SERVICE_REGION,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Apartment and condo moving",
                serviceType: "Apartment moving",
                areaServed: SERVICE_REGION,
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: BUSINESS_NAME,
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#movingcompany` },
        inLanguage: "en-US",
      },
    ],
  };
}

export function homePageGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: homepageDescription,
        dateModified: DATE_MODIFIED,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#movingcompany` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/moves/real-23.webp`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [
            "h1",
            "#proof-heading",
            "#closing-heading",
            "#faq h2",
            "#faq h3",
            ".aeo-answer",
          ],
        },
        potentialAction: {
          "@type": "CommunicateAction",
          name: "Get a free moving quote",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/contact`,
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
        },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/#howto`,
        name: process.heading,
        description:
          "Three steps to book bilingual local movers in Orlando and Central Florida with Toro Movers.",
        totalTime: "PT10M",
        step: process.steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.name,
          text: step.text,
        })),
      },
    ],
  };
}

/** City SEO page graph — MovingCompany + FAQ + breadcrumbs. Visible facts only. */
export function cityPageGraph(city: CityPageContent) {
  const pageUrl = `${SITE_URL}${city.href}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MovingCompany", "LocalBusiness"],
        "@id": `${pageUrl}#business`,
        name: `${BUSINESS_NAME} — ${city.name} Movers`,
        url: pageUrl,
        telephone: PHONE_E164,
        email: EMAIL,
        description: city.metadata.description,
        areaServed: [
          { "@type": "City", name: `${city.name}, FL` },
          { "@type": "AdministrativeArea", name: SERVICE_REGION },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: SERVICE_BASE_LOCALITY,
          addressRegion: "FL",
          addressCountry: "US",
        },
        parentOrganization: {
          "@type": "MovingCompany",
          name: BUSINESS_NAME,
          "@id": `${SITE_URL}/#movingcompany`,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: city.schema.lat,
          longitude: city.schema.lng,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: GOOGLE_RATING,
          bestRating: "5",
          reviewCount: REVIEW_COUNT,
        },
        knowsLanguage: ["en", "es"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${city.name} moving services`,
          itemListElement: city.services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.body,
              areaServed: `${city.name}, FL`,
              url: `${SITE_URL}${s.href}`,
            },
          })),
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: city.metadata.title,
        description: city.metadata.description,
        dateModified: DATE_MODIFIED,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${pageUrl}#business` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/hero-poster.webp`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "#faq h2", ".aeo-answer"],
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: `${city.name} Movers`,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: city.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
