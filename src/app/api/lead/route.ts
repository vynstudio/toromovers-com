import { NextResponse } from "next/server";
import { sendCapiLead } from "@/lib/capi";
import { leadFormIntake } from "@/lib/lead-form";
import { notifyLead } from "@/lib/notify";
import { quoteStops } from "@/lib/quote-address";

/**
 * Lead intake for toromovers.com
 *
 * Team: Telegram only. Full lead: client SMS + Resend confirmation email.
 *
 * Optional: also forwards to toromovers.net CRM when configured.
 */

function isSoft(body: Record<string, unknown>, serviceType: string, note: string): boolean {
  return (
    note.toLowerCase().includes("soft capture") ||
    serviceType.toLowerCase().includes("pending qualify")
  );
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Homepage callback uses flat fields. Get My Price sends nested contact/service_details. */
function flattenLead(body: Record<string, unknown>) {
  const contact = asRecord(body.contact);
  const details = asRecord(body.service_details);
  const name =
    str(body.name) ||
    str(body.firstName) ||
    str(contact?.full_name) ||
    [str(contact?.first_name), str(contact?.last_name)].filter(Boolean).join(" ");
  const phoneRaw =
    str(body.phone) || str(contact?.phone_e164) || str(contact?.phone);
  const email = (str(body.email) || str(contact?.email)).toLowerCase();
  const serviceType =
    str(body.serviceType) || str(body.service_label) || str(body.service_type);
  const moveDate = str(body.moveDate) || str(details?.move_date);
  const city = str(body.city) || str(details?.origin);
  const source =
    str(body.source) || str(body.form_location) || "toromovers.com";
  const consentSms =
    body.consentSms !== false &&
    body.consentSms !== "false" &&
    contact?.sms_call_consent !== false;
  const stops = quoteStops(source, details).stops;
  const note = [
    str(body.note),
    serviceType && `Service: ${serviceType}`,
    str(details?.primary_detail) && `Size: ${str(details?.primary_detail)}`,
    moveDate && `When: ${moveDate}`,
    str(details?.origin) && `From: ${str(details?.origin)}`,
    str(details?.destination) && `To: ${str(details?.destination)}`,
    stops
      ? `Distance: ${stops.distanceMiles.toFixed(1)} mi between addresses`
      : "",
    str(details?.access_conditions) &&
      `Access: ${str(details?.access_conditions)}`,
    str(details?.notes),
  ]
    .filter(Boolean)
    .join(" — ");
  return {
    name,
    phone: phoneRaw.replace(/\D/g, ""),
    email,
    serviceType,
    moveDate,
    city,
    source,
    consentSms,
    note,
  };
}

export async function POST(req: Request) {
  const headerSourceUrl = req.headers.get("referer") || "";
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";
  const userAgent = req.headers.get("user-agent") || "";
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

  const intake = leadFormIntake(body);
  if (intake && !intake.ok) {
    return NextResponse.json({ error: intake.error }, { status: 400 });
  }

  const flat = intake?.ok ? intake.flat : flattenLead(body);
  const details = asRecord(body.service_details);
  const quoted = quoteStops(flat.source, details);
  if (quoted.required && !quoted.stops) {
    return NextResponse.json(
      { error: "full_address_required" },
      { status: 400 },
    );
  }
  const name = flat.name;
  const phone = flat.phone;
  const email = flat.email;

  if (!name || name.length < 2 || phone.length < 10) {
    return NextResponse.json(
      { error: "name + phone required" },
      { status: 400 },
    );
  }

  const soft = isSoft(body, flat.serviceType, flat.note);
  const consentSms = flat.consentSms;
  const funnel = intake?.ok
    ? "lead-form"
    : typeof body.funnel === "string" && body.funnel
      ? body.funnel
      : "full-service";
  const landingPage = intake?.ok
    ? intake.landingPage
    : typeof body.landingPage === "string" && body.landingPage
      ? body.landingPage
      : "https://toromovers.com/quotes";

  let channels: Awaited<ReturnType<typeof notifyLead>> = [];
  try {
    channels = await notifyLead({
      kind: soft ? "soft" : "full",
      name,
      phone,
      email: email || undefined,
      serviceType: flat.serviceType || undefined,
      note: flat.note || undefined,
      moveDate: flat.moveDate || undefined,
      city: flat.city || undefined,
      pickup: quoted.stops?.origin,
      dropoff: quoted.stops?.destination,
      distanceMiles: quoted.stops?.distanceMiles,
      funnel,
      source: flat.source,
      consentSms: soft ? false : consentSms,
      landingPage,
      title: intake?.ok ? intake.title : undefined,
    });
    console.info(
      "[lead] notify",
      channels
        .map((c) => `${c.channel}:${c.ok ? "ok" : c.detail || "fail"}`)
        .join(" | "),
    );
  } catch (err) {
    console.error("[lead] notifyLead threw", err);
  }

  const attr = asRecord(body.attribution);
  const eventId = str(attr?.event_id) || str(body.eventId);
  if (
    eventId &&
    !soft &&
    (flat.source === "ads_short_form" || flat.source === "lead_form")
  ) {
    try {
      const capi = await sendCapiLead({
        eventId,
        name,
        phone,
        email: email || undefined,
        sourceUrl: landingPage || headerSourceUrl,
        contentName:
          flat.source === "lead_form" ? "lead_form" : "ads_short_callback",
        fbp: str(attr?.fbp),
        fbc: str(attr?.fbc),
        clientIp,
        userAgent,
      });
      console.info("[lead] capi", capi.ok ? "ok" : capi.detail || "skip");
    } catch (err) {
      console.error("[lead] capi threw", err);
    }
  }

  // Do not forward to this same Netlify site — /api/crm/lead is not hosted here.
  let forwarded = false;
  let forwardStatus = 0;
  const forwardUrl = process.env.LEAD_FORWARD_URL || "";
  const skipForward =
    !forwardUrl || /live-toro-site\.netlify\.app/i.test(forwardUrl);
  if (!skipForward) {
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
          serviceType: flat.serviceType || undefined,
          service: intake?.ok ? intake.payload.service : undefined,
          note: flat.note || undefined,
          moveDate: flat.moveDate || undefined,
          city: flat.city || undefined,
          pickupAddress: quoted.stops?.origin,
          dropoffAddress: quoted.stops?.destination,
          originPlaceId: quoted.stops?.originPlaceId,
          destinationPlaceId: quoted.stops?.destinationPlaceId,
          originLng: quoted.stops?.originLng,
          originLat: quoted.stops?.originLat,
          destinationLng: quoted.stops?.destinationLng,
          destinationLat: quoted.stops?.destinationLat,
          distanceMiles: quoted.stops?.distanceMiles,
          funnel,
          source: flat.source,
          site: "toromovers.com",
          consentSms: soft ? false : consentSms,
          landingPage,
          ...(intake?.ok
            ? { lead_form: intake.payload, title: intake.title }
            : {}),
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
