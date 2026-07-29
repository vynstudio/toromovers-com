import { NextResponse } from "next/server";
import { notifyLead } from "@/lib/notify";

/**
 * Lead intake for toromovers.com
 *
 * Soft lead (name+phone): Telegram to team only.
 * Full lead: Telegram (team) + SMS + email (client) from hello@toromovers.com.
 *
 * Optional: also forwards to toromovers.net CRM when configured.
 */

function isSoft(body: Record<string, unknown>): boolean {
  const note = typeof body.note === "string" ? body.note : "";
  const serviceType =
    typeof body.serviceType === "string" ? body.serviceType : "";
  return (
    note.toLowerCase().includes("soft capture") ||
    serviceType.toLowerCase().includes("pending qualify")
  );
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  // Honeypot
  const hp = typeof body.hp === "string" ? body.hp.trim() : "";
  const elapsedMs =
    typeof body.elapsedMs === "number" ? body.elapsedMs : Infinity;
  if (hp !== "" || elapsedMs < 800) {
    return NextResponse.json({ ok: true, spam: true });
  }

  const name =
    typeof body.name === "string"
      ? body.name.trim()
      : typeof body.firstName === "string"
        ? body.firstName.trim()
        : "";
  const phoneRaw = typeof body.phone === "string" ? body.phone : "";
  const phone = phoneRaw.replace(/\D/g, "");
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!name || name.length < 2 || phone.length < 10) {
    return NextResponse.json(
      { error: "name + phone required" },
      { status: 400 },
    );
  }

  const soft = isSoft(body);
  // Soft capture: Telegram only. Full: Telegram + client SMS (+ email if given).
  const consentSms =
    body.consentSms !== false && body.consentSms !== "false";

  // Prefer forwarding to the live SEO/CRM engine (has Telegram/OpenPhone secrets).
  // Local notify is best-effort if this site has its own env keys.
  let channels: Awaited<ReturnType<typeof notifyLead>> = [];
  try {
    channels = await notifyLead({
      kind: soft ? "soft" : "full",
      name,
      phone,
      email: email || undefined,
      serviceType:
        typeof body.serviceType === "string" ? body.serviceType : undefined,
      note: typeof body.note === "string" ? body.note : undefined,
      moveDate: typeof body.moveDate === "string" ? body.moveDate : undefined,
      city: typeof body.city === "string" ? body.city : undefined,
      funnel: typeof body.funnel === "string" ? body.funnel : undefined,
      source:
        typeof body.source === "string" && body.source
          ? body.source
          : "toromovers.com",
      consentSms: soft ? false : consentSms,
      landingPage:
        typeof body.landingPage === "string"
          ? body.landingPage
          : "https://toromovers.com/",
    });
  } catch (err) {
    console.error("[lead] notifyLead threw", err);
  }

  // Always forward to engine CRM — never the public domain (avoids hybrid proxy loops).
  let forwarded = false;
  let forwardStatus = 0;
  const forwardUrl =
    process.env.LEAD_FORWARD_URL ||
    "https://live-toro-site.netlify.app/api/crm/lead";
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const secret = process.env.LEAD_INTAKE_SECRET;
    if (secret) headers["x-lead-secret"] = secret;

    const res = await fetch(forwardUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name,
        firstName: name.split(/\s+/)[0] || name,
        phone,
        email: email || undefined,
        serviceType:
          typeof body.serviceType === "string" ? body.serviceType : undefined,
        note: typeof body.note === "string" ? body.note : undefined,
        moveDate: typeof body.moveDate === "string" ? body.moveDate : undefined,
        city: typeof body.city === "string" ? body.city : undefined,
        funnel: typeof body.funnel === "string" ? body.funnel : undefined,
        source:
          typeof body.source === "string" && body.source
            ? body.source
            : "toromovers.com",
        site: "toromovers.com",
        consentSms: soft ? false : consentSms,
        landingPage:
          typeof body.landingPage === "string"
            ? body.landingPage
            : "https://toromovers.com/",
      }),
    });
    forwardStatus = res.status;
    forwarded = res.ok;
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      console.error("[lead] CRM forward failed", res.status, t.slice(0, 200));
    }
  } catch (err) {
    console.error("[lead] CRM forward error", err);
  }

  // Always 200 so the quote modal never shows "Couldn't send" when the lead
  // was accepted for processing (or spam-filtered). Team still gets engine CRM.
  return NextResponse.json({
    ok: true,
    soft,
    channels,
    forwarded,
    forwardStatus,
  });
}
