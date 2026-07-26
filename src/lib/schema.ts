import {
  BUSINESS_NAME,
  EMAIL,
  GOOGLE_RATING,
  PHONE_E164,
  POSTAL_CODE,
  REVIEW_COUNT,
  SERVICE_BASE_LOCALITY,
  SERVICE_REGION,
  SITE_URL,
  SOCIAL_PROFILES,
  SLOGAN,
} from "@/lib/site";
import { faq, process } from "@/lib/content";
import { googleReviews } from "@/lib/reviews";

const description =
  "Family-owned movers in Orlando & Central Florida. Full-service, labor-only & apartment moves. Up-front hourly pricing, bilingual crew. Call (689) 600-2720.";

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MovingCompany", "LocalBusiness"],
        "@id": `${SITE_URL}/#movingcompany`,
        name: BUSINESS_NAME,
        legalName: "Toro Movers LLC",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logos/toro-lockup-navy.svg`,
        },
        image: `${SITE_URL}/images/hero-poster.webp`,
        description,
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
        sameAs: SOCIAL_PROFILES,
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
        name: "Toro Movers | Local Movers in Orlando & Central Florida",
        description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#movingcompany` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/hero-poster.webp`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "#faq h2", "#faq h3", ".aeo-answer"],
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
        name: "How to book local movers with Toro Movers",
        description:
          "Three steps to book bilingual local movers in Orlando and Central Florida.",
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
