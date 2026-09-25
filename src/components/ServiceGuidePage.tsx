import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ClientChrome } from "@/components/ClientChrome";
import { serviceGuideGraph, type ServiceGuide } from "@/lib/service-guides";
import { PHONE_DISPLAY, PHONE_TEL, QUOTE_PATH, SITE_URL } from "@/lib/site";

export function serviceGuideMetadata(page: ServiceGuide): Metadata {
  const pageUrl = `${SITE_URL}${page.path}`;
  return {
    title: page.metadata.title,
    description: page.metadata.description,
    alternates: { canonical: page.path },
    robots: { index: true, follow: true },
    openGraph: {
      title: page.metadata.ogTitle,
      description: page.metadata.ogDescription,
      url: pageUrl,
      images: [
        {
          url: page.hero.image.src,
          width: 1200,
          height: 900,
          alt: page.hero.image.alt,
        },
      ],
    },
  };
}

export function ServiceGuidePage({ page }: { page: ServiceGuide }) {
  const cta = page.path.replace(/^\//, "");
  const related = page.related ?? [
    { label: "full-service moving", href: "/full-service-moving" },
    { label: "labor-only moving", href: "/labor-only-moving" },
    { label: "all services", href: "/services" },
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceGuideGraph(page)),
        }}
      />
      <Nav />
      <main id="main" className="w-full min-w-0 flex-1">
        <section className="about-page full-bleed w-full" aria-labelledby="service-guide-heading">
          <div className="site-container about-page-inner">
            <nav className="service-crumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span aria-hidden="true">/</span>
              <a href="/services">Services</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{page.crumb}</span>
            </nav>
            <div className="about-page-grid">
              <div className="about-page-copy">
                <p className="split-band-eyebrow">{page.hero.eyebrow}</p>
                <h1 id="service-guide-heading" className="about-page-title">
                  {page.hero.h1}
                </h1>
                <p className="aeo-answer about-page-lede text-muted">{page.hero.lede}</p>
                <ul className="about-stats" aria-label="Service highlights">
                  {page.hero.chips.map((chip) => (
                    <li key={chip}>
                      <strong>✓</strong>
                      <span>{chip}</span>
                    </li>
                  ))}
                </ul>
                <div className="about-page-actions">
                  <a href={PHONE_TEL} data-cta={`${cta}-call`} className="btn-primary tap-target">
                    Call {PHONE_DISPLAY}
                  </a>
                  <a href={QUOTE_PATH} data-cta={`${cta}-quote`} className="btn-outline tap-target">
                    Get a free quote
                  </a>
                  <a href={page.hero.blogHref} className="about-reviews-link">
                    {page.hero.blogLabel} →
                  </a>
                </div>
              </div>
              <div className="about-page-photo">
                <div className="about-page-frame">
                  <Image
                    src={page.hero.image.src}
                    alt={page.hero.image.alt}
                    fill
                    sizes="(max-width: 899px) 92vw, 42vw"
                    quality={80}
                    priority
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="full-bleed w-full" style={{ padding: "3rem 0" }}>
          <div className="site-container" style={{ maxWidth: "48rem" }}>
            <p className="aeo-answer text-muted">{page.hero.blogNote}</p>

            {page.sections.map((section) => (
              <section key={section.h2} style={{ marginTop: "2.5rem" }}>
                <h2 className="about-how-title">{section.h2}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-muted" style={{ marginTop: "0.75rem" }}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <h2 className="about-how-title" style={{ marginTop: "2.5rem" }}>
              {page.areas.h2}
            </h2>
            <p className="text-muted" style={{ marginTop: "0.75rem" }}>
              {page.areas.intro}
            </p>
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem 1rem",
                listStyle: "none",
                padding: 0,
                marginTop: "1rem",
              }}
            >
              {page.areas.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>

            <p className="text-muted" style={{ marginTop: "1.25rem" }}>
              Related: <a href={page.hero.blogHref}>{page.hero.blogLabel}</a>
              {related.map((link) => (
                <span key={link.href}>
                  {" · "}
                  <a href={link.href}>{link.label}</a>
                </span>
              ))}
            </p>

            <section id="faq" style={{ marginTop: "2.5rem" }}>
              <h2 className="about-how-title">{page.crumb} — common questions</h2>
              <dl style={{ marginTop: "1rem" }}>
                {page.faqs.map((item) => (
                  <div key={item.q} style={{ marginBottom: "1.25rem" }}>
                    <dt style={{ fontWeight: 800 }}>{item.q}</dt>
                    <dd className="aeo-answer text-muted" style={{ marginTop: "0.35rem", marginLeft: 0 }}>
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <div
              style={{
                marginTop: "2.5rem",
                padding: "1.5rem",
                borderRadius: "1rem",
                background: "#0a0a0a",
                color: "#fff",
              }}
            >
              <h2 style={{ fontSize: "1.35rem", fontWeight: 900 }}>{page.closing.h2}</h2>
              <p style={{ marginTop: "0.75rem", opacity: 0.9 }}>{page.closing.body}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1.25rem" }}>
                <a
                  href={PHONE_TEL}
                  data-cta={`${cta}-close-call`}
                  className="btn-primary tap-target"
                  style={{ background: "#fff", color: "#000" }}
                >
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href={QUOTE_PATH}
                  data-cta={`${cta}-close-quote`}
                  className="btn-outline tap-target"
                  style={{ borderColor: "#fff", color: "#fff" }}
                >
                  Get a free quote
                </a>
                <a href="/services" style={{ color: "#fff", textDecoration: "underline" }}>
                  All services
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCta />
      <ClientChrome />
    </>
  );
}
