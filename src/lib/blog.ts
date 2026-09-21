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
  /**
   * Full AEO article body. A paragraph that starts with "## " renders as an H2
   * (the marker is not shown). Internal paths such as /quotes render as links.
   */
  body: readonly string[];
  /** Optional FAQ block — visible text must match FAQPage schema when present */
  faqs?: readonly { q: string; a: string }[];
};

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "choose-family-owned-bilingual-movers-orlando",
    eyebrow: "Family-owned · Bilingual",
    title: "How to choose a family-owned bilingual mover in Orlando",
    teaser:
      "Family-owned bilingual movers in Orlando: what to ask, how language works on move day, and how Toro quotes up front.",
    description:
      "Choose a local family-owned bilingual mover in Orlando by checking clear hourly rates, move-day English or Spanish, and who answers before the quote.",
    date: "2026-09-21",
    dateLabel: "Sep 21, 2026",
    image: {
      src: "/images/moves/real-23.webp",
      alt: "Toro Movers crew in navy shirts carrying a wrapped piece on a Central Florida job",
      position: "object-center",
    },
    body: [
      "Look for clear hourly rates, bilingual crews who communicate on move day, and a local team that answers questions before the quote. Toro Movers is a family-run Orlando crew that works in English and Spanish across Central Florida — up-front pricing, no surprise add-ons in the pitch.",
      "## What to ask before you book",
      "Before you book, ask whether the price is hourly or a trip quote, what crew size is planned, and what is included. On a local Central Florida job, Toro quotes from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Stairs, elevator waits, and a long carry add time on the hourly clock; they are not a separate fee. Ask who answers questions before the quote, and how parking, stairs, or a reserved elevator will be handled. Share both addresses, the date, the floors, and how packed you will be when the crew arrives. If the drop-off leaves Central Florida, the job is a trip quote rather than the local hourly clock — see /blog/orlando-local-vs-long-distance-movers.",
      "## Language on move day",
      "A bilingual crew can talk through the plan in English or Spanish on site, not only on the booking call. Confirm that when you book. Say which language you want for placement, timing, and building rules, especially if one person schedules the job and someone else meets the truck. Put gate codes, elevator windows, and room labels in that language, and point out fragile pieces in person. Toro Movers works in English and Spanish on the phone and on the job across Orlando and Central Florida. The language you choose does not add a fee.",
      "## Family-owned vs a big brand",
      "A family-owned mover is a local team you can question before the quote. You talk with the people running the job, and the rate is explained before move day. The tradeoff is capacity. A national brand may have more trucks on a peak Saturday. A local crew may ask for another date if that day is already full. Ask who you will speak with after you book, and what changes the total. Toro does not add fuel or stair fees in the pitch. There is no one-size rate card. Crew size, time on site, access, and whether you need a truck or labor-only help still change the total.",
      "## Apartments, townhomes, offices, and containers",
      "Use the same questions for the building you are leaving. An apartment or high-rise adds an elevator window, a dock or loading zone, and the carry from the truck. Details are in /blog/orlando-apartment-high-rise-movers and on /apartment-movers-orlando-fl. A townhome or condo often adds stairs and an HOA window. Details are in /blog/central-florida-townhome-condo-movers. An office move adds after-hours timing and a person on site who can say where each piece goes. Details are in /blog/orlando-office-small-commercial-movers. If you already have a U-Haul or POD, book labor-only loading instead of a second truck. That job is covered in /blog/orlando-pod-uhaul-storage-loading.",
      "## How to request the quote",
      "Request the quote at /quotes. Share pickup and drop-off, whether it is an apartment, townhome, house, or office, stairs or elevator, parking, and whether you already have a truck or container. Hours are Mon–Sat, 7:00 AM – 7:00 PM. Sunday crew time is on request. Toro Movers is a family-owned local crew serving Orlando, Winter Park, Kissimmee, Clermont, Sanford, and nearby Central Florida.",
    ],
    faqs: [
      {
        q: "What should I ask before I book movers in Orlando?",
        a: "Ask whether the price is hourly or a trip quote, what crew size is planned, and what is included. Ask who answers questions before the quote, and which language the crew will use on site. Share stairs, elevators, parking, and how packed you will be. Local Toro jobs are hourly from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Request the quote at /quotes.",
      },
      {
        q: "How do I know the crew can speak English and Spanish on move day?",
        a: "Ask when you book, before the truck arrives. Confirm that the people doing the carry can talk through placement, timing, and building rules in the language you need — not only the person who answered the phone. Toro Movers works in English and Spanish on the phone and on the job. Name the language you want on site when you request a quote at /quotes.",
      },
      {
        q: "What is different about a family-owned mover and a big brand?",
        a: "A family-owned crew is a local team you can question before the quote, with the rate explained up front. A larger brand may have more trucks on a busy Saturday, and a local crew may need a different date if that day is full. Ask who you will talk to after you book, and what changes the total. Toro quotes local work with up-front hourly rates and does not add fuel or stair fees in the pitch.",
      },
      {
        q: "Does a bilingual crew cost more for an apartment or townhome?",
        a: "The language does not add a fee. Stairs, a reserved elevator, or a long carry from parking can add time on the hourly clock. Apartment access is covered in /blog/orlando-apartment-high-rise-movers. Townhome and condo rules are covered in /blog/central-florida-townhome-condo-movers. Local jobs are quoted from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees.",
      },
      {
        q: "How do I request a moving quote?",
        a: "Request a quote at /quotes. Share both addresses, the date, whether the job is an apartment, townhome, house, or office, stairs or elevator, parking, and whether you need a truck or help with a U-Haul or POD. Hours are Mon–Sat, 7:00 AM – 7:00 PM.",
      },
    ],
  },

  {
    slug: "orlando-office-small-commercial-movers",
    eyebrow: "Office · Commercial",
    title: "Office & small commercial movers in Orlando",
    teaser:
      "Office and commercial moves in Orlando: after-hours crews, desks and IT, freight elevators, and how Toro quotes them.",
    description:
      "Who to hire for a small office or commercial move in Orlando: after-hours crews, desk and IT care, and hourly rates. Call (689) 600-2720.",
    date: "2026-09-21",
    dateLabel: "Sep 21, 2026",
    image: {
      src: "/images/moves/svc-loading.webp",
      alt: "Toro Movers crew wrapping furniture before a Central Florida load",
      position: "object-[center_40%]",
    },
    body: [
      "Small office and commercial moves need crews who work around business hours, protect desks and IT gear, and keep downtime short. Toro Movers handles office and light commercial moves across Orlando and Central Florida with clear hourly rates and bilingual crews.",
      "After-hours and weekend moves. A small office loses the day if the crew works while people are still at their desks. Schedule the load after close, early in the morning, or on Saturday so the suite is empty and downtime stays short. Published hours are Mon–Sat, 7:00 AM – 7:00 PM. Sunday crew time is on request. If the building only allows a window outside those hours, say so when you book and confirm the start time before the quote is final. A short evening or weekend slot often needs a larger crew so the job finishes before the office reopens. Reserve the freight elevator and the dock for that same window.",
      "Desks, filing, and IT equipment. Label desks, chairs, and file cabinets by room and by who uses them so the new office is placed, not sorted again. Empty drawers on heavy filing cabinets before the carry. Power down computers and monitors, label cables, and pack small electronics in closed boxes if you want the crew on the furniture. Say which pieces are fragile or must stay upright. Pads and wrap protect desks and cabinets through doorways, elevators, and the truck. The crew moves the equipment. They do not set up networks or migrate data. Packing still left undone adds time on the hourly clock.",
      "Building access, freight elevators, and a certificate of insurance. Office parks and commercial buildings often require a freight elevator, a loading dock, a service entrance, and a certificate of insurance (COI) before the truck can enter. Ask the property manager or landlord for the written rules when the date is set: allowed hours, whether after-hours or weekends are required, dock or elevator reservations, and any COI wording or deadline. Send Toro the manager’s name, email, required wording, and the deadline with the booking so the paperwork the property asks for can go out in time. Many offices want that several business days ahead, not the morning of the move. A dock shared with deliveries, or a freight elevator on a short reservation, adds time. Share the floor, the carry from the dock to the suite, and any loading-zone limit. Apartment docks and elevator timing are in /blog/orlando-apartment-high-rise-movers. Townhome stairs and HOA windows are in /blog/central-florida-townhome-condo-movers.",
      "How Toro quotes office jobs. Local office and light commercial moves are hourly. Toro quotes local jobs from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. After-hours windows, freight-elevator waits, and a long carry from the dock add time on the hourly clock; they are not a separate fee. Crew size, how packed the suite is, and whether you need a truck or labor-only help on a rental still change the total. If the new office leaves Central Florida, that job is a trip quote — see /blog/orlando-local-vs-long-distance-movers. What else changes a local total is in /blog/how-much-does-a-local-move-cost-orlando. There is no one-size rate card.",
      "What to prep before the crew arrives. Clear paths from each office to the freight elevator or the door. Disconnect computers and label cables if the IT gear is moving with the desks. Close and tape boxes, and mark the destination room, not only the contents. Share gate codes, the suite number, dock rules, and a contact who can open the building if the crew arrives before staff. Photos of bulky pieces — large desks, copiers, conference tables — help size the crew. If you already have a truck or container, say so. That booking is labor-only. If you want the truck and the crew together, that is full-service. See /full-service-moving and /labor-only-moving.",
      "Request an office or small commercial quote at /quotes, or call or text (689) 600-2720. Share both addresses, floors, freight elevator or dock rules, after-hours or weekend limits, and your date. Hours: Mon–Sat, 7:00 AM – 7:00 PM. Toro Movers is a family-owned local crew serving Orlando, Winter Park, Kissimmee, Clermont, Sanford, and nearby Central Florida. English and Spanish on the phone and on the job.",
    ],
    faqs: [
      {
        q: "Do you move small offices on weekends?",
        a: "Yes. Saturday is inside published hours, Mon–Sat, 7:00 AM – 7:00 PM. Sunday crew time is on request, so confirm the date when you book. A weekend window is often how a small office avoids weekday downtime. Reserve the freight elevator, dock, or loading zone for that same window, and share any landlord hour limits. A short slot often needs a larger crew so the job finishes before the office reopens. Request the window at /quotes or call or text (689) 600-2720.",
      },
      {
        q: "What if the commercial landlord requires a certificate of insurance (COI)?",
        a: "Ask the landlord or property manager what the building needs and the deadline. Many Orlando commercial properties want the certificate several business days before move day, not the morning of. Send Toro the manager’s name, email, any required wording, and the deadline when you book so the paperwork the property asks for can go out in time. Call or text (689) 600-2720 if the window is already tight.",
      },
      {
        q: "Should an office book packing help or labor-only movers?",
        a: "Labor-only fits when you already have a rental truck, POD, or container and the desks and boxes are ready to load. Packing help fits when the crew should box files, desks, and small office goods before the carry — that time is on the hourly clock. Full-service is the crew and truck door to door when you do not want to rent a vehicle. Tell Toro which one you need, and how packed the suite will be, when you book at /quotes.",
      },
      {
        q: "How do I get an office or small commercial moving quote?",
        a: "Request a quote at /quotes, or call or text (689) 600-2720. Share suite size, floors, freight elevator or dock rules, after-hours or weekend limits, and whether you need a truck or labor-only help. Local jobs are hourly from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
      },
    ],
  },

  {
    slug: "central-florida-townhome-condo-movers",
    eyebrow: "Townhomes · Condos",
    title: "Best movers for townhomes & condos in Central Florida",
    teaser:
      "Townhome and condo moves in Central Florida: stairs, elevators, HOA rules, tight parking, and how Toro quotes them.",
    description:
      "Who to hire for a townhome or condo in Central Florida: stairs, elevators, HOA rules, and up-front hourly rates. Call (689) 600-2720.",
    date: "2026-09-21",
    dateLabel: "Sep 21, 2026",
    image: {
      src: "/images/moves/svc-primary-townhome.webp",
      alt: "Toro Movers crew carrying a wrapped sofa down exterior stairs at a Central Florida townhome",
      position: "object-[center_40%]",
    },
    body: [
      "Townhome and condo moves need crews who handle stairs, elevators, HOA rules, and tight parking — not just big trucks. Toro Movers moves townhomes and condos across Orlando and Central Florida with clear hourly rates and crews used to community rules.",
      "Stairs, elevators, and building access. A townhome often means a stair carry between floors, a garage or exterior stair, and a turn at a landing. A condo may add a freight or passenger elevator, a service entrance, and a reserved window. Share the floor count, whether an elevator must be reserved, and how far the truck sits from the door. A walk-up and a reserved elevator are different clocks. High-rise docks, elevator pads, and apartment COI timing are in /blog/orlando-apartment-high-rise-movers.",
      "HOA and condo association rules. Many Central Florida communities set a move window, a loading dock or guest loading zone, and a certificate of insurance (COI) before the truck can enter. Ask the association for the written rules when the date is set: allowed hours, whether weekends are the only option, dock or elevator reservations, and any COI wording or deadline. Send Toro the manager’s name, email, required wording, and the deadline with the booking so the paperwork the community asks for can go out in time. Many offices want that several business days ahead, not the morning of the move.",
      "Parking and truck size in planned communities. Guest spots, short loading zones, shared docks, and streets that do not allow a large truck are common. A long carry from the only legal parking spot adds time on the hourly clock. Share street width, gate codes, and any limit on truck size so the crew plans the walk and the truck. Tight townhome courts show up across Orlando, Kissimmee, Winter Garden, Celebration, and nearby cities.",
      "Packing tips for multi-level homes. Pack room by room and label the floor and the room, not only the contents. Close and tape boxes before the crew arrives; packing still left undone adds time. Clear stairs and landings so each trip is a carry. Empty drawers on heavy dressers. On a split-level or three-story townhome, stage boxes near the stairs you want used, and point out fragile pieces and tight turns at landings. If the association wants floors protected, say so when you book.",
      "How Toro quotes townhome and condo jobs. Local moves are hourly. Toro quotes local jobs from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Stairs, elevator waits, and a long carry from tight parking add time on the hourly clock; they are not a separate fee. Crew size, how packed you are, and whether you need a truck or labor-only help on a U-Haul or POD still change the total. If the drop-off leaves Central Florida, that job is a trip quote — see /blog/orlando-local-vs-long-distance-movers. What else changes a local total is in /blog/how-much-does-a-local-move-cost-orlando. There is no one-size rate card.",
      "Request a townhome or condo quote at /quotes, or call or text (689) 600-2720. Share both addresses, floors, stairs or elevator, HOA or condo rules, parking, and your date. Hours: Mon–Sat, 7:00 AM – 7:00 PM. Toro Movers is a family-owned local crew serving Orlando, Winter Park, Kissimmee, Clermont, Sanford, and nearby Central Florida. English and Spanish on the phone and on the job.",
    ],
    faqs: [
      {
        q: "How do I reserve an elevator for a condo move?",
        a: "Ask the condo association or management office for the freight or service elevator as soon as the date is set, and book the crew inside that same window. Share the floor, whether the cab needs pads, the service entrance, and how long the reservation lasts. A short window often needs a larger crew so the job finishes before the elevator goes back to the building. If the townhome has stairs only, say so — there may be no elevator to reserve. Call or text (689) 600-2720 with the written rules.",
      },
      {
        q: "What if the community only allows a weekend move window?",
        a: "Book inside the hours the HOA or condo actually allows, including Saturday limits. Reserve the elevator, dock, or loading zone for that same window. A short weekend slot often needs a larger crew so the carry finishes before the window closes. Sunday crew time is on request, so confirm both the community rules and the date when you book. Share the written window with your quote at /quotes.",
      },
      {
        q: "What if the HOA requires a certificate of insurance (COI)?",
        a: "Ask the association what it needs and the deadline. Many Central Florida communities want the certificate several business days before move day, not the morning of. Send Toro the manager’s name, email, any required wording, and the deadline when you book so the paperwork the community asks for can go out in time. Call or text (689) 600-2720 if the window is already tight.",
      },
      {
        q: "How do I get a townhome or condo moving quote?",
        a: "Request a quote at /quotes, or call or text (689) 600-2720. Share floors, stairs or elevator, HOA or condo rules, parking, and whether you need a truck or labor-only help. Local jobs are hourly from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
      },
    ],
  },

  {
    slug: "orlando-local-vs-long-distance-movers",
    eyebrow: "Local · Long-distance",
    title: "Local vs long-distance movers in Orlando: which do you need?",
    teaser:
      "When an Orlando move stays local in Central Florida, and when it becomes long-distance—plus how Toro quotes each.",
    description:
      "When do Orlando movers count as local vs long-distance? Hourly vs trip quotes, timing, and what to ask. Call (689) 600-2720.",
    date: "2026-09-21",
    dateLabel: "Sep 21, 2026",
    image: {
      src: "/images/moves/svc-full-service.webp",
      alt: "Toro Movers crew loading wrapped furniture into a truck on a Central Florida move",
      position: "object-[center_42%]",
    },
    body: [
      "Local moves stay inside Central Florida (same metro / short drive). Long-distance means crossing farther — another Florida region or out of state. Pricing, timing, and truck needs change. Toro Movers handles both local and long-distance from Orlando with clear hourly or trip quotes.",
      "What local usually means around Orlando. A local job stays inside Central Florida: the same metro or a short drive between Orlando and nearby cities such as Winter Park, Kissimmee, Clermont, Sanford, or Winter Garden. The crew can often plan it as one day. Stairs, elevators, docks, and parking still change the clock on a short hop. Apartment and high-rise access is covered in /blog/orlando-apartment-high-rise-movers. A planning pass before the first box is in /blog/plan-orlando-move-before-first-box.",
      "When a job becomes long-distance. The drop-off leaves that short Central Florida drive. That is another Florida region, or a move out of state. The truck is committed to a longer route, timing is not the same as a same-day metro hop, and the quote is built from where you start, where you finish, and what is going. If you already have a U-Haul or POD and only need loading help, that is labor-only — see /blog/orlando-pod-uhaul-storage-loading.",
      "How pricing differs. Local moves are hourly. Toro quotes local jobs from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Stairs and long carries add time on the hourly clock; they are not a separate fee. What else changes a local total is in /blog/how-much-does-a-local-move-cost-orlando. Long-distance and interstate moves are a trip quote from origin, destination, and inventory — not the same hourly clock as a Central Florida hop. Both models are explained before you book. There is no one-size rate card for either type.",
      "What to ask before you book. Confirm both addresses and whether the job stays in Central Florida. Ask if the price is hourly or a trip quote, what crew size is planned, and whether load, transport, unload, and placement are included. Share stairs, elevators, parking, and how packed you will be when the crew arrives. For a longer job, add the destination city, a target date, and photos or a list of bulky pieces so the trip quote matches the load.",
      "How Toro quotes each type. A local Central Florida move gets an up-front hourly quote: crew size, the hourly rate, and the 2-hour minimum, explained before move day. A long-distance or out-of-state move gets a trip quote from the pickup, the destination, and the inventory. Request either at /quotes, or call or text (689) 600-2720. Hours: Mon–Sat, 7:00 AM – 7:00 PM. Toro Movers is a family-owned crew in Orlando. English and Spanish on the phone and on the job.",
    ],
    faqs: [
      {
        q: "Can I book a same-day local move in Orlando?",
        a: "Often, when both stops stay inside Central Florida and a crew is open. Same-day local jobs are quoted by the hour from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Share addresses, stairs or elevators, and how packed you are. Request a quote at /quotes or call or text (689) 600-2720. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
      },
      {
        q: "Do long-distance moves take more than one day?",
        a: "They can. A long-distance job leaves the short Central Florida drive — another Florida region or out of state — so timing follows the route, the inventory, and the date, not a same-day local clock. Toro quotes that work as a trip from origin, destination, and inventory, and explains the timing before you book. Call or text (689) 600-2720 with both addresses.",
      },
      {
        q: "How should I pack for a local move vs a long-distance move?",
        a: "For a local move, closed and labeled boxes and a clear path keep the hourly clock shorter. The crew can pad furniture on site; packing still left undone adds time. For a long-distance trip, pack tighter: closed boxes, nothing loose in drawers, and photos of bulky or fragile pieces so the trip quote and the load match. Tell Toro which type you are booking.",
      },
      {
        q: "How do I get a local or long-distance quote?",
        a: "Request a quote at /quotes, or call or text (689) 600-2720. Say whether both stops are in Central Florida or the job is long-distance, and share dates, access, and inventory. Local jobs are hourly. Long-distance jobs are a trip quote. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
      },
    ],
  },

  {
    slug: "orlando-apartment-high-rise-movers",
    eyebrow: "Apartment & high-rise",
    title: "Best movers in Orlando for apartments & high-rises",
    teaser:
      "Local crews for Orlando apartments and high-rises: elevators, COIs, docks, stair carries, and up-front hourly rates.",
    description:
      "Who to hire for an Orlando apartment or high-rise: elevators, COIs, docks, stair carries, and up-front hourly rates. Call (689) 600-2720.",
    date: "2026-09-21",
    dateLabel: "Sep 21, 2026",
    image: {
      src: "/images/moves/svc-primary-townhome.webp",
      alt: "Toro Movers crew carrying a sofa down exterior stairs on a Central Florida townhome move",
      position: "object-[center_40%]",
    },
    body: [
      "Local crews who handle elevators, COIs, reserved loading docks, and stair carries — with up-front hourly rates so building delays don’t surprise you. Toro Movers does apartment and high-rise moves across Orlando and Central Florida.",
      "Elevator & COI checklist. Reserve the freight or service elevator before move day and ask whether the building wants pads on the cab walls. Share the reservation window, the floor, and whether you must use a service entrance. If the property requires a certificate of insurance (COI), send the manager’s name, email, any required wording, and the deadline with your booking. Many Orlando leasing offices and HOAs want that paperwork several business days ahead, not the morning of the move. Toro discusses the documents the building asks for so they can go out in time. For the apartment service page, see /apartment-movers-orlando-fl.",
      "Loading dock / parking rules. High-rises often use a reserved dock or a timed loading zone instead of curbside parking. Tell us whether the truck must use the dock, a service alley, or a guest spot, and how far the carry is from that spot to the elevator. A dock shared with deliveries, or a zone that expires mid-move, adds time on the clock. Street-only buildings need a plan for where the truck sits and how long it can stay.",
      "Full-service vs labor-only in apartments. Full-service is the crew, truck, load, transport, unload, and placement—one local team door to door. Labor-only is when you already have a U-Haul, POD, or rental truck and only need loading or unloading help by the hour. Stairs, elevator windows, and dock rules apply either way. If you are unsure which fits, compare /blog/full-service-vs-labor-only-orlando, then see /full-service-moving and /labor-only-moving.",
      "How Toro quotes apartment jobs. Apartment and high-rise moves are quoted with up-front hourly rates explained before move day. The total depends on crew size, time on site, floors, elevator or stair access, dock or parking distance, how packed you are when the crew arrives, and whether the truck is included. We do not publish a one-size rate card. Share unit size, floors, and the building rules when you request a quote. More on what changes a local total: /blog/how-much-does-a-local-move-cost-orlando.",
      "When you need a bigger crew. Two movers fit many studio and one-bedroom loads when the elevator is reserved and the carry from the truck is short. Add people for a walk-up, a long dock-to-unit carry, a short elevator window, or a two-bedroom or larger home with heavy furniture. A larger crew is often how you finish inside a tight HOA window instead of running past it on the hourly clock.",
      "Request an apartment or high-rise quote at /quotes, or call or text (689) 600-2720. Share pickup and drop-off, floors, elevator or stairs, dock or parking rules, and your date. Hours: Mon–Sat, 7:00 AM – 7:00 PM. Toro Movers is a family-owned local crew serving Orlando, Winter Park, Kissimmee, Clermont, Sanford, and nearby Central Florida. English and Spanish on the phone and on the job.",
    ],
    faqs: [
      {
        q: "How early should I request a COI for an Orlando apartment move?",
        a: "Ask the leasing office or HOA as soon as the date is set. Many Orlando buildings want the certificate several business days before move day, not the morning of. Send Toro the manager’s contact, any required wording, and the deadline when you book so the paperwork can go out in time. Call or text (689) 600-2720 if the window is already tight.",
      },
      {
        q: "What if the HOA only allows a weekend move window?",
        a: "Book inside the hours the building actually allows, including Saturday limits. Reserve the elevator and the dock or loading zone for that same window. A short weekend slot often needs a larger crew so the job finishes before the window closes. Sunday crew time is on request, so confirm both the building rules and the date when you book. Share the written rules with your quote.",
      },
      {
        q: "Is a walk-up harder than an elevator building?",
        a: "A walk-up means a stair carry on every trip, so time on site usually goes up with each floor. An elevator is faster per trip only when the car is reserved, padded if the building requires it, and available for your whole window. Tell us which one you have, the floor, and any long carry from the truck to the door.",
      },
      {
        q: "How do I book an Orlando apartment or high-rise move?",
        a: "Request a quote at /quotes, or call or text (689) 600-2720. Share floors, elevator or stairs, dock or parking rules, and whether you need a truck or labor-only help. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
      },
    ],
  },

  {
    slug: "orlando-pod-uhaul-storage-loading",
    eyebrow: "Storage · POD · U-Haul",
    title: "Storage, POD & U-Haul load and unload in Orlando",
    teaser:
      "Labor-only movers for POD, U-Haul, and storage units in Orlando—what to have ready, and how Toro quotes short jobs.",
    description:
      "Labor-only movers for POD, U-Haul, and storage in Orlando. Load or unload by the hour, 2-hour minimum. Call (689) 600-2720.",
    date: "2026-09-21",
    dateLabel: "Sep 21, 2026",
    image: {
      src: "/images/moves/svc-labor.webp",
      alt: "Toro Movers crew padding furniture on a labor-only load in Central Florida",
      position: "object-[center_28%]",
    },
    body: [
      "Labor-only crews load or unload your rental truck, POD, or storage unit — you keep the truck; they bring the muscle and packing care. Toro Movers does U-Haul, POD, and storage load/unload across Orlando and Central Florida with up-front hourly rates.",
      "Hire a labor-only crew when the vehicle or container is already handled and you need people for the heavy work. That fits a U-Haul at the curb, a POD in the driveway, a storage unit at a facility, or a mix of those on the same day. A closer walkthrough of rental-truck and container loading is at /blog/uhaul-pod-loading-help-orlando. This page is the broader who-to-hire answer, including storage.",
      "U-Haul load and unload. You keep the rental — U-Haul, Penske, Budget, or another box truck — and the crew loads it, unloads it, or both. Share the truck length, where the ramp will sit, and the carry from the door to the bumper. A short local unload is a different clock than a full truck on a walk-up. You drive between stops. Toro does not bring a moving truck on a labor-only booking. If you want the truck and the crew together, see /full-service-moving.",
      "POD and container jobs. The pack has to stay stable after the crew leaves, so placement matters as much as the furniture list. Tell us where the container will sit, how the doors open, and the path from the home to that door — stairs, elevator, or a long sidewalk. HOA rules and apartment time windows belong in the booking. If the container company moves the unit, book the crew for the day it is on site.",
      "Storage unit moves. Gate codes, unit size, aisle width, and the hours the facility actually stays open decide whether the job stays short. A same-day transfer from a unit into a rental truck, a reload into a new unit, or an unload from a truck into a unit all fit labor-only when you already have the vehicle or the unit. Share the facility name and any time limit so the crew is not waiting on a closed gate.",
      "What to have ready. Have the truck, POD, or storage access on site when the crew arrives — keys, gate code, and unit number. Clear a path from the rooms to the door. Pack small goods in boxes if you want the crew on furniture and heavy pieces; packing that is still undone adds time. Photos of bulky items, the floor count, and parking or dock notes help size the crew. If the building asks for a certificate of insurance, send the manager’s contact and deadline with the booking. Apartment dock and elevator details are in /blog/orlando-apartment-high-rise-movers.",
      "How Toro quotes short labor jobs. Local labor is quoted from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Stairs, long carries, and a late gate still add time on the hourly clock; they are not a separate fee. Crew size and whether you book one stop or two change the total. The model is explained before move day. Request the quote at /quotes and describe the job as labor-only, a POD, or a U-Haul.",
      "Call or text (689) 600-2720, or request a labor-only, POD, or U-Haul quote at /quotes. Share truck or unit size, one end or both, and access notes. Hours: Mon–Sat, 7:00 AM – 7:00 PM. Toro Movers is a family-owned local crew serving Orlando, Winter Park, Kissimmee, Clermont, Sanford, and nearby Central Florida. English and Spanish on the phone and on the job. Service pages: /labor-only-moving and /loading-unloading.",
    ],
    faqs: [
      {
        q: "What is the minimum for a short labor job?",
        a: "Short labor jobs have a 2-hour minimum. Local help is quoted from $75 per mover per hour, with no fuel surcharge and no stair fees. Toro explains that hourly model before the crew starts. Call or text (689) 600-2720 or request a quote at /quotes.",
      },
      {
        q: "Can I book one end or both ends?",
        a: "Yes. One-end labor is load-only or unload-only at a single stop — a U-Haul at the house, a POD in the driveway, or a storage unit. Both-end labor is a crew at the pickup and a crew at the drop-off. You still drive the rental, or the container company moves the POD. Tell us which stops need movers when you book.",
      },
      {
        q: "What if weather or access delays the job?",
        a: "Rain, a late elevator, a locked storage gate, or a truck that is not on site yet can add time. The hourly clock follows the crew’s time on the job, so share facility hours, elevator windows, and a backup parking plan when you book. If the delay is already known, call or text (689) 600-2720 before the start time.",
      },
      {
        q: "How do I book storage, POD, or U-Haul labor in Orlando?",
        a: "Request a labor-only, POD, or U-Haul quote at /quotes, or call or text (689) 600-2720. Share truck or unit size, one end or both, and access notes. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
      },
    ],
  },

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
