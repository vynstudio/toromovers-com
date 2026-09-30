import { GET as get } from "../../../app/api/pay/status/route";

export const prerender = false;

export function ALL() {
  return new Response(null, { status: 405 });
}

export async function GET({ request }: { request: Request }) {
  return get(request);
}

export function HEAD(context: { request: Request }) {
  return GET(context);
}
