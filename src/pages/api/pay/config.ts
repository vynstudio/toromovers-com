import { GET as get } from "../../../app/api/pay/config/route";

export const prerender = false;

export function ALL() {
  return new Response(null, { status: 405 });
}

export async function GET() {
  return get();
}

export function HEAD() {
  return GET();
}
