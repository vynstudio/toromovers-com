const OPENPHONE_API = "https://api.openphone.com";
const QUO_API = "https://api.quo.com";

function apiKey(): string {
  return process.env.OPENPHONE_API_KEY || process.env.QUO_API_KEY || "";
}

async function quoFetch(path: string, init?: RequestInit, base = OPENPHONE_API) {
  const key = apiKey();
  if (!key) throw new Error("OPENPHONE_API_KEY is not set");
  const response = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  const text = await response.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text.slice(0, 500) };
  }
  if (!response.ok) {
    const err = new Error(`Quo ${response.status} ${path}`);
    (err as Error & { status?: number; body?: unknown }).status = response.status;
    (err as Error & { status?: number; body?: unknown }).body = json;
    throw err;
  }
  return json as Record<string, unknown>;
}

export async function listPhoneNumbers() {
  return quoFetch("/v1/phone-numbers");
}

export async function listUsers() {
  return quoFetch("/v1/users?maxResults=50");
}

export async function listCustomFields() {
  return quoFetch("/v1/contact-custom-fields");
}

export async function createContact(opts: {
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
}) {
  return quoFetch("/v1/contacts", {
    method: "POST",
    body: JSON.stringify({
      defaultFields: {
        firstName: opts.firstName,
        lastName: opts.lastName || "",
        phoneNumbers: opts.phone ? [{ name: "mobile", value: opts.phone }] : [],
        emails: opts.email ? [{ name: "email", value: opts.email }] : [],
      },
      source: "public-api",
    }),
  });
}

export async function createTask(opts: {
  title: string;
  description: string;
  phoneNumberId?: string;
  conversationId?: string;
  activityId?: string;
}) {
  const body: Record<string, string> = {
    title: opts.title,
    description: opts.description,
  };
  if (opts.activityId) body.activityId = opts.activityId;
  else if (opts.conversationId) body.conversationId = opts.conversationId;
  else if (opts.phoneNumberId) body.phoneNumberId = opts.phoneNumberId;
  else throw new Error("createTask needs phoneNumberId, conversationId, or activityId");
  return quoFetch("/v1/tasks", { method: "POST", body: JSON.stringify(body) });
}

export async function sendSms(to: string, content: string) {
  const from = process.env.OPENPHONE_FROM_NUMBER || process.env.QUO_FROM_NUMBER || "";
  return quoFetch("/v1/messages", {
    method: "POST",
    body: JSON.stringify({ from, to: [to], content }),
  });
}

export async function listMessages(phoneNumberId: string, participant: string) {
  const params = new URLSearchParams({
    phoneNumberId,
    maxResults: "20",
  });
  params.append("participants", participant);
  return quoFetch(`/v1/messages?${params.toString()}`);
}

export async function createCallSummaryWebhook(opts: { url: string; label: string; resourceIds?: string[] }) {
  return quoFetch("/v1/webhooks/call-summaries", {
    method: "POST",
    body: JSON.stringify({
      url: opts.url,
      label: opts.label,
      events: ["call.summary.completed"],
      resourceIds: opts.resourceIds || ["*"],
      status: "enabled",
    }),
  });
}

export async function createCallsWebhook(opts: { url: string; label: string; resourceIds?: string[] }) {
  return quoFetch("/v1/webhooks/calls", {
    method: "POST",
    body: JSON.stringify({
      url: opts.url,
      label: opts.label,
      events: ["call.completed"],
      resourceIds: opts.resourceIds || ["*"],
      status: "enabled",
    }),
  });
}

export async function createMessagesWebhook(opts: { url: string; label: string; resourceIds?: string[] }) {
  return quoFetch("/v1/webhooks/messages", {
    method: "POST",
    body: JSON.stringify({
      url: opts.url,
      label: opts.label,
      events: ["message.received"],
      resourceIds: opts.resourceIds || ["*"],
      status: "enabled",
    }),
  });
}

export { QUO_API };
