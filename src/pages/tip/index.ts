export const prerender = false;

/** Same 307 as the old Next.js redirect("/pay?type=tip"). */
export function GET() {
  return new Response(null, {
    status: 307,
    headers: { location: "/pay?type=tip" },
  });
}

export function HEAD() {
  return GET();
}

export function ALL() {
  return new Response(null, { status: 405 });
}
