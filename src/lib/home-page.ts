/**
 * Homepage preview copy. Facts already published on the site.
 * Licensed / insured is not claimed: the repo forbids that wording and
 * does not record a license number.
 */

import { blogHref, blogPosts, type BlogPost } from "./blog.ts";
import { googleReviews, reviewsHeading, reviewsSub } from "./reviews.ts";
import {
  HOURLY_RATE_PHRASE,
  LOCAL_HOURLY_RATE_SENTENCE,
} from "./published-rate.ts";
import {
  GOOGLE_MAPS_REVIEWS_URL,
  HOURS_LABEL,
  SITE_URL,
} from "./site.ts";
import {
  GUIDE_COUNT,
  HOME_PHONE_DISPLAY,
  HOME_PHONE_E164,
  HOME_PHONE_TEL,
  NATIONWIDE_HREF,
  SERVICE_LINKS,
  chromeCities,
} from "./site-chrome.ts";

export {
  HOME_PHONE_DISPLAY,
  HOME_PHONE_E164,
  HOME_PHONE_TEL,
  NATIONWIDE_HREF,
};

export const HOME_TITLE = "Toro Movers | Central Florida Movers";

export const HOME_DESCRIPTION =
  "Toro Movers is a family-owned, bilingual moving company serving Orlando and Central Florida. Local moves are $95 per mover per hour. Call 888-503-1756.";

export const HOME_H1 = "Movers in Orlando & Central Florida";

/** Existing homepage lede. Covers local and long-distance without a city-keyword title. */
export const HOME_LEDE =
  "Home, apartment, townhome, condo, and office moves — plus storage, POD, and U-Haul load & unload. Local and long-distance across Orlando and Central Florida. Family-owned, bilingual, with upfront hourly rates and no hidden fees.";

export const trustItems = [
  { title: "Family-owned", body: "You work with the people running the job.", icon: "moving-home" },
  { title: "5-star Google reviews", body: "On time, careful, and clear about the rate.", icon: "trust" },
  { title: "English & Spanish", body: "Quote, schedule, and move day in either language.", icon: "checklist" },
  { title: "No hidden fees", body: "No fuel surcharge and no stair fees.", icon: "safety" },
] as const;

export const pricing = {
  eyebrow: "Local hourly rate",
  price: HOURLY_RATE_PHRASE,
  sentence: LOCAL_HOURLY_RATE_SENTENCE,
  note: "Long-distance and interstate moves are a trip quote from origin, destination, and inventory.",
} as const;

export const services = [
  {
    title: "Full-service moving",
    body: "Crew and truck for homes, townhomes, and apartments — loading, transport, unloading, and room-by-room placement.",
    href: SERVICE_LINKS[0].href,
    icon: "truck",
    photo: "family",
  },
  {
    title: "Labor-only moving",
    body: "You have the U-Haul, POD, or rental truck. The crew loads or unloads it by the hour.",
    href: SERVICE_LINKS[1].href,
    icon: "trolley",
    photo: "parent",
  },
  {
    title: "Apartment movers",
    body: "Stairs, elevators, loading zones, and move-in windows planned before the crew arrives.",
    href: SERVICE_LINKS[2].href,
    icon: "moving-home",
    photo: "happy",
  },
  {
    title: "Packing",
    body: "The crew boxes a named room or the loose goods before the carry, on the same hourly rate as the move.",
    href: SERVICE_LINKS[3].href,
    icon: "packing",
    photo: "taping",
  },
  {
    title: "Office movers",
    body: "Small offices and light commercial suites, including after-hours windows when the building allows.",
    href: SERVICE_LINKS[4].href,
    icon: "pickup",
    photo: "family",
  },
  {
    title: "POD & U-Haul loading",
    body: "Load or unload a POD, U-Haul, or storage unit. You keep the truck or container.",
    href: SERVICE_LINKS[5].href,
    icon: "storage",
    photo: "parent",
  },
] as const;

export const howItWorks = {
  heading: "How it works",
  steps: [
    {
      name: "Get a quote",
      text: "Share the date, both addresses, and what you are moving. We explain the hourly rate before move day.",
      icon: "search",
    },
    {
      name: "Book with a deposit",
      text: "Pay a deposit to hold your move date.",
      icon: "checklist",
    },
    {
      name: "Move day",
      text: "The crew loads, protects, and places.",
      icon: "truck",
    },
  ],
} as const;

export const reviewBlock = {
  heading: reviewsHeading,
  sub: reviewsSub,
  items: googleReviews,
  mapsUrl: GOOGLE_MAPS_REVIEWS_URL,
} as const;

export function homeCities() {
  return chromeCities();
}

function byNewest(posts: readonly BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title),
  );
}

export function homeGuides() {
  const sorted = byNewest(blogPosts);
  const featured = sorted[0];
  const cards = sorted.slice(1, 3);
  return {
    featured: {
      ...featured,
      href: blogHref(featured.slug),
    },
    cards: cards.map((post) => ({
      ...post,
      href: blogHref(post.slug),
    })),
    total: GUIDE_COUNT,
  };
}

export const homeFaqs = [
  {
    q: "How much does a local move cost?",
    a: `${LOCAL_HOURLY_RATE_SENTENCE} The final cost depends on crew size, truck needs, stairs, elevators, distance, and how much you need moved. Call ${HOME_PHONE_DISPLAY} or request a quote and we will explain the hourly pricing model before move day.`,
  },
  {
    q: "Do you charge fuel or stair fees?",
    a: "No. Local moves have no fuel surcharge and no stair fees. Stairs, elevator waits, and a long carry add time on the hourly clock. They are not a separate fee.",
  },
  {
    q: "Do you offer labor-only loading and unloading?",
    a: "Yes. Toro Movers offers labor-only loading and unloading for U-Haul trucks, PODS, trailers, storage units, and rental trucks. You provide the vehicle or container, and the crew handles the heavy lifting, tight loading, unloading, and placement by the hour.",
  },
  {
    q: "What is the difference between full-service moving and labor-only moving?",
    a: "Full-service moving includes the crew, truck, loading, transportation, unloading, and placement. Labor-only moving is for customers who already have a U-Haul, POD, trailer, or rental truck and only need movers for loading, unloading, or rearranging heavy items. Both use up-front hourly rates explained before move day.",
  },
  {
    q: "Do you handle long-distance and interstate moves?",
    a: `Yes. Toro Movers quotes local Central Florida moves and long-distance or interstate moves. A long-distance or out-of-state move is a trip quote from the pickup, the destination, and the inventory. Call ${HOME_PHONE_DISPLAY}.`,
  },
  {
    q: "Are the crews bilingual?",
    a: `Yes. Toro Movers has an English and Spanish-speaking crew. Bilingual communication helps with timing, access instructions, fragile items, furniture placement, and building rules from the first quote to the last box. Call ${HOME_PHONE_DISPLAY} or request a quote.`,
  },
  {
    q: "How do I book a move?",
    a: `Request a quote, then pay a deposit to hold the move date. On move day the crew loads, protects, and places. Call ${HOME_PHONE_DISPLAY}. Hours: ${HOURS_LABEL}.`,
  },
] as const;

export function homeStructuredData(imageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: HOME_TITLE,
        description: HOME_DESCRIPTION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#movingcompany` },
        ...(imageUrl
          ? { primaryImageOfPage: { "@type": "ImageObject", url: imageUrl } }
          : {}),
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: homeFaqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/#howto`,
        name: howItWorks.heading,
        description:
          "Three steps to book Toro Movers: request a quote, pay a deposit to hold the date, then move day.",
        step: howItWorks.steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      },
    ],
  };
}
