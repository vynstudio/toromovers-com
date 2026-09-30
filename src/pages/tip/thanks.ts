export const prerender = false;

/** Same 307 as src/app/tip/thanks/page.tsx. Extra query params are dropped. */
export function GET({ url }: { url: URL }) {
  const sessionId = url.searchParams.get("session_id");
  const location = sessionId ? `/pay/thanks?session_id=${sessionId}` : "/pay";
  return new Response(null, {
    status: 307,
    headers: { location },
  });
}

export function HEAD(context: { url: URL }) {
  return GET(context);
}

export function ALL() {
  return new Response(null, { status: 405 });
}
