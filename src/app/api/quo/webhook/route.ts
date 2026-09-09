import { NextResponse } from "next/server";
import { sendTelegram } from "@/lib/notify";
import {
  JOB_QUOTE,
  JOB_SPANISH,
  JOB_UNKNOWN,
  JOB_URGENT,
  leadFromSonaEvent,
  looksLikeOptOut,
  MISSED_CALL_SMS,
  parseQuoEvent,
  smsFollowUpAllowed,
  taskDescription,
  taskTitle,
  telegramMessage,
} from "@/lib/quo-after-hours";
import { createContact, createTask, listMessages, sendSms } from "@/lib/quo-client";
import { verifyQuoSignature } from "@/lib/quo-webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const sentSms = new Set<string>();

function authorized(req: Request, raw: string): boolean {
  const legacy = process.env.OPENPHONE_WEBHOOK_SECRET || "";
  if (legacy && req.headers.get("x-openphone-secret") === legacy) return true;
  const secret = process.env.QUO_WEBHOOK_KEY || process.env.OPENPHONE_WEBHOOK_KEY || "";
  if (!secret) return !legacy;
  const webhookId = req.headers.get("webhook-id") || "";
  const timestamp = req.headers.get("webhook-timestamp") || "";
  const signature = req.headers.get("webhook-signature") || "";
  if (!webhookId || !timestamp || !signature) return false;
  return verifyQuoSignature({ secret, rawBody: raw, webhookId, timestamp, signature });
}

export async function POST(req: Request) {
  const raw = await req.text();
  if (!authorized(req, raw)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = JSON.parse(raw || "null") as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "bad_json" }, { status: 400 });

  const event = parseQuoEvent(body);

  if (event.type === "call.summary.completed" || event.jobs.length > 0) {
    const lead = leadFromSonaEvent({
      callId: event.callId,
      fromPhone: event.fromPhone,
      summary: event.summary,
      jobs: event.jobs,
    });
    const notify = await sendTelegram(telegramMessage(lead));
    let taskId = "";
    let contactOk = false;
    try {
      if (lead.customer_name || lead.phone) {
        const first = (lead.customer_name || "Caller").split(" ")[0];
        const last = (lead.customer_name || "").split(" ").slice(1).join(" ");
        await createContact({
          firstName: first,
          lastName: last,
          phone: lead.phone,
          email: lead.email,
        });
        contactOk = true;
      }
    } catch (err) {
      console.error("[quo/webhook] contact", err instanceof Error ? err.message : "failed");
    }
    try {
      const phoneNumberId = event.phoneNumberId || process.env.OPENPHONE_PHONE_NUMBER_ID || "";
      if (event.callId || event.conversationId || phoneNumberId) {
        const created = await createTask({
          title: taskTitle(lead),
          description: taskDescription(lead),
          activityId: event.callId.startsWith("AC") ? event.callId : undefined,
          conversationId: !event.callId.startsWith("AC") ? event.conversationId || undefined : undefined,
          phoneNumberId:
            !event.callId.startsWith("AC") && !event.conversationId ? phoneNumberId || undefined : undefined,
        });
        const data = created.data as { taskId?: string } | undefined;
        taskId = data?.taskId || "";
      }
    } catch (err) {
      console.error("[quo/webhook] task", err instanceof Error ? err.message : "failed");
    }
    return NextResponse.json({
      ok: true,
      handoff: true,
      lead_type: lead.lead_type,
      tags: lead.tags,
      telegram: notify.ok,
      taskId,
      contactOk,
      spanish: lead.jobs.includes(JOB_SPANISH),
      urgent: lead.jobs.includes(JOB_URGENT),
      quote: lead.jobs.includes(JOB_QUOTE) || lead.lead_type === JOB_UNKNOWN,
    });
  }

  if (event.type === "call.completed") {
    const missed = ["missed", "no-answer", "abandoned"].includes(event.callStatus);
    const gate = smsFollowUpAllowed({
      humanAnswered: event.humanAnswered,
      sonaCompleted: event.handledByAi,
      spamOrBlocked: false,
      optedOut: false,
      alreadySent: Boolean(event.callId && sentSms.has(event.callId)),
    });
    if (!missed || !gate.ok || !event.fromPhone) {
      return NextResponse.json({ ok: true, sms: gate.reason, missed });
    }
    try {
      await sendSms(event.fromPhone, MISSED_CALL_SMS);
      if (event.callId) sentSms.add(event.callId);
      return NextResponse.json({ ok: true, sms: "sent" });
    } catch (err) {
      console.error("[quo/webhook] sms", err instanceof Error ? err.message : "failed");
      return NextResponse.json({ ok: true, sms: "send_failed" });
    }
  }

  if (event.type.includes("message") && event.direction.includes("in")) {
    if (looksLikeOptOut(event.messageText)) {
      await sendTelegram(`STOP received from ${event.fromPhone || "unknown"} — no further SMS.`);
      return NextResponse.json({ ok: true, opt_out: true });
    }
    if (event.phoneNumberId && event.fromPhone) {
      try {
        const history = await listMessages(event.phoneNumberId, event.fromPhone);
        void history;
      } catch {
        /* ignore */
      }
    }
    return NextResponse.json({ ok: true, inbound_sms: true });
  }

  return NextResponse.json({ ok: true, ignored: event.type || "unknown" });
}
