import { NextResponse } from "next/server";
import { mapboxToken, suggestMapboxAddresses } from "@/lib/mapbox-suggest";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const query = new URL(req.url).searchParams.get("q")?.trim().slice(0, 80) || "";
  if (query.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }
  if (!mapboxToken()) {
    return NextResponse.json(
      { suggestions: [], error: "unavailable" },
      { status: 503 },
    );
  }
  try {
    const suggestions = await suggestMapboxAddresses(query);
    return NextResponse.json({ suggestions });
  } catch (err) {
    console.error("[address-suggest]", err);
    return NextResponse.json(
      { suggestions: [], error: "unavailable" },
      { status: 503 },
    );
  }
}
