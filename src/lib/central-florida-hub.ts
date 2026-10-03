/**
 * Central Florida regional page. Homepage chrome, regional copy distinct
 * from the Orlando city page, and the existing quote-wizard source
 * city-central-florida-movers.
 * The only price is QUOTE_RATE_ANSWER.
 */

import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import {
  BUSINESS_NAME,
  EMAIL,
  PHONE_E164,
  SERVICE_REGION,
  SITE_URL,
} from "./site.ts";
import { businessPostalAddress } from "./business-profile.ts";

export const CENTRAL_FLORIDA_HUB_PATH = "/central-florida-movers";
export const CENTRAL_FLORIDA_HUB_SOURCE = "city-central-florida-movers";
export const CENTRAL_FLORIDA_HUB_H1 =
  "Central Florida Movers for Local Home & Apartment Moves";
export const CENTRAL_FLORIDA_HUB_TITLE =
  "Central Florida Movers | Local Moves Across the Region";
export const CENTRAL_FLORIDA_HUB_DESCRIPTION =
  "Central Florida movers for homes and apartments from Winter Park to Kissimmee, Clermont, and Sanford. Call 321-234-0510.";

export const centralFloridaHub = {
  path: CENTRAL_FLORIDA_HUB_PATH,
  eyebrow: "Central Florida movers · six counties",
  h1: CENTRAL_FLORIDA_HUB_H1,
  lede:
    "Toro Movers is a family-owned, bilingual crew based in Orlando. Local jobs across Orange, Seminole, Osceola, Lake, Polk, and Volusia use one hourly booking. A house in Winter Park, an apartment in Kissimmee, a new build in Horizon West, or a hop from Clermont to Sanford all fit when both stops stay in the region. We walk through the hourly model before the crew is booked.",
  chips: [
    "Homes and apartments",
    "Six counties, one booking",
    "I-4, Turnpike, 417, and 429",
    "English and Spanish",
  ],
  sections: [
    {
      h2: "A move between Central Florida cities",
      paragraphs: [
        "A Central Florida move is a local job whose stops sit in this region, even when they are not in the same city. Kissimmee to Winter Park, St. Cloud to Lake Nona, Clermont to Winter Garden, Oviedo to Lake Mary, Lakeland toward the Orlando side, or Deltona down to Sanford are regional drives. The crew does not change because the second city changes. The clock stays hourly. If one address leaves Central Florida, say so when you call so that trip can be quoted on its own.",
        "Choose the booking that matches the truck and the building, then open that service for the details. Full-service moving means the crew brings the truck and carries the home from one door to the other. Labor-only moving is the crew when the rental truck or container is already yours to drive. Apartment movers is the right read when stairs, an elevator, or a loading zone is the hard part. Jobs that stay inside Orlando start on the Orlando movers page. Open the city page for the other stop when you want that city's streets.",
      ],
    },
    {
      h2: "What changes from county to county",
      paragraphs: [
        "Orange County is the middle of the map, and the cities inside it are not one kind of street. Winter Park is older houses, brick streets, and oaks around Park Avenue, so a truck often stands at the curb and a driveway may be too short. Winter Garden and Ocoee mix a town center with newer subdivisions along SR-50. Windermere and Dr. Phillips add gates and lake roads, and the walk from a legal stop to the door can be longer than the bedroom count suggests. Horizon West and Lake Nona are newer housing, often with a community window and a gate. Apopka spreads northwest toward SR-429. Maitland sits closer in, with older houses and low office buildings.",
        "Seminole County runs north along I-4. Sanford's downtown sits on Lake Monroe, with houses, apartments, and a tighter curb. Lake Mary, including the Heathrow side, is more gates and office parks. Altamonte Springs, Casselberry, Fern Park, and Longwood are the older mix of apartments and houses along US 17-92. Oviedo and Winter Springs sit east, with newer subdivisions off SR-417 and SR-434 and some streets that were there before the beltway.",
        "Osceola County is the south side. Kissimmee splits between an older downtown and the US-192 corridor, where houses, vacation rentals, and hotels share the road with visitor traffic. Celebration is a planned town with community rules and narrow streets. St. Cloud is farther east, along roads that also reach Lake Nona. Poinciana is a large community of houses, many of them with a gate or a community rule, and the drive back toward Kissimmee is part of the day.",
        "Lake County is hillier than Osceola. Clermont and Minneola sit west of Orlando, with newer subdivisions and driveways that slope in a way a flat Orange County lot does not. Mount Dora, Tavares, and Leesburg are farther north, around the lakes. A hop from Clermont to Mount Dora stays in the region, and it spends more of the day on the road than a move inside one subdivision.",
        "Polk County is the southwest end. Lakeland and Winter Haven sit along I-4 toward Tampa. Davenport and the Four Corners houses near US-27 are often vacation homes, with a gate or a rule about where a truck may stand. A move from Davenport to Kissimmee is a shorter regional hop. A move from Lakeland to Sanford is one of the longer ones. Volusia County, for us, means Deltona: a wide spread of houses southwest of Daytona, reached from Sanford on I-4. Treat Deltona as its own drive, not as a neighborhood of Sanford.",
      ],
    },
    {
      h2: "Gates, HOAs, and new houses",
      paragraphs: [
        "Many communities in this region will not let a truck through until a window is reserved. Celebration, Horizon West, Lake Nona, Windermere, and parts of Lake Mary often need the gate code, the community rules, and a person who can open the gate if the code fails. Some want paperwork several business days ahead, not the morning of the move. Ask the manager what the community needs and the deadline. Send us the manager's name, email, and that deadline with the booking. A slot the community never booked is not a slot we can invent at the curb.",
        "A new house in Horizon West, St. Cloud, or Minneola can mean fresh paint, a short driveway, and a street other crews are still using. Tell us about tight turns, a second floor, and pieces that will not fit a stair without coming apart. An older house in Winter Park, Sanford, or Mount Dora is more often stairs, a low oak, or a curb with nowhere to put a truck off the lane. An apartment in Altamonte Springs, Kissimmee, or downtown Sanford needs the floor, the elevator or the stairs, and the place a truck is allowed to stand. Those waits and carries stay on the hourly clock.",
        "Put the floor, the elevator hours, the gate code, and the loading spot in the quote. A message after the crew is already driving is late. If the community only allows moves on certain days, or only before a set hour, that limit is the schedule we plan around.",
      ],
    },
    {
      h2: "I-4, the Turnpike, and the beltways",
      paragraphs: [
        "I-4 is the spine of the region. It ties Lakeland and the other Polk cities to Kissimmee and the Orlando exits, then continues through Seminole toward Deltona. Florida's Turnpike runs north-south on the Osceola and west Orange side, which is the better road for many Kissimmee and St. Cloud hops that should stay off I-4. SR-417 loops the east, past Lake Nona, the university side, Oviedo, and up toward Sanford. SR-429 is the west belt, through Horizon West, Winter Garden, and toward Apopka. SR-408 crosses the middle of Orange County. SR-50 is the surface road for Clermont, Winter Garden, and Ocoee. US-192 is the Kissimmee and Celebration road, and it fills when visitor traffic is heavy.",
        "Weekday mornings, weekday evenings, a Saturday near the attractions, and a holiday week on US-192 are slower than a midday hop inside one suburb. Drive time stays on the same clock. We will not promise how many minutes a freeway will take. Tell us both cities and the window you want. If the drive plus the carry will not fit a gate, an elevator, or a loading zone, we will say so before the day and name a start that can actually work.",
        "A move that stays inside one city spends less of the clock on the road. A move from the southwest, Lakeland or Davenport, to the north, Lake Mary or Deltona, spends more. Both are still a local regional job when they stay in Central Florida. The city list below is there so you can open either stop. Use the Orlando movers page when both stops are inside Orlando.",
      ],
    },
    {
      h2: "Heat, afternoon storms, and summer starts",
      paragraphs: [
        "Summers across Central Florida are hot and humid, and afternoon storms are common in the warmer months. A midday carry in July at a Kissimmee curb, a Clermont driveway, or a Deltona garage takes longer than an early start when the community allows that window. The heat slows the carry. It is still the same hourly booking, with no separate weather charge.",
        "Florida's storm season runs from June into November. A forecast of heavy rain or a storm on your date is a reason to call before the crew rolls, so we can say whether that window still works. We will not promise a clear sky, and we will not start a carry on a street or a dock the building has closed. If the only elevator window is that afternoon and the storm sits on it, the next open window the property will give us is the plan.",
        "Published hours are Sun-Fri, 7:00 AM to 7:00 PM, and Sat, 9:00 AM to 5:00 PM. An early start is often the easier summer day, because the carry can finish before the hottest hours and before the usual afternoon rain. If the community only opens later, say so when you book. We match the crew to the window you can actually use.",
      ],
    },
    {
      h2: "Which booking to ask for",
      paragraphs: [
        "Full-service moving is the ask when the crew should bring the truck and place the home at the new address, whether that address is in Oviedo or Lakeland. Labor-only moving is the ask when you already have the rental truck, the container, or the storage unit and you need the lift. Apartment movers is the page for stairs, an elevator, or a loading zone, in a garden building or a tighter downtown. Loading and unloading is a short lift that is not a planned household move.",
        "Packing services is the add-on when rooms are still open and you want them boxed before the carry. Office movers is a small suite, desks, and files, including office parks in Lake Mary or Maitland, not a network install. Same-day movers is a local hop when a crew is still open. It is not a guarantee, and a full board is a no for today. Small moves is one piece or a short furniture list. POD and U-Haul loading is the container, the rental, or the storage unit already on site. If you are unsure, start with the services list or call and name the two cities.",
      ],
    },
  ],
  faqs: [
    {
      q: "How much do Central Florida movers cost?",
      a: QUOTE_RATE_ANSWER,
    },
    {
      q: "Which Central Florida cities do you cover?",
      a: "Orange, Seminole, Osceola, Lake, Polk, and Volusia cities we serve each have a page, listed by county below. That includes Winter Park, Kissimmee, Clermont, Sanford, Winter Garden, Lake Mary, Oviedo, Lakeland, Deltona, and the others on the list. A job that stays inside Orlando uses the Orlando movers page.",
    },
    {
      q: "Does a drive between two cities change the day?",
      a: "Yes. Drive time stays on the same clock. I-4, Florida's Turnpike, SR-417, and SR-429 can add time between Kissimmee, Winter Park, Clermont, and Sanford, especially on a weekday peak or a busy Saturday near the attractions. We will not promise how many minutes the road will take. Tell us both cities so the window you want still fits the carry.",
    },
    {
      q: "How do HOA and gate rules change a move outside Orlando?",
      a: "The community's window is the schedule. Celebration, Horizon West, Lake Nona, Windermere, and parts of Lake Mary often need a code, a reserved elevator or a truck window, and a person who can meet the crew. We cannot open a slot the property never reserved. Share the rules, the code, and that contact when you book.",
    },
    {
      q: "What should I know about Central Florida heat and storms?",
      a: "Summer carries are slower in the middle of the day, and afternoon storms are common in the warmer months. Storm season runs from June into November. An early start is often the easier day when the community allows it. If a storm is forecast for your date, call before the crew rolls.",
    },
    {
      q: "Do you move apartments in Kissimmee, Altamonte Springs, or Sanford?",
      a: "Yes. Those buildings need the floor, the elevator or the stairs, and where a truck can stand. If the property reserves the elevator or wants paperwork ahead of time, send the manager's deadline with the booking. A walk-up is the same crew, with the stairs on the hourly clock.",
    },
    {
      q: "Can you load a rental truck in Clermont or St. Cloud?",
      a: "Yes, when you already have the rental truck, the container, or the storage unit. That booking is labor-only. If you want the truck and the crew together, that is full-service moving. Say which one so we do not plan a second truck.",
    },
    {
      q: "How do I get a Central Florida moving quote?",
      a: "Call or text 321-234-0510, or request a quote online. Share both cities, the neighborhood or building, stairs or elevator hours, a gate code if there is one, and whether you need a truck or labor-only help. Hours: Sun-Fri, 7:00 AM to 7:00 PM; Sat, 9:00 AM to 5:00 PM.",
    },
  ],
  closing: {
    h2: "Ready for a Central Florida move?",
    body: "Tell us both cities, how the building or the gate lets a truck in, and whether you need a truck or labor-only help. We will match the crew and explain the hourly model.",
  },
};

export function centralFloridaHubWordCount(copy = centralFloridaHub): number {
  const parts = [
    copy.lede,
    ...copy.sections.flatMap((section) => section.paragraphs),
    ...copy.faqs.map((item) => item.a),
    copy.closing.body,
  ];
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}

export function centralFloridaHubGraph() {
  const pageUrl = `${SITE_URL}${CENTRAL_FLORIDA_HUB_PATH}`;
  const counties = [
    "Orange County",
    "Seminole County",
    "Osceola County",
    "Lake County",
    "Polk County",
    "Volusia County",
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MovingCompany", "LocalBusiness"],
        "@id": `${pageUrl}#business`,
        name: `${BUSINESS_NAME}, Central Florida movers`,
        url: pageUrl,
        telephone: PHONE_E164,
        email: EMAIL,
        description: CENTRAL_FLORIDA_HUB_DESCRIPTION,
        areaServed: [
          { "@type": "AdministrativeArea", name: SERVICE_REGION },
          ...counties.map((name) => ({ "@type": "AdministrativeArea", name })),
        ],
        address: businessPostalAddress(),
        parentOrganization: {
          "@type": "MovingCompany",
          name: BUSINESS_NAME,
          "@id": `${SITE_URL}/#movingcompany`,
        },
        knowsLanguage: ["en", "es"],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: CENTRAL_FLORIDA_HUB_TITLE,
        description: CENTRAL_FLORIDA_HUB_DESCRIPTION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${pageUrl}#business` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Central Florida Movers",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: centralFloridaHub.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
