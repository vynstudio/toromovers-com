import { FUNNEL_SLA } from "./funnel-offer.ts";

/** The only published rate sentence. Do not paraphrase. */
export const QUOTE_RATE_ANSWER =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

export const quoteFaqs = [
  {
    q: "How much does it cost?",
    a: QUOTE_RATE_ANSWER,
  },
  {
    q: "How fast do you call back?",
    a: `${FUNNEL_SLA}. After hours, we call the next business morning.`,
  },
  {
    q: "Do you do same-day moves?",
    a: "Yes, when a crew is open that day. Same-day moves depend on crew availability. There is no extra fee.",
  },
  {
    q: "What areas do you serve?",
    a: "Orlando and Central Florida, including Winter Park, Kissimmee, Lake Mary, and Oviedo. Long-distance and interstate moves are quoted from the origin and destination.",
  },
] as const;
