import { allCityPages } from "./city-pages.ts";
import {
  SERVICE_BASE_COUNTRY,
  SERVICE_BASE_LOCALITY,
  SERVICE_BASE_REGION,
  SERVICE_REGION,
} from "./site.ts";

/** Hidden-address service-area business. Locality only — no street, no ZIP. */
export function businessPostalAddress() {
  return {
    "@type": "PostalAddress" as const,
    addressLocality: SERVICE_BASE_LOCALITY,
    addressRegion: SERVICE_BASE_REGION,
    addressCountry: SERVICE_BASE_COUNTRY,
  };
}

/**
 * City we serve. Locality and state only — no street and no ZIP.
 * A bare city name is ambiguous (Winter Park and Oviedo exist outside Florida).
 */
export function cityPlace(name: string) {
  return {
    "@type": "City" as const,
    name,
    containedInPlace: { "@type": "State" as const, name: "Florida" },
    address: {
      "@type": "PostalAddress" as const,
      addressLocality: name,
      addressRegion: "FL",
      addressCountry: "US",
    },
  };
}

/** Cities with a page, then the counties and the region. Orlando first. */
export function businessAreaServed() {
  const cities = allCityPages()
    .filter((city) => city.slug !== "central-florida-movers")
    .slice()
    .sort((a, b) => {
      if (a.slug === "orlando-movers") return -1;
      if (b.slug === "orlando-movers") return 1;
      return a.name.localeCompare(b.name);
    })
    .map((city) => cityPlace(city.name));

  const counties = [
    "Orange County",
    "Seminole County",
    "Osceola County",
    "Lake County",
    "Polk County",
    "Volusia County",
  ].map((name) => ({ "@type": "AdministrativeArea" as const, name }));

  return [
    ...cities,
    ...counties,
    { "@type": "AdministrativeArea" as const, name: SERVICE_REGION },
  ];
}
