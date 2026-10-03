/**
 * Orlando city hub. Homepage chrome, unique local copy, and the existing
 * quote-wizard source city-orlando-movers.
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
import { businessPostalAddress, cityPlace } from "./business-profile.ts";

export const ORLANDO_HUB_PATH = "/orlando-movers";
export const ORLANDO_HUB_SOURCE = "city-orlando-movers";
export const ORLANDO_HUB_H1 = "Orlando movers for homes, apartments, and local hops";
export const ORLANDO_HUB_TITLE = "Orlando Movers | Local Moving Company FL";
export const ORLANDO_HUB_DESCRIPTION =
  "Orlando movers for homes, apartments, and local hops. Neighborhoods, elevators, and I-4 timing, explained before the day. Call 321-234-0510.";

export const orlandoHub = {
  path: ORLANDO_HUB_PATH,
  eyebrow: "Orlando movers · Orange County",
  h1: ORLANDO_HUB_H1,
  lede:
    "Toro Movers is a family-owned, bilingual crew based in Orlando. This page is the city hub: what a local job looks like inside Orlando, which service to book, and how the neighborhood, the building, and the drive change the day. We explain the hourly model before anyone rolls.",
  chips: ["Homes and apartments", "Elevators and HOA windows", "I-4 is part of the drive", "English and Spanish"],
  sections: [
    {
      h2: "Who this Orlando page is for",
      paragraphs: [
        "Orlando movers, on this page, means a local job that starts or ends in the city. A house in College Park, an apartment near Lake Eola, a townhome in Baldwin Park, a small suite downtown, or a hop to another Central Florida city all fit. Both stops stay in the region. The crew is the same family crew, and the booking is hourly. If one address leaves Central Florida, say so when you call. That route is a trip quote, not this local city clock.",
        "Use this page to pick the right booking, then open that service page for the details. Full-service moving is the crew and the truck, door to door. Labor-only moving is the crew when you already have a rental truck or a container. Apartment movers is the page when the hard part is the building. The services page lists every local option if you are still deciding.",
      ],
    },
    {
      h2: "Neighborhoods and the buildings in them",
      paragraphs: [
        "Downtown Orlando and Thornton Park are a different clock from a house in College Park or Audubon Park. Downtown and Thornton Park often mean a tower or an older building, an elevator, and street parking that is only legal for a short window. Lake Eola and the streets around it do not have a wide driveway for a truck. The carry starts at the curb or a loading zone, and someone who can open the building should be there when the crew arrives.",
        "College Park and Audubon Park are mostly houses on narrower streets. Driveways are short, oaks overhang the curb, and a truck may have to stand on the street. A second-floor bedroom with a tight turn is a stair carry, not an elevator wait. Tell us which rooms are upstairs and which pieces will not turn without coming apart.",
        "Baldwin Park mixes townhomes and apartments around a planned neighborhood. A gate, a loading zone, or a reserved elevator is common, and the property often wants that window booked before move day. MetroWest and the garden-apartment corridors toward Conway are similar in a different shape: a gate code, a building name, and a floor matter more than a bedroom count. Lake Nona is newer housing on the southeast side, so a hop from there to College Park or downtown is a longer local drive than a move inside one neighborhood. Dr. Phillips sits south, closer to the Sand Lake and International Drive roads, where a midday hop shares the street with traffic that is not your move.",
        "Mills 50, Colonialtown, and the Milk District are closer to downtown, with a mix of small houses, duplexes, and low apartment buildings. Parking is often the curb, and a truck that blocks a lane will get moved along. Parramore and the west side of downtown can mean a high-rise dock or a house with a short walk from the street. Name the building, the floor, and where a truck is allowed to stand. A bedroom count does not tell us that.",
      ],
    },
    {
      h2: "Elevators, HOAs, and building windows",
      paragraphs: [
        "Many Orlando apartments and condos will not let a truck in until the elevator or the loading area is reserved. Some want paperwork from the property several business days ahead, not the morning of the move. Ask the manager what the building needs and the deadline. Send us the manager's name, email, and that deadline with the booking so the request can go out in time. We cannot open a window the property never reserved.",
        "A passenger elevator shared with people who are not moving adds waiting. A freight elevator on a short reservation means the crew has to be sized for that window, not for a leisurely day. A walk-up in Thornton Park or a second floor in College Park adds stairs. Those waits and carries are time on the same hourly clock. Put the floor, the elevator hours, the gate code, and the loading zone in the quote, not in a text after the crew is on the street.",
        "A gated community in MetroWest, Baldwin Park, or Lake Nona needs the code and a contact who can open the gate if the code fails. If the HOA only allows moves on certain days or only before a set hour, that limit is the schedule. We plan the crew around the window the property will actually open.",
      ],
    },
    {
      h2: "I-4 and the drive between Orlando stops",
      paragraphs: [
        "I-4 runs through Orlando and connects the north, downtown, and the south and west sides of the city. A hop from Lake Nona to College Park, from downtown to Dr. Phillips, or from MetroWest toward the attractions uses I-4 or the surface streets around it. Weekday mornings, weekday evenings, and a busy midday near downtown or the tourist roads can add drive time. That drive is part of the job. It is not a separate line we invent at the curb.",
        "Tell us both addresses and the window you want. If the drive plus the carry will not fit the elevator reservation or the loading zone, we will say so before the day. A Saturday morning is often the easier drive across town. Saturday afternoon can still stack up near International Drive and Sand Lake Road. We do not promise a travel time. We plan the crew around the route you actually have, and we would rather name a later start than pretend the freeway will be empty.",
        "A move that stays inside one neighborhood, College Park to College Park or Baldwin Park to a nearby Baldwin Park address, spends less of the clock on the road. A move from southeast Orlando to the north side spends more. Both are still this local hub if they stay in Central Florida. The city pages linked below are the ones to open when the other stop is Winter Park, Kissimmee, Lake Mary, or another city we serve.",
      ],
    },
    {
      h2: "Heat, afternoon storms, and the warmer months",
      paragraphs: [
        "Orlando summers are hot and humid, and afternoon storms are common in the warmer months. A midday carry in July takes longer than an early start when the building allows that window. An exposed walk from a Lake Nona curb, a Dr. Phillips parking lot, or a downtown loading zone is harder on people and on wrapped furniture than a shaded College Park driveway. Heat adds minutes. It does not add a separate charge.",
        "Florida's storm season runs through the warmer months into fall. A forecast of heavy rain or a storm for your date is a reason to call before the crew rolls, so we can say whether the day still works. We do not promise a weather window, and we will not start a carry on a street or a dock the building has closed. If the elevator reservation is only that afternoon and the storm sits on it, the next open window the property will give us is the honest plan.",
        "Published hours are Sun-Fri, 7:00 AM to 7:00 PM, and Sat, 9:00 AM to 5:00 PM. An early start is often the better Orlando day in summer, because the carry finishes before the hottest hours and before the usual afternoon rain. If the building only opens later, say so. We will match the crew to the window you can actually use.",
      ],
    },
    {
      h2: "Which Orlando booking to ask for",
      paragraphs: [
        "Full-service moving is the ask when the crew should bring the truck and place the home at the new address. Labor-only moving is the ask when the rental truck or container is already yours to drive and you need the lift. Apartment movers is the page when stairs, an elevator, or a loading zone is the hard part, whether the home is downtown or in a garden building. Loading and unloading is a short lift that is not a planned household move.",
        "Packing services is the add-on when rooms are still open and you want them boxed before the carry. Office movers is a small suite, desks, files, and a dock or freight elevator, not a network install. Same-day movers is a local hop when a crew is still open. It is not a guarantee, and a full board is a no for today. Small moves is one piece or a short furniture list. POD and U-Haul loading is the container, the rental, or the storage unit you already have on site. If you are unsure, start with the services page or call and name the two addresses.",
      ],
    },
  ],
  faqs: [
    {
      q: "How much do movers cost in Orlando?",
      a: QUOTE_RATE_ANSWER,
    },
    {
      q: "Do you handle apartment moves in downtown Orlando?",
      a: "Yes. Downtown, Thornton Park, and other Orlando apartments need the floor, the elevator or the stairs, and where a truck can stand. If the building reserves the elevator or wants paperwork ahead of time, send the manager's deadline with the booking. A walk-up is the same crew, with the stairs on the hourly clock.",
    },
    {
      q: "How do HOA and elevator windows change an Orlando move?",
      a: "The property's window is the schedule. A reserved elevator, a dock, or a gate that only opens for a set hour means the crew has to finish inside that window. We cannot open a slot the building never reserved. Share the rules, the code, and a contact who can meet the truck.",
    },
    {
      q: "Does I-4 change a local move inside Orlando?",
      a: "The drive is part of the job. I-4 and the roads around it can add time between Lake Nona, downtown, Dr. Phillips, and the north side, especially on a weekday peak or a busy Saturday near the tourist corridor. We do not promise a travel time. Tell us both addresses so the window you want still fits the carry.",
    },
    {
      q: "What should I know about Orlando heat and storms?",
      a: "Summer carries are slower in the middle of the day, and afternoon storms are common in the warmer months. An early start is often the easier day when the building allows it. If a storm is forecast for your date, call before the crew rolls. We will say whether that window still works.",
    },
    {
      q: "Which Orlando neighborhoods do you cover?",
      a: "The city itself, including downtown, Thornton Park, College Park, Audubon Park, Baldwin Park, MetroWest, Lake Nona, Dr. Phillips, Mills 50, and the neighborhoods around them. A stop in another Central Florida city uses that city's page. The list is linked below.",
    },
    {
      q: "Do you offer labor-only help in Orlando?",
      a: "Yes, when you already have the rental truck, the container, or the storage unit. The crew loads or unloads what you staged. If you want the truck and the crew together, that is full-service moving. Say which one when you book so we do not plan a second truck.",
    },
    {
      q: "How do I get an Orlando moving quote?",
      a: "Call or text 321-234-0510, or request a quote online. Share both addresses, the neighborhood or building, stairs or elevator hours, parking or a gate code, and whether you need a truck or labor-only help. Hours: Sun-Fri, 7:00 AM to 7:00 PM; Sat, 9:00 AM to 5:00 PM.",
    },
  ],
  closing: {
    h2: "Ready for Orlando movers?",
    body: "Tell us the neighborhood, both addresses, and how the building lets a truck in. We will match the crew, explain the hourly model, and point you to the service page that fits.",
  },
};

export function orlandoHubWordCount(copy = orlandoHub): number {
  const parts = [
    copy.lede,
    ...copy.sections.flatMap((section) => section.paragraphs),
    ...copy.faqs.map((item) => item.a),
    copy.closing.body,
  ];
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}

export function orlandoHubGraph() {
  const pageUrl = `${SITE_URL}${ORLANDO_HUB_PATH}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MovingCompany", "LocalBusiness"],
        "@id": `${pageUrl}#business`,
        name: `${BUSINESS_NAME}, Orlando movers`,
        url: pageUrl,
        telephone: PHONE_E164,
        email: EMAIL,
        description: ORLANDO_HUB_DESCRIPTION,
        areaServed: [
          cityPlace("Orlando"),
          { "@type": "AdministrativeArea", name: "Orange County" },
          { "@type": "AdministrativeArea", name: SERVICE_REGION },
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
        name: ORLANDO_HUB_TITLE,
        description: ORLANDO_HUB_DESCRIPTION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${pageUrl}#business` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Orlando Movers", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: orlandoHub.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
