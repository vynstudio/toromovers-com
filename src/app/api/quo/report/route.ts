import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Daily dump of unresolved after-hours tasks. Requires QUO_REPORT_SECRET. */
export async function GET(req: Request) {
  const secret = process.env.QUO_REPORT_SECRET;
  const provided = new URL(req.url).searchParams.get("secret") || req.headers.get("x-toro-report-secret");
  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const key = process.env.OPENPHONE_API_KEY || process.env.QUO_API_KEY || "";
  if (!key) {
    return NextResponse.json({ error: "OpenPhone is not configured." }, { status: 503 });
  }
  const res = await fetch("https://api.openphone.com/v1/tasks?maxResults=50", {
    headers: { Authorization: key },
  });
  const payload = (await res.json().catch(() => null)) as {
    data?: Array<{ title?: string; description?: string; status?: string }>;
  } | null;
  const open = (payload?.data || []).filter((task) => {
    const hay = `${task.title || ""} ${task.description || ""}`;
    return hay.includes("After Hours — Needs Follow-Up") && String(task.status || "").toLowerCase() !== "completed";
  });
  return NextResponse.json({
    ok: true,
    unresolved: open.length,
    items: open.map((task) => ({ title: task.title, status: task.status })),
  });
}
