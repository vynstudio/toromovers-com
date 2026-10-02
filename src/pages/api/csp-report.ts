export const prerender = false;

/** CSP reports are small. Drop the rest so a large POST cannot pin memory. */
const MAX_BYTES = 4096;

async function readCapped(request: Request): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (total < MAX_BYTES) {
    const { done, value } = await reader.read();
    if (done || !value) break;
    const room = MAX_BYTES - total;
    const slice = value.byteLength > room ? value.subarray(0, room) : value;
    chunks.push(slice);
    total += slice.byteLength;
    if (value.byteLength > room) {
      await reader.cancel();
      break;
    }
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(merged);
}

/** Logs a truncated CSP report and stores nothing. */
export async function POST({ request }: { request: Request }) {
  try {
    const body = await readCapped(request);
    console.log("[csp-report]", body || "empty");
  } catch {
    console.log("[csp-report]", "unreadable");
  }
  return new Response(null, { status: 204 });
}

export function ALL() {
  return new Response(null, { status: 204 });
}
