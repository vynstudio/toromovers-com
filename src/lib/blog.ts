/**
 * Design-owned blog posts (former homepage feature + integration bands).
 * Homepage shows these as 3 cards → each links to full /blog/[slug] guide.
 */

export type BlogPost = {
  slug: string;
  title: string;
  /** SEO meta description */
  description: string;
  /**
   * Homepage / index card teaser — keep ~110–120 chars so all 3 cards match.
   */
  teaser: string;
  eyebrow: string;
  date: string;
  dateLabel: string;
  image: { src: string; alt: string; position?: string };
  /** Full AEO article body */
  body: readonly string[];
  /** Optional FAQ block — visible text must match FAQPage schema when present */
  faqs?: readonly { q: string; a: string }[];
};

export const blogPosts: readonly BlogPost[] = [

  {
    slug: "how-much-does-a-local-move-cost-orlando",
    eyebrow: "Orlando moving costs",
    title: "How much do movers cost in Orlando?",
    teaser:
      "What drives Orlando moving prices—crew size, access, truck vs labor-only—and how Toro explains up-front hourly rates before move day.",
    description:
      "How much do movers cost in Orlando? Learn what changes the price for local and labor-only moves, and how Toro Movers quotes up-front hourly rates. Call (689) 600-2720.",
    date: "2026-09-10",
    dateLabel: "Sep 10, 2026",
    image: {
      src: "/images/moves/svc-primary-residential.webp",
      alt: "Toro Movers crew on a real Orlando residential move",
      position: "object-[center_35%]",
    },
    body: [
      "How much do movers cost in Orlando? Most local moves are priced by the hour. Your total depends on crew size, how long the job takes, building access (stairs, elevators, parking), how packed you are when the crew arrives, and whether you need a truck or labor-only help on a U-Haul or POD.",
      "Toro Movers is a family-owned local moving company serving Orlando and Central Florida. We quote with up-front hourly rates and explain the model before move day—so you are not guessing on the curb. We do not publish a fake rate card on this page; your quote is based on your addresses, inventory, and access.",
      "Full-service local moving includes the crew, truck, loading, transport, unloading, and placement. Labor-only moving is for customers who already have a rental truck, POD, or trailer and only need loading or unloading help. Labor-only is usually less than full-service because you are not paying for the truck and transport portion.",
      "Access changes the clock. Walk-up apartments, reserved elevators, long carries from the door to the truck, and tight parking all add time. Share floors, elevator windows, and loading rules when you request a quote so the crew size and timing match the building.",
      "Industry websites and aggregators publish Orlando averages that vary by source and year. Treat those figures as market context only—not a Toro price. For apartment-specific planning, see /apartment-movers-orlando-fl. For DIY truck help, see /labor-only-moving.",
      "To get a clear explanation for your move, call or text (689) 600-2720 or request a quote online. Share pickup and drop-off, home or apartment type, stairs or elevator details, and whether you need a truck. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
    ],
    faqs: [
      {
        q: "How much do movers cost in Orlando?",
        a: "Most Orlando moves are quoted with hourly rates. The final total depends on crew size, time on site, access (stairs, elevators, parking), readiness, and whether you need full-service with a truck or labor-only help. Toro Movers explains the up-front hourly model before move day—call (689) 600-2720 with your details.",
      },
      {
        q: "Is labor-only cheaper than full-service?",
        a: "Often yes, because you supply the U-Haul, POD, or rental truck and pay for loading or unloading help by the hour. Full-service includes the truck and transport. The better fit depends on whether you already have a vehicle.",
      },
      {
        q: "What makes an apartment move cost more?",
        a: "Stairs, elevator reservations, long carries, tight parking, and last-minute packing increase time on site. Planning access early keeps the hourly total more predictable.",
      },
      {
        q: "Do you publish a public rate card?",
        a: "No. Toro Movers explains up-front hourly rates for your specific job. Published market averages from other sites are context only—not your quote.",
      },
      {
        q: "How do I get a moving quote from Toro Movers?",
        a: "Call or text (689) 600-2720, or request a quote online. Share what you are moving, pickup and drop-off, and access details. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
      },
    ],
  },
  {
    slug: "plan-orlando-move-before-first-box",
    eyebrow: "Orlando move planning",
    title: "Plan your Orlando move before the first box",
    teaser:
      "Plan access, stairs, elevators, parking, and storage before move day—with a clear crew plan and up-front hourly rates in Central Florida.",
    description:
      "How Toro Movers plans Orlando moves around apartment access, stairs, elevators, parking, and storage—before move day starts.",
    date: "2026-07-28",
    dateLabel: "Jul 28, 2026",
    image: {
      src: "/images/moves/svc-primary-residential.webp",
      alt: "Toro Movers crew loading a wrapped item into the truck on a real Orlando residential move",
      position: "object-[center_35%]",
    },
    body: [
      "A smooth Orlando move starts with logistics, not packing-day chaos. Toro Movers plans around apartment access, stairs, elevator windows, parking, storage units, and rental trucks—so you get a clear crew plan and up-front hourly rates before move day in Central Florida.",
      "Share your move date, pickup and drop-off addresses, home or apartment type, and access details when you request an estimate. We match crew size, explain the hourly rate model, and set expectations before the first box is lifted.",
      "Whether you need full-service movers with a truck or labor-only loading for a U-Haul or POD, planning access early keeps Orlando and Central Florida moves on schedule.",
    ],
  },
  {
    slug: "careful-furniture-handling-orlando-movers",
    eyebrow: "Careful local movers",
    title: "Careful furniture handling for apartments and homes",
    teaser:
      "Protect furniture through stairwells, doorways, floors, and truck space—on full-service or labor-only Orlando and Central Florida moves.",
    description:
      "How Orlando movers protect furniture through stairwells, doorways, floors, and truck space on full-service and labor-only jobs.",
    date: "2026-07-28",
    dateLabel: "Jul 28, 2026",
    image: {
      src: "/images/moves/svc-labor.webp",
      alt: "Toro Movers carefully stretch-wrapping furniture on a real Central Florida job",
      position: "object-[center_28%]",
    },
    body: [
      "Careful moving is more than strength. Toro Movers protects furniture, boxes, and fragile items through tight stairwells, doorways, floors, and truck space—whether you hire full-service movers or labor-only loading and unloading for your Orlando or Central Florida move.",
      "Stretch wrap, pads, and deliberate loading protect pieces from scuffs and tight turns in apartments, townhomes, and houses. Full-service includes the crew, truck, load, transport, unload, and placement; labor-only applies the same care when you already have a rental truck or container.",
      "The goal is simple: move efficiently without making a mess of your day—or your belongings and building.",
    ],
  },
  {
    slug: "central-florida-movers-building-access",
    eyebrow: "Building access & logistics",
    title: "Central Florida movers who plan around the building",
    teaser:
      "Plan HOA windows, elevators, loading zones, and U-Haul or POD access with a local crew—and clear up-front hourly rates in Central Florida.",
    description:
      "Apartment rules, HOA windows, elevators, loading zones, and POD or U-Haul access—how Toro Movers plans Central Florida moves around the building.",
    date: "2026-07-28",
    dateLabel: "Jul 28, 2026",
    image: {
      src: "/images/moves/real-21.webp",
      alt: "Toro Movers crew carrying furniture up stairs on a real Orlando-area complex move",
      position: "object-[center_30%]",
    },
    body: [
      "Toro Movers works around real apartment and HOA logistics across Central Florida: elevators, stairs, loading zones, storage access, and U-Haul or POD loading. Local crews help you plan the move around the building—not the other way around—with clear up-front hourly rates.",
      "Timed elevators, parking rules, and shared driveways are common on Orlando-area jobs. Tell us about building access when you call or request a quote so the crew, truck, and timing line up with the property—not against it.",
      "If your move involves a complex, storage unit, or rental truck, plan those details early so load and unload stay efficient from the first box to final placement.",
    ],
  },
] as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function blogHref(slug: string): string {
  return `/blog/${slug}`;
}
