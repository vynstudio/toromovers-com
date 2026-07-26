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

  const channels = await notifyLead({
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

  // Optional CRM forward (HubSpot etc. on .net) — non-blocking for UX
  let forwarded = false;
  const forwardUrl =
    process.env.LEAD_FORWARD_URL || "https://toromovers.net/api/crm/lead";
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
        ...body,
        name,
        phone,
        email: email || undefined,
        source:
          typeof body.source === "string" && body.source
            ? body.source
            : "toromovers.com",
        site: "toromovers.com",
        landingPage:
          typeof body.landingPage === "string"
            ? body.landingPage
            : "https://toromovers.com/",
      }),
    });
    forwarded = res.ok;
    if (!res.ok) {
      console.error("[lead] CRM forward failed", res.status);
    }
  } catch (err) {
    console.error("[lead] CRM forward error", err);
  }

  const anyOk = channels.some((c) => c.ok) || forwarded;
  return NextResponse.json({
    ok: anyOk || true, // never block thank-you UX
    soft,
    channels,
    forwarded,
  });
}
