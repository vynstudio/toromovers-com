/**
 * Homepage copy for the photo-led editorial page.
 * Licensed / insured is not claimed. No rush fees.
 */

import { blogHref, blogPosts } from "./blog.ts";
import { GOOGLE_MAPS_REVIEWS_URL, GOOGLE_RATING, SITE_URL } from "./site.ts";
import {
  GUIDE_COUNT,
  HOME_PHONE_DISPLAY,
  HOME_PHONE_E164,
  HOME_PHONE_TEL,
  NATIONWIDE_HREF,
  SERVICE_LINKS,
} from "./site-chrome.ts";

export {
  GOOGLE_MAPS_REVIEWS_URL,
  GOOGLE_RATING,
  GUIDE_COUNT,
  HOME_PHONE_DISPLAY,
  HOME_PHONE_E164,
  HOME_PHONE_TEL,
  NATIONWIDE_HREF,
};

export const HOME_TITLE = "Toro Movers | Central Florida Movers";

export const HOME_DESCRIPTION =
  "Central Florida movers for homes, apartments and offices. No hidden fees. Call 888-503-1756.";

export const HOME_H1 = "Move day, made easy.";

export const HOME_LEDE =
  "Central Florida movers for homes, apartments and offices. No hidden fees.";

export const homeServices = [
  {
    n: "01",
    title: "Full move",
    body: "Load, move, unload, set up. One crew from first box to last.",
    href: SERVICE_LINKS[0].href,
    photo: "new-house",
    icon: "home",
  },
  {
    n: "02",
    title: "Labor only",
    body: "You have the ride. We bring the muscle to load or unload it.",
    href: SERVICE_LINKS[1].href,
    photo: "boxes",
    icon: "people",
  },
  {
    n: "03",
    title: "Packing",
    body: "Boxed, wrapped and labeled so nothing rattles on the road.",
    href: SERVICE_LINKS[3].href,
    photo: "taping",
    icon: "box",
  },
  {
    n: "04",
    title: "Apartment move",
    body: "Stairs, elevators, tight halls. Fast hands, careful corners.",
    href: SERVICE_LINKS[2].href,
    photo: "parent",
    icon: "building",
  },
  {
    n: "05",
    title: "Office move",
    body: "Desks, files and tech moved so you get back to work quick.",
    href: SERVICE_LINKS[4].href,
    photo: "family",
    icon: "briefcase",
  },
  {
    n: "06",
    title: "POD / U-Haul loading",
    body: "Packed tight, balanced and secured. Ready to roll.",
    href: SERVICE_LINKS[5].href,
    photo: "together",
    icon: "package",
  },
] as const;

export const homeCounters = [
  {
    icon: "star",
    num: "5.0",
    label: "Google rating",
    desc: "Rated by real Orlando customers.",
  },
  {
    icon: "languages",
    num: "EN/ES",
    label: "English & Spanish",
    desc: "Talk to us in the language you like.",
  },
  {
    icon: "message",
    num: "Free",
    label: "Quotes",
    desc: "Tell us what you are moving.",
  },
  {
    icon: "receipt",
    num: "No",
    label: "Hidden fees",
    desc: "The rate you hear is the rate you pay.",
  },
] as const;

export const howItWorks = {
  heading: "Three steps to your new place.",
  steps: [
    {
      name: "Request a quote",
      text: "Tell us what you are moving. Takes about a minute.",
      icon: "message",
    },
    {
      name: "Confirm your date",
      text: "Pick your day and time. We lock it in.",
      icon: "calendar",
    },
    {
      name: "Move day",
      text: "Your crew shows up ready. You point, we lift.",
      icon: "home",
    },
  ],
} as const;

export const homeCities = [
  { name: "Orlando", href: "/orlando-movers" },
  { name: "Winter Park", href: "/winter-park-movers" },
  { name: "Oviedo", href: "/oviedo-movers" },
  { name: "Kissimmee", href: "/kissimmee-movers" },
  { name: "Sanford", href: "/sanford-movers" },
  { name: "Lake Mary", href: "/lake-mary-movers" },
  { name: "Altamonte Springs", href: "/altamonte-springs-movers" },
] as const;

export function homeGuides() {
  const posts = [...blogPosts].sort(
    (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title),
  );
  const [featured, ...rest] = posts;
  const cards = rest.slice(0, 2);
  return {
    featured: featured
      ? {
          title: featured.title,
          teaser: featured.teaser,
          href: blogHref(featured.slug),
          dateLabel: featured.dateLabel,
          slug: featured.slug,
        }
      : null,
    cards: cards.map((post) => ({
      title: post.title,
      teaser: post.teaser,
      href: blogHref(post.slug),
      dateLabel: post.dateLabel,
      slug: post.slug,
    })),
    total: GUIDE_COUNT,
  };
}

export const homeFaqs = [
  {
    q: "How much does a move cost?",
    a: "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. You pay for the movers and the hours. That is it.",
  },
  {
    q: "Can you just load my POD or U-Haul?",
    a: "Yes. Pick Labor only or POD / U-Haul loading and we bring the crew to load or unload.",
  },
  {
    q: "Do you speak Spanish?",
    a: "Sí. We help you in English and Spanish, from your first call to the last box.",
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
          "Three steps: request a quote, confirm your date, then move day.",
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
