import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ClientChrome } from "@/components/ClientChrome";
import {
  fullServicePage,
  fullServicePageGraph,
} from "@/lib/full-service-page";
import { PHONE_DISPLAY, PHONE_TEL, QUOTE_PATH, SITE_URL } from "@/lib/site";

const page = fullServicePage;
const pageUrl = `${SITE_URL}${page.path}`;

export const metadata: Metadata = {
  title: "Full-service movers in Orlando | Truck, crew & placement",
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

export default function FullServiceMovingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fullServicePageGraph()),
        }}
      />
      <Nav />
      <main id="main" className="w-full min-w-0 flex-1">
        <section
          className="about-page full-bleed w-full"
          aria-labelledby="full-service-heading"
        >
          <div className="site-container about-page-inner">
            <div className="about-page-grid">
              <div className="about-page-copy">
                <p className="split-band-eyebrow">{page.hero.eyebrow}</p>
                <h1 id="full-service-heading" className="about-page-title">
                  {page.hero.h1}
                </h1>
                <p className="aeo-answer about-page-lede text-muted">
                  {page.hero.lede}
                </p>
                <ul className="about-stats" aria-label="Full-service highlights">
                  {page.hero.chips.map((chip) => (
                    <li key={chip}>
                      <strong>✓</strong>
                      <span>{chip}</span>
                    </li>
                  ))}
                </ul>
                <div className="about-page-actions">
                  <a href={PHONE_TEL} data-cta="full-service-call" className="btn-primary tap-target">
                    Call {PHONE_DISPLAY}
                  </a>
                  <a href={QUOTE_PATH} data-cta="full-service-quote" className="btn-outline tap-target">
                    Get a free quote
                  </a>
                  <a href="/blog/full-service-vs-labor-only-orlando" data-cta="full-service-compare" className="about-reviews-link">
                    Full-service vs labor-only →
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
            <h2 className="about-how-title">{page.forWhom.h2}</h2>
            <p className="aeo-answer text-muted" style={{ marginTop: "0.75rem" }}>{page.forWhom.intro}</p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.25rem" }}>
              {page.forWhom.bullets.map((b) => (
                <li key={b} className="text-muted" style={{ marginBottom: "0.5rem" }}>{b}</li>
              ))}
            </ul>
            <p className="text-muted" style={{ marginTop: "1rem" }}>
              {page.forWhom.aside}{" "}
              <a href="/labor-only-moving">Labor-only movers</a>.
            </p>

            <h2 className="about-how-title" style={{ marginTop: "2.5rem" }}>{page.included.h2}</h2>
            <p className="text-muted" style={{ marginTop: "0.75rem" }}>{page.included.intro}</p>
            <p style={{ marginTop: "1rem", fontWeight: 700 }}>Usually included</p>
            <ul style={{ paddingLeft: "1.25rem" }}>
              {page.included.weBring.map((b) => (
                <li key={b} className="text-muted" style={{ marginBottom: "0.4rem" }}>{b}</li>
              ))}
            </ul>
            <p style={{ marginTop: "1rem", fontWeight: 700 }}>Share when you book</p>
            <ul style={{ paddingLeft: "1.25rem" }}>
              {page.included.youShare.map((b) => (
                <li key={b} className="text-muted" style={{ marginBottom: "0.4rem" }}>{b}</li>
              ))}
            </ul>
            <p className="text-muted" style={{ marginTop: "1rem" }}>{page.included.note}</p>

            <h2 className="about-how-title" style={{ marginTop: "2.5rem" }}>{page.vsLabor.h2}</h2>
            <p className="aeo-answer text-muted" style={{ marginTop: "0.75rem" }}>{page.vsLabor.intro}</p>
            {page.vsLabor.blocks.map((block) => (
              <div key={block.title} style={{ marginTop: "1.25rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>{block.title}</h3>
                <p className="text-muted" style={{ marginTop: "0.35rem" }}>{block.body}</p>
              </div>
            ))}
            <p className="text-muted" style={{ marginTop: "1rem" }}>
              Deeper comparison:{" "}
              <a href="/blog/full-service-vs-labor-only-orlando">
                full-service vs labor-only in Orlando
              </a>
              .
            </p>

            <h2 className="about-how-title" style={{ marginTop: "2.5rem" }}>{page.pricing.h2}</h2>
            <p className="aeo-answer text-muted" style={{ marginTop: "0.75rem" }}>{page.pricing.intro}</p>
            <ol style={{ marginTop: "1rem", paddingLeft: "1.25rem" }}>
              {page.pricing.factors.map((f) => (
                <li key={f.title} className="text-muted" style={{ marginBottom: "0.5rem" }}>
                  <strong>{f.title}</strong> — {f.body}
                </li>
              ))}
            </ol>
            <p className="text-muted" style={{ marginTop: "1rem" }}>
              {page.pricing.close} Call or text <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> or{" "}
              <a href={QUOTE_PATH}>get a free quote online</a>. Also see{" "}
              <a href="/blog/how-much-does-a-local-move-cost-orlando">how much movers cost in Orlando</a>.
            </p>
            <p className="text-muted" style={{ marginTop: "0.75rem", fontSize: "0.95rem" }}>{page.pricing.marketNote}</p>

            <h2 className="about-how-title" style={{ marginTop: "2.5rem" }}>{page.areas.h2}</h2>
            <p className="text-muted" style={{ marginTop: "0.75rem" }}>{page.areas.intro}</p>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1rem", listStyle: "none", padding: 0, marginTop: "1rem" }}>
              {page.areas.links.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>

            <section id="faq" style={{ marginTop: "2.5rem" }}>
              <h2 className="about-how-title">Full-service movers — common questions</h2>
              <dl style={{ marginTop: "1rem" }}>
                {page.faqs.map((item) => (
                  <div key={item.q} style={{ marginBottom: "1.25rem" }}>
                    <dt style={{ fontWeight: 800 }}>{item.q}</dt>
                    <dd className="text-muted" style={{ marginTop: "0.35rem", marginLeft: 0 }}>{item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <div style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "1rem", background: "#0a0a0a", color: "#fff" }}>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 900 }}>{page.closing.h2}</h2>
              <p style={{ marginTop: "0.75rem", opacity: 0.9 }}>{page.closing.body}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1.25rem" }}>
                <a href={PHONE_TEL} data-cta="full-service-close-call" className="btn-primary tap-target" style={{ background: "#fff", color: "#000" }}>
                  Call {PHONE_DISPLAY}
                </a>
                <a href={QUOTE_PATH} data-cta="full-service-close-quote" className="btn-outline tap-target" style={{ borderColor: "#fff", color: "#fff" }}>
                  Get a free quote
                </a>
                <a href="/services" style={{ color: "#fff", textDecoration: "underline" }}>All services</a>
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
