import { NextResponse } from "next/server";

/**
 * Lead intake for toromovers.com.
 * Forwards to toromovers.net CRM when available; always returns ok for UX.
 * Source is forced to toromovers.com for attribution.
 */
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
  const phone =
    typeof body.phone === "string"
      ? body.phone.replace(/\D/g, "")
      : "";

  if (!name || name.length < 2 || phone.length < 10) {
    return NextResponse.json(
      { error: "name + phone required" },
      { status: 400 },
    );
  }

  const payload = {
    ...body,
    name,
    phone,
    source:
      typeof body.source === "string" && body.source
        ? body.source
        : "toromovers.com",
    landingPage:
      typeof body.landingPage === "string"
        ? body.landingPage
        : "https://toromovers.com/",
    site: "toromovers.com",
  };

  // Server-side forward to existing CRM on .net (no CORS)
  const forwardUrl =
    process.env.LEAD_FORWARD_URL ||
    "https://toromovers.net/api/crm/lead";

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const secret = process.env.LEAD_INTAKE_SECRET;
    if (secret) headers["x-lead-secret"] = secret;

    const res = await fetch(forwardUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({ ok: res.ok }));
    if (!res.ok) {
      console.error("[lead] forward failed", res.status, data);
      // Still return ok to the user — soft capture UX; log for ops
      return NextResponse.json({
        ok: true,
        forwarded: false,
        status: res.status,
      });
    }
    return NextResponse.json({ ok: true, forwarded: true, ...data });
  } catch (err) {
    console.error("[lead] forward error", err);
    return NextResponse.json({ ok: true, forwarded: false });
  }
}
