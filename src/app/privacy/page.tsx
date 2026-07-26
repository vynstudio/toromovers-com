import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "@/lib/legal";
import {
  BUSINESS_NAME,
  EMAIL,
  EMAIL_HREF,
  LEGAL_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BUSINESS_NAME} collects, uses, and protects personal information on ${SITE_URL.replace("https://", "")}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="legal-h2 scroll-mt-24 pt-8 text-xl font-medium tracking-tight text-foreground">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="legal-h3 pt-5 text-base font-medium text-foreground">
      {children}
    </h3>
  );
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted">
          Revised as of {LEGAL.privacyUpdated}
        </p>

        <nav
          className="mt-8 rounded-2xl border border-border bg-[#fafafa] p-5 sm:p-6"
          aria-label="Table of contents"
        >
          <p className="text-sm font-medium text-foreground">Table of Contents</p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted">
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href="#consent">
                Your consent
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href="#collect">
                Types of personal information we collect
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href="#use">
                How we use your personal information
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href="#email">
                Email &amp; SMS communications
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href="#sharing">
                Sharing information
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href="#web">
                Web-related information &amp; cookies
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href="#links">
                Links to other websites
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href="#children">
                Children&apos;s privacy
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href="#security">
                Security
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href="#dnt">
                Do-not-track signals
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href="#state">
                Regional privacy disclosure
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href="#access">
                Accessing and correcting your information
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href="#contact">
                Contact
              </a>
            </li>
          </ol>
        </nav>

        <div className="legal-body mt-8 space-y-4 text-[15px] leading-relaxed text-muted">
          <p>
            This Privacy Policy (the “Privacy Policy”) describes why{" "}
            <strong className="font-medium text-foreground">{LEGAL_NAME}</strong>{" "}
            and its affiliates (collectively, “{BUSINESS_NAME},” “we,” “our,” or
            “us”) collects particular information from visitors and customers
            (referred to as “Users,” “you,” or “your”), how we use it, and to
            whom and under what circumstances we may disclose it. We encourage
            you to read this Privacy Policy carefully. It is effective as of the
            date set forth above.
          </p>
          <p>
            This Privacy Policy applies to personal information we collect from
            and about you on our website at{" "}
            <a className="text-foreground underline underline-offset-2" href={SITE_URL}>
              {SITE_URL.replace("https://", "")}
            </a>{" "}
            (the “Website”), by phone, text, email, or when you request a quote,
            schedule a move, or otherwise use services offered by {BUSINESS_NAME}{" "}
            (the “Services”). It also explains how you can exercise your data
            protection rights and the choices you can make about how your
            information is collected and used.
          </p>
          <p>
            Except as explicitly provided herein, this Privacy Policy does not
            apply to the practices of entities that we do not own or control,
            including linked websites, or to people that we do not employ or
            manage.
          </p>
          <p>
            Residents of some states may have additional rights concerning their
            Personal Information. Residents of California, Colorado, Connecticut,
            Delaware, Iowa, Minnesota, Nebraska, New Hampshire, New Jersey,
            Oregon, Tennessee, Texas, Utah, or Virginia are also directed to the{" "}
            <a className="text-foreground underline underline-offset-2" href="#state">
              Regional Privacy Disclosure
            </a>{" "}
            section below.
          </p>

          <H2>
            <span id="consent">Your Consent</span>
          </H2>
          <p>
            By accessing any part of the Website or using the Services, you
            consent to and agree with this Privacy Policy. This Privacy Policy is
            part of the{" "}
            <Link className="text-foreground underline underline-offset-2" href="/terms">
              Terms of Service
            </Link>{" "}
            governing your use of the Website and the Services. If you do not
            agree with any part of this Privacy Policy, please do not use the
            Website or the Services.
          </p>
          <p>
            We may change or revise this Privacy Policy at any time at our sole
            discretion by posting the updated policy on this page. Changes are
            effective when posted. Your continued use of the Website or Services
            after a change constitutes acceptance of the revised policy. Please
            review this page periodically.
          </p>
          <p>
            This Privacy Policy is a notice of our practices and does not create
            contractual rights beyond those required by applicable law.
          </p>

          <H2>
            <span id="collect">
              Types of Personal Information We Collect and How We Collect It
            </span>
          </H2>
          <p>
            We collect information in order to provide moving services, respond
            to quote requests, communicate with you, improve our operations, and
            meet legal and compliance obligations.
          </p>
          <p>We may collect information when you:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Request a free quote or fill out a form on the Website</li>
            <li>Call, text, or email us</li>
            <li>Book, reschedule, or complete a move</li>
            <li>Leave a review or communicate on social platforms we monitor</li>
            <li>Otherwise use the Website or Services</li>
          </ul>
          <p>Such information may include:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong className="font-medium text-foreground">Contact details</strong>{" "}
              — name, phone number, email address, and service addresses
            </li>
            <li>
              <strong className="font-medium text-foreground">Move details</strong>{" "}
              — origin and destination, home type, stairs/elevator notes, dates,
              inventory notes, and preferences you share
            </li>
            <li>
              <strong className="font-medium text-foreground">Payment information</strong>{" "}
              — billing details processed by our payment providers (we do not
              store full card numbers on our servers when cards are used)
            </li>
            <li>
              <strong className="font-medium text-foreground">Device &amp; technical data</strong>{" "}
              — IP address, browser type, device type, approximate location from
              IP, pages viewed, and referral source
            </li>
            <li>
              <strong className="font-medium text-foreground">Communications</strong>{" "}
              — records of calls, texts, emails, and form submissions related to
              your quote or move
            </li>
          </ul>
          <p>
            The Personal Information you provide should be true, accurate, and
            complete. We may combine information you provide with information
            from service providers (for example, analytics or messaging tools)
            and treat combined information as Personal Information under this
            policy.
          </p>
          <p>
            When you delete a request or stop using the Services, we may retain
            information for a reasonable period for record keeping, customer
            service, dispute resolution, fraud prevention, and legal compliance.
          </p>

          <H2>
            <span id="use">How We Use Your Personal Information</span>
          </H2>
          <p>We use Personal Information to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Respond to inquiries and provide quotes</li>
            <li>Schedule, perform, and invoice moving services</li>
            <li>
              Communicate with you about your move by phone, SMS, or email
            </li>
            <li>
              Send service-related notices (confirmations, schedule changes,
              safety or legal notices)
            </li>
            <li>
              Improve the Website, marketing, and customer experience (including
              analytics)
            </li>
            <li>
              Protect our rights and users, prevent fraud or abuse, and comply
              with law
            </li>
            <li>
              Carry out any other purpose disclosed at collection or permitted
              by applicable law
            </li>
          </ul>

          <H2>
            <span id="email">Email &amp; SMS Communications</span>
          </H2>
          <p>
            Service-related messages (quote follow-ups, scheduling, and
            move-day coordination) are necessary to provide the Services. You
            may not opt out of essential service messages while an active booking
            is in progress.
          </p>
          <p>
            Marketing emails or texts, if offered, are voluntary. You can opt
            out of marketing messages by replying STOP to SMS or using the
            unsubscribe link in emails, or by contacting us at{" "}
            <a className="text-foreground underline" href={EMAIL_HREF}>
              {EMAIL}
            </a>
            . Opting out of marketing does not affect transactional messages
            about an existing quote or move.
          </p>
          <p>
            We do not sell SMS opt-in data or share text messaging consent with
            third parties for their own marketing. We may share data with vendors
            that help us deliver messages (for example, telephony or email
            providers) solely to provide those services.
          </p>

          <H2>
            <span id="sharing">Sharing Information</span>
          </H2>
          <p>
            We may share Personal Information with vendors and service providers
            who help us operate the business, such as:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Website hosting and form processing</li>
            <li>Email, SMS, and notification providers</li>
            <li>Payment processors</li>
            <li>Analytics and advertising measurement tools</li>
            <li>Professional advisors (legal, accounting) when needed</li>
          </ul>
          <p>
            Such parties may use your information only to perform services for us
            and not for their own unrelated purposes, except as required by law.
          </p>
          <p>
            We may disclose information when we believe disclosure is necessary
            to comply with law, court order, or legal process; protect the
            rights, property, or safety of {BUSINESS_NAME}, our customers, or
            others; investigate fraud or security issues; or in connection with
            a merger, sale, or transfer of assets (with notice where required).
          </p>
          <p>
            We do not sell personal information for money. As described in the{" "}
            <Link className="text-foreground underline" href="/cookies">
              Cookie Policy
            </Link>
            , certain analytics or advertising technologies may “share” or
            process data in ways that some state laws treat as a “sale” or
            “share.” You can manage cookies as described on that page.
          </p>

          <H2>
            <span id="web">Web-Related Information Collection &amp; Cookies</span>
          </H2>
          <p>
            We use cookies and similar technologies to operate the Website,
            remember preferences, understand traffic, and improve performance.
            Cookies may assign a unique identifier and collect statistical
            information such as pages visited, browser type, and approximate
            location.
          </p>
          <p>
            We may use analytics services (such as Google Analytics or privacy-
            friendly analytics) that use cookies or similar tools to measure
            aggregate site performance. You can control cookies through your
            browser settings and, where available, our{" "}
            <Link className="text-foreground underline" href="/cookies">
              Cookie Policy &amp; Preferences
            </Link>
            . Blocking some cookies may limit Website functionality.
          </p>
          <p>
            For industry opt-outs related to interest-based advertising, visit{" "}
            <a
              className="text-foreground underline"
              href="https://optout.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
            >
              optout.aboutads.info
            </a>{" "}
            or{" "}
            <a
              className="text-foreground underline"
              href="https://optout.networkadvertising.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              optout.networkadvertising.org
            </a>
            .
          </p>

          <H2>
            <span id="links">Links to Other Websites</span>
          </H2>
          <p>
            The Website may link to third-party sites (for example, Google Maps
            reviews or social media). We do not control those sites’ privacy
            practices. Your use of third-party sites is at your own risk and
            subject to their terms and policies.
          </p>

          <H2>
            <span id="children">Children&apos;s Privacy</span>
          </H2>
          <p>
            The Website and Services are intended for a general audience and are
            not directed to children under 13. We do not knowingly collect
            personal information from children under 13. If you believe a child
            under 13 has provided us information, contact us and we will delete
            it promptly.
          </p>

          <H2>
            <span id="security">Security Policy</span>
          </H2>
          <p>
            We use reasonable administrative, technical, and physical safeguards
            designed to protect Personal Information, including encryption in
            transit (HTTPS/TLS) where appropriate. No method of transmission or
            storage is 100% secure. You use the Website and transmit information
            at your own risk.
          </p>
          <p>
            If we experience a security incident affecting your Personal
            Information, we will notify you and regulators as required by law.
          </p>
          <p>
            We retain information as long as needed to provide Services, improve
            operations, comply with legal obligations, resolve disputes, and
            enforce agreements.
          </p>

          <H2>
            <span id="dnt">Do-Not-Track Signals</span>
          </H2>
          <p>
            Some browsers transmit “do-not-track” signals. There is no uniform
            standard for how websites should respond. {BUSINESS_NAME} does not
            currently change its practices solely in response to browser DNT
            signals. You can control cookies as described in our Cookie Policy.
          </p>

          <H2>
            <span id="state">Regional Privacy Disclosure</span>
          </H2>
          <p>
            This section supplements the Privacy Policy for residents of certain
            U.S. states, including California, Colorado, Connecticut, Delaware,
            Iowa, Minnesota, Nebraska, New Hampshire, New Jersey, Oregon,
            Tennessee, Texas, Utah, and Virginia, to the extent applicable law
            applies to our processing.
          </p>

          <H3>Categories of personal information</H3>
          <p>
            In the last 12 months, depending on how you interact with us, we may
            have collected:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Identifiers (name, email, phone, IP address)</li>
            <li>Customer records information (contact and service addresses)</li>
            <li>Commercial information (quotes, bookings, service history)</li>
            <li>Internet / network activity (device, logs, analytics)</li>
            <li>Geolocation data (approximate, e.g. from IP or addresses you provide)</li>
            <li>Inferences drawn from the above for service improvement</li>
          </ul>

          <H3>Your rights (where applicable)</H3>
          <ul className="list-disc space-y-1 pl-5">
            <li>Right to know / access personal information we hold about you</li>
            <li>Right to correct inaccuracies</li>
            <li>Right to request deletion, subject to legal exceptions</li>
            <li>Right to obtain a portable copy of certain data</li>
            <li>
              Right to opt out of “sale” or “sharing” of personal information for
              cross-context behavioral advertising, where those terms apply
            </li>
            <li>Right not to be discriminated against for exercising privacy rights</li>
            <li>Right to appeal certain decisions, where provided by state law</li>
          </ul>

          <H3>How to exercise your rights</H3>
          <p>Submit a request by:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Emailing{" "}
              <a className="text-foreground underline" href={EMAIL_HREF}>
                {EMAIL}
              </a>{" "}
              with the subject line “{LEGAL.supportSubjectPrivacy}” or “
              {LEGAL.supportSubjectState}”
            </li>
            <li>
              Calling{" "}
              <a className="text-foreground underline" href={PHONE_TEL}>
                {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
          <p>
            Include your full name, email or phone, and a description of your
            request. We may need to verify your identity before processing. We
            will respond within the time required by applicable law. If we deny a
            request, we will explain why and, where required, how to appeal.
          </p>
          <p>
            California residents may also have rights under California’s “Shine
            the Light” law (Cal. Civ. Code § 1798.83) regarding certain
            third-party marketing disclosures. Contact us at the email above to
            make a request.
          </p>

          <H3>International users</H3>
          <p>
            The Website is operated from the United States for customers in
            Central Florida. If you access the Website from outside the U.S.,
            you understand that information may be processed in the United
            States, where data protection laws may differ from those in your
            country.
          </p>

          <H2>
            <span id="access">Accessing and Correcting Your Personal Information</span>
          </H2>
          <p>
            You may request access to, correction of, or deletion of Personal
            Information we hold about you by contacting:
          </p>
          <p className="rounded-xl border border-border bg-[#fafafa] p-4 text-foreground">
            {LEGAL_NAME}
            <br />
            {SERVICE_CITY_LINE}
            <br />
            <a className="underline" href={EMAIL_HREF}>
              {EMAIL}
            </a>
            <br />
            <a className="underline" href={PHONE_TEL}>
              {PHONE_DISPLAY}
            </a>
          </p>
          <p>
            Please include enough detail for us to locate your records. We will
            use reasonable efforts to honor valid requests, subject to legal
            exceptions.
          </p>

          <H2>
            <span id="contact">Contact</span>
          </H2>
          <p>
            Questions about this Privacy Policy or our privacy practices:{" "}
            <a className="text-foreground underline" href={EMAIL_HREF}>
              {EMAIL}
            </a>
            .
          </p>
          <p className="pt-4 text-sm">
            Also see our{" "}
            <Link className="text-foreground underline" href="/cookies">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link className="text-foreground underline" href="/terms">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

const SERVICE_CITY_LINE = "Orlando / Central Florida, USA";
