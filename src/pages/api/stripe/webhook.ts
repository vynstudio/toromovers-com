import { POST as post } from "../../../app/api/stripe/webhook/route";

export const prerender = false;

export function ALL() {
  return new Response(null, { status: 405 });
}

export async function POST({ request }: { request: Request }) {
  return post(request);
}
