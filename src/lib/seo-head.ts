import {
  BUSINESS_NAME,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "./site.ts";

/**
 * Reproduce Next.js metadata output as it is served on toromovers.com.
 * Page openGraph / twitter objects replace the root objects (they do not
 * deep-merge images). robots replaces the root robots block.
 */

export type TitleIn = string | { absolute: string };

export type OgImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

export type MetaIn = {
  title?: TitleIn;
  description?: string;
  keywords?: string[] | string;
  robots?: {
    index?: boolean;
    follow?: boolean;
    nocache?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      noimageindex?: boolean;
      "max-image-preview"?: string;
      "max-snippet"?: number;
      "max-video-preview"?: number;
    };
  };
  alternates?: { canonical?: string };
  openGraph?: {
    type?: string;
    locale?: string;
    url?: string;
    siteName?: string;
    title?: string | TitleIn;
    description?: string;
    images?: Array<OgImage | string>;
  };
  twitter?: {
    card?: string;
    title?: string | TitleIn;
    description?: string;
    images?: Array<string | { url: string }>;
  };
};

const ROOT_KEYWORDS = [
  "movers Orlando",
  "Orlando movers",
  "local moving company Orlando",
  "apartment movers Orlando",
  "labor only movers Orlando",
  "full service movers Florida",
  "bilingual movers Orlando",
  "Toro Movers",
  "movers near me Central Florida",
];

const ROOT_OG_IMAGE: OgImage = {
  url: "/og/default.jpg",
  width: 1200,
  height: 630,
  alt: "Toro Movers — Orlando and Central Florida movers who quote up front",
};

const ROOT_ROBOTS_GOOGLEBOT =
  "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1";

export type HeadTag =
  | { kind: "title"; value: string }
  | { kind: "meta"; name?: string; property?: string; content: string }
  | { kind: "link"; rel: string; href: string; extra?: Record<string, string> };

function textTitle(title: string | TitleIn | undefined, fallback: string): string {
  if (!title) return fallback;
  if (typeof title === "string") return title;
  return title.absolute || fallback;
}

function documentTitle(title?: TitleIn): string {
  if (!title) return SITE_TITLE;
  if (typeof title === "string") return `${title} · ${BUSINESS_NAME}`;
  return title.absolute || SITE_TITLE;
}

export function absoluteUrl(url: string | undefined): string {
  if (!url) return SITE_URL;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url === "/") return SITE_URL;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

function robotsContent(robots: NonNullable<MetaIn["robots"]>): string {
  const parts = [
    robots.index === false ? "noindex" : "index",
    robots.follow === false ? "nofollow" : "follow",
  ];
  if (robots.nocache) parts.push("nocache");
  return parts.join(", ");
}

function googlebotContent(
  googleBot: NonNullable<NonNullable<MetaIn["robots"]>["googleBot"]>,
): string {
  const parts = [
    googleBot.index === false ? "noindex" : "index",
    googleBot.follow === false ? "nofollow" : "follow",
  ];
  if (googleBot["max-video-preview"] !== undefined) {
    parts.push(`max-video-preview:${googleBot["max-video-preview"]}`);
  }
  if (googleBot["max-image-preview"]) {
    parts.push(`max-image-preview:${googleBot["max-image-preview"]}`);
  }
  if (googleBot["max-snippet"] !== undefined) {
    parts.push(`max-snippet:${googleBot["max-snippet"]}`);
  }
  if (googleBot.noimageindex) parts.push("noimageindex");
  return parts.join(", ");
}

function asImages(images: Array<OgImage | string> | undefined): OgImage[] {
  if (!images) return [];
  return images.map((image) => (typeof image === "string" ? { url: image } : image));
}

export function resolveHead(page: MetaIn = {}): {
  title: string;
  description: string;
  canonical?: string;
  robots: string;
  googlebot?: string;
  tags: HeadTag[];
} {
  const title = documentTitle(page.title);
  const description = page.description ?? SITE_DESCRIPTION;
  const robots = page.robots
    ? robotsContent(page.robots)
    : "index, follow";
  const googlebot = page.robots
    ? page.robots.googleBot
      ? googlebotContent(page.robots.googleBot)
      : undefined
    : ROOT_ROBOTS_GOOGLEBOT;
  const canonical = page.alternates?.canonical
    ? absoluteUrl(page.alternates.canonical)
    : undefined;

  const og = page.openGraph
    ? {
        type: page.openGraph.type,
        locale: page.openGraph.locale,
        url: page.openGraph.url ? absoluteUrl(page.openGraph.url) : undefined,
        siteName: page.openGraph.siteName,
        title: page.openGraph.title
          ? textTitle(page.openGraph.title, title)
          : undefined,
        description: page.openGraph.description,
        images: asImages(page.openGraph.images),
      }
    : {
        type: "website" as const,
        locale: "en_US",
        url: SITE_URL,
        siteName: BUSINESS_NAME,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [ROOT_OG_IMAGE],
      };

  const twImages = page.twitter
    ? (page.twitter.images ?? []).map((image) =>
        typeof image === "string" ? image : image.url,
      )
    : ["/og/default.jpg"];
  const twitter = page.twitter
    ? {
        card:
          page.twitter.card ??
          (twImages.length ? "summary_large_image" : "summary"),
        title: page.twitter.title
          ? textTitle(page.twitter.title, title)
          : undefined,
        description: page.twitter.description,
        images: twImages,
      }
    : {
        card: "summary_large_image",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: ["/og/default.jpg"],
      };

  const keywords = Array.isArray(page.keywords)
    ? page.keywords.join(",")
    : typeof page.keywords === "string"
      ? page.keywords
      : ROOT_KEYWORDS.join(",");

  const tags: HeadTag[] = [
    { kind: "meta", name: "description", content: description },
    { kind: "meta", name: "application-name", content: BUSINESS_NAME },
    { kind: "meta", name: "author", content: BUSINESS_NAME },
    { kind: "meta", name: "keywords", content: keywords },
    { kind: "meta", name: "creator", content: BUSINESS_NAME },
    { kind: "meta", name: "publisher", content: BUSINESS_NAME },
    { kind: "meta", name: "robots", content: robots },
  ];
  if (googlebot) tags.push({ kind: "meta", name: "googlebot", content: googlebot });
  tags.push(
    { kind: "meta", name: "category", content: "business" },
    { kind: "meta", name: "geo.region", content: "US-FL" },
    { kind: "meta", name: "geo.placename", content: "Orlando" },
  );

  if (og.title) tags.push({ kind: "meta", property: "og:title", content: og.title });
  if (og.description) {
    tags.push({ kind: "meta", property: "og:description", content: og.description });
  }
  if (og.url) tags.push({ kind: "meta", property: "og:url", content: og.url });
  if (og.siteName) tags.push({ kind: "meta", property: "og:site_name", content: og.siteName });
  if (og.locale) tags.push({ kind: "meta", property: "og:locale", content: og.locale });
  for (const image of og.images) {
    tags.push({ kind: "meta", property: "og:image", content: absoluteUrl(image.url) });
    if (image.width) {
      tags.push({ kind: "meta", property: "og:image:width", content: String(image.width) });
    }
    if (image.height) {
      tags.push({ kind: "meta", property: "og:image:height", content: String(image.height) });
    }
    if (image.alt) tags.push({ kind: "meta", property: "og:image:alt", content: image.alt });
  }
  if (og.type) tags.push({ kind: "meta", property: "og:type", content: og.type });

  tags.push({ kind: "meta", name: "twitter:card", content: twitter.card });
  if (twitter.title) tags.push({ kind: "meta", name: "twitter:title", content: twitter.title });
  if (twitter.description) {
    tags.push({ kind: "meta", name: "twitter:description", content: twitter.description });
  }
  for (const image of twitter.images) {
    tags.push({ kind: "meta", name: "twitter:image", content: absoluteUrl(image) });
  }

  if (canonical) tags.push({ kind: "link", rel: "canonical", href: canonical });

  return { title, description, canonical, robots, googlebot, tags };
}
