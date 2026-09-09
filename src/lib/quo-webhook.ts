import crypto from "node:crypto";

export function verifyQuoSignature(opts: {
  secret: string;
  rawBody: string;
  webhookId: string;
  timestamp: string;
  signature: string;
}): boolean {
  const secret = opts.secret.startsWith("whsec_") ? opts.secret.slice("whsec_".length) : opts.secret;
  const timestamp = Number(opts.timestamp);
  const now = Math.floor(Date.now() / 1000);
  if (!Number.isFinite(timestamp) || Math.abs(now - timestamp) > 5 * 60) return false;
  const expected = crypto
    .createHmac("sha256", Buffer.from(secret, "base64"))
    .update(`${opts.webhookId}.${opts.timestamp}.${opts.rawBody}`)
    .digest("base64");
  const provided = opts.signature
    .split(" ")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [version, sig] = entry.split(",");
      return version === "v1" ? sig : undefined;
    })
    .filter((sig): sig is string => Boolean(sig));
  return provided.some((sig) => {
    const left = Buffer.from(sig);
    const right = Buffer.from(expected);
    return left.length === right.length && crypto.timingSafeEqual(left, right);
  });
}
