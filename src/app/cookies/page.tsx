import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "@/lib/legal";
import {
  BUSINESS_NAME,
  EMAIL,
  EMAIL_HREF,
  LEGAL_NAME,
  SITE_URL,
} from "@/lib/site";
import { CookiePreferences } from "@/components/CookiePreferences";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${BUSINESS_NAME} uses cookies and similar technologies on ${SITE_URL.replace("https://", "")}.`,
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="scroll-mt-24 pt-8 text-xl font-medium tracking-tight text-foreground">
      {children}
    </h2>
  );
}

export default function CookiesPage() {
  return (
    <main className="full-bleed w-full bg-white">
      <div className="site-container-narrow py-14 sm:py-20 lg:py-24">
        <Link
          href="/"
          className="text-sm text-foreground underline underline-offset-4"
        >
          ← Back home
        </Link>

        <h1 className="mt-8 text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
          Cookie Policy
        </h1>
        <p className="mt-2 text-sm text-muted">
          Revised as of {LEGAL.cookiesUpdated}
        </p>

        <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-muted">
          <p>
            This Cookie Policy explains how{" "}
            <strong className="font-medium text-foreground">{LEGAL_NAME}</strong>{" "}
            (“{BUSINESS_NAME},” “we,” “us”) uses cookies and similar technologies
            on{" "}
            <a className="text-foreground underline" href={SITE_URL}>
              {SITE_URL.replace("https://", "")}
            </a>{" "}
            (the “Website”). It should be read together with our{" "}
            <Link className="text-foreground underline" href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>

          <H2>What are cookies?</H2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help the site function, remember preferences, and
            understand how visitors use the site. Similar technologies include
            pixels, local storage, and scripts that collect usage data.
          </p>

          <H2>Why we use cookies</H2>
          <p>We use cookies and similar technologies to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong className="font-medium text-foreground">Essential</strong>{" "}
              — run the Website securely, keep forms working, and remember basic
              session state
            </li>
            <li>
              <strong className="font-medium text-foreground">Preferences</strong>{" "}
              — store choices such as cookie consent
            </li>
            <li>
              <strong className="font-medium text-foreground">Analytics</strong>{" "}
              — measure traffic, page performance, and which pages help visitors
              request a quote
            </li>
            <li>
              <strong className="font-medium text-foreground">Marketing</strong>{" "}
              — if enabled, measure ad campaigns and limit duplicate ads (we use
              these only when you allow them or as permitted by law)
            </li>
          </ul>

          <H2>Types of cookies we may use</H2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead className="bg-[#f5f5f5] text-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Purpose</th>
                  <th className="px-4 py-3 font-medium">Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground">
                    Strictly necessary
                  </td>
                  <td className="px-4 py-3">
                    Core site operation, security, load balancing, consent
                    storage
                  </td>
                  <td className="px-4 py-3">Session, CSRF, cookie consent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground">
                    Analytics
                  </td>
                  <td className="px-4 py-3">
                    Aggregate usage stats, performance, conversion paths
                  </td>
                  <td className="px-4 py-3">
                    Google Analytics or privacy-friendly analytics (if active)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground">
                    Marketing
                  </td>
                  <td className="px-4 py-3">
                    Measure campaign effectiveness; retargeting where enabled
                  </td>
                  <td className="px-4 py-3">Ad platform pixels (if active)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <H2>Your choices — cookie preferences</H2>
          <p>
            You can accept analytics/marketing cookies, reject optional cookies,
            or change your mind later. Strictly necessary cookies are always on
            because the site cannot function reliably without them.
          </p>

          <CookiePreferences />

          <p className="pt-2">
            You can also control cookies in your browser (block, delete, or
            alert you when cookies are set). If you disable cookies, some
            features of the Website may not work as expected.
          </p>
          <p>
            Industry opt-outs for interest-based ads:{" "}
            <a
              className="text-foreground underline"
              href="https://optout.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
            >
              aboutads.info
            </a>
            ,{" "}
            <a
              className="text-foreground underline"
              href="https://optout.networkadvertising.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              networkadvertising.org
            </a>
            . Google Ads settings:{" "}
            <a
              className="text-foreground underline"
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              adssettings.google.com
            </a>
            .
          </p>

          <H2>Do Not Sell or Share</H2>
          <p>
            We do not sell personal information for money. Some analytics or
            advertising cookies may involve “sharing” for cross-context
            behavioral advertising under certain state laws. You can limit
            optional cookies using the preferences above or a Global Privacy
            Control (GPC) signal where we detect and honor it.
          </p>

          <H2>Updates</H2>
          <p>
            We may update this Cookie Policy by posting a new version on this
            page. The “Revised as of” date at the top will change when we do.
          </p>

          <H2>Contact</H2>
          <p>
            Questions about cookies:{" "}
            <a className="text-foreground underline" href={EMAIL_HREF}>
              {EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
