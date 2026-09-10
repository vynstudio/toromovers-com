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
    slug: "uhaul-pod-loading-help-orlando",
    eyebrow: "U-Haul & POD help",
    title: "U-Haul and POD loading help in Orlando",
    teaser:
      "How labor-only loading works for U-Hauls, PODs, and storage—what to share before the crew arrives, and how Toro quotes short jobs.",
    description:
      "U-Haul or POD loading help in Orlando—what labor-only includes, how access affects the job, up-front quotes. Call (689) 600-2720.",
    date: "2026-09-10",
    dateLabel: "Sep 10, 2026",
    image: {
      src: "/images/moves/svc-labor.webp",
      alt: "Toro Movers loading furniture carefully on a Central Florida job",
      position: "object-[center_28%]",
    },
    body: [
      "U-Haul and POD loading help in Orlando is labor-only moving: you already have the truck or container, and a local crew loads, unloads, or both. Toro Movers helps with rental trucks, portable storage, and short loading jobs across Orlando and Central Florida—with up-front hourly rates explained before we start.",
      "This guide is for DIY movers who rented a U-Haul, Penske, Budget truck, or a POD-style container and need careful loading help—not a full door-to-door truck from the movers. If you want the truck and crew end to end, see full-service moving instead. If you only need one heavy piece or a quick curb load, see loading and unloading help.",
      "What labor-only usually includes: a crew sized for the job, padding when pieces need protection, loading into your truck or container, and unloading at the destination when you book both ends. You drive (or the container stays on site). We do not bring the rental vehicle on a labor-only booking.",
      "U-Haul and rental trucks: share truck size, whether the load is one-way or local, and how packed you will be when we arrive. Tight parking, long driveway carries, and second-floor walk-ups change time on site. Photos of bulky items help us plan the crew.",
      "PODs and portable storage: container doors, driveway placement, and HOA or apartment rules matter as much as the furniture list. Confirm where the unit will sit, whether stairs or elevators are involved from the home to the container, and any building time windows.",
      "Access still drives the clock. Stairs, elevators, COI or loading-dock rules, street parking, and how ready the home is when the crew shows up all affect how long a U-Haul or POD load takes. Apartment and condo moves should share floor counts and elevator reservations up front.",
      "Pricing for U-Haul and POD help is typically hourly. Totals depend on crew size, time on site, and access—not a one-size rate card. We explain the hourly model before move day. Call or text (689) 600-2720 with truck or container details, or request a quote online. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
      "Toro Movers is a family-owned local crew serving Orlando, Winter Park, Kissimmee, Clermont, Sanford, and nearby Central Florida. English and Spanish on the phone and on the job. For the full labor-only service page, visit labor-only movers; for short single-item jobs, visit loading and unloading.",
    ],
    faqs: [
      {
        q: "Do you load U-Hauls in Orlando?",
        a: "Yes. Toro Movers provides labor-only loading and unloading for U-Hauls and other rental trucks when you already have the vehicle. Share truck size, floors, and parking when you book.",
      },
      {
        q: "Do you load PODs and portable storage?",
        a: "Yes. We help load and unload POD-style containers and storage units when access and placement allow. Tell us driveway or lot placement and any building rules.",
      },
      {
        q: "How many movers do I need for a U-Haul load?",
        a: "Crew size depends on home size, heavy items, and stairs or elevators. Many local loads start with two movers; larger or tighter access jobs may need more. We confirm before arrival.",
      },
      {
        q: "Is this the same as full-service moving?",
        a: "No. Full-service includes the movers’ truck and transport. U-Haul and POD loading help is labor-only—you supply the truck or container. We will steer you to the clearer option when you describe the job.",
      },
      {
        q: "How do I book loading help?",
        a: "Call or text (689) 600-2720, or request a quote online. Share pickup and drop-off, truck or POD details, and access notes. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
      },
    ],
  },

  {
    slug: "full-service-vs-labor-only-orlando",
    eyebrow: "Choosing your move type",
    title: "Full-service vs labor-only movers in Orlando",
    teaser:
      "Truck and crew end-to-end, or loading help on your U-Haul or POD—how to choose for an Orlando or Central Florida move.",
    description:
      "Full-service vs labor-only movers in Orlando: what each includes, who each fits, and how Toro Movers quotes up-front hourly rates. Call (689) 600-2720.",
    date: "2026-09-10",
    dateLabel: "Sep 10, 2026",
    image: {
      src: "/images/moves/svc-labor.webp",
      alt: "Toro Movers packing furniture on a real Central Florida moving job",
      position: "object-[center_28%]",
    },
    body: [
      "Full-service vs labor-only movers in Orlando comes down to one question: do you already have the truck? Full-service includes the crew, truck, loading, transport, unloading, and placement. Labor-only is for customers who already have a U-Haul, POD, trailer, or rental truck and only need loading or unloading help.",
      "Choose full-service when you want one local team door to door and do not want to rent or drive a truck. It fits homes, townhomes, and apartments across Orlando and Central Florida when access, parking, and placement all need coordinating with the same crew.",
      "Choose labor-only when the vehicle is already handled. You save the truck portion of the job and pay for careful loading or unloading by the hour—including tight packs for PODs and rental trucks. Stairs, elevators, and long carries still matter, so share access details either way.",
      "Both options from Toro Movers use up-front hourly rates explained before move day. The total still depends on crew size, time on site, access, and readiness—not a fake website rate card. For deeper cost factors, read /blog/how-much-does-a-local-move-cost-orlando. For dedicated pages, see /full-service-moving and /labor-only-moving.",
      "Not sure which fits? Call or text (689) 600-2720 with addresses, home type, and whether you have a truck. We will recommend crew size and the clearer option. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
    ],
    faqs: [
      {
        q: "What is the difference between full-service and labor-only moving?",
        a: "Full-service includes the crew, truck, loading, transportation, unloading, and placement. Labor-only is for customers who already have a U-Haul, POD, trailer, or rental truck and only need movers for loading, unloading, or rearranging heavy items.",
      },
      {
        q: "Which option is usually cheaper?",
        a: "Labor-only is often less expensive because you supply the truck. Full-service costs more because it includes the vehicle and transport, but it removes the DIY truck work.",
      },
      {
        q: "Can Toro do either option in Orlando?",
        a: "Yes. Toro Movers offers full-service local moving and labor-only loading and unloading across Orlando and Central Florida with up-front hourly rates.",
      },
      {
        q: "How do I choose for an apartment move?",
        a: "If you need the truck and placement end to end, choose full-service. If you already booked a U-Haul or POD, labor-only may fit. Share stairs, elevator windows, and parking either way.",
      },
      {
        q: "How do I get a quote?",
        a: "Call or text (689) 600-2720, or request a quote online. Share pickup and drop-off, whether you have a truck, and access details. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
      },
    ],
  },

  {
    slug: "how-much-does-a-local-move-cost-orlando",
    eyebrow: "Orlando moving costs",
    title: "How much do movers cost in Orlando?",
    teaser:
      "What drives Orlando moving prices—crew size, access, truck vs labor-only—and how Toro explains up-front hourly rates before move day.",
    description:
      "What changes Orlando moving prices for local & labor-only jobs, and how we quote up-front hourly rates. Call (689) 600-2720.",
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
    title: "Careful furniture handling in Orlando",
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
    title: "Orlando movers | Building access",
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
