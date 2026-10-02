import { NextResponse } from "next/server";
import { suggestMapboxAddresses } from "@/lib/mapbox-suggest";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const query = params.get("q")?.trim().slice(0, 80) || "";
  // areas=1 also returns city and ZIP matches (used by flexible fields).
  const areas = params.get("areas") === "1";
  if (query.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }
  try {
    const suggestions = await suggestMapboxAddresses(query, { areas });
    return NextResponse.json({ suggestions });
  } catch (err) {
    console.error("[address-suggest]", err);
    return NextResponse.json(
      { suggestions: [], error: "unavailable" },
      { status: 503 },
    );
  }
}
