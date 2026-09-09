# Toro Movers after-hours Sona (Quo / OpenPhone)

Public number: **(689) 600-2720** (`+16896002720`)
Website: https://toromovers.com

**Live on inbox `PN3sKfvpYp`.** IDs: `live-ids.json`. Screenshot: `published-call-flow.png`.

Forward-all to `+13217580094` (Sabina’s 321 number) is **disabled**. After-hours and missed calls go to Sona, then voicemail — not a person.

Sona now collects only **first name, last name, phone number, and the service they need or a short message**.

Missed-call SMS job exists (`AJDf6cd93d5121d4819b35a75d44b1e76f6`) but is **not attached** until compliance is approved.

## What the public API can and cannot do

Quo’s public API (`https://api.openphone.com` / `https://api.quo.com`) can:

- List users and phone numbers
- Create contacts and tasks
- Send SMS
- Subscribe to `call.summary.completed`, `call.completed`, and `message.received`

It **cannot** create Sona jobs, knowledge pages, greetings, or publish a call flow. Those live in the Quo app:

**Settings → Phone numbers → (689) 600-2720 → Call flow**

Paste the files in this folder into that UI, then test in **Test Sona** before publishing.

## Call flow to build in the UI

```text
Incoming call
→ Business hours?
    yes → Ring available team members (do not use Sabina as the after-hours fallback)
    no  → Sona after-hours step
            greeting = docs/quo-sona/jobs.json → greeting
            knowledge = Toro Movers — After-Hours Knowledge Base
            jobs = the five enabled jobs (Missed Call Follow-Up stays OFF)
            fallback = end call / take a message
                       NOT “Forward call → Sabina Bender”
```

Do not automatically forward every after-hours call to a person.

## Sona greeting

Use the exact string in `jobs.json` (`greeting`). Remove any greeting that mentions “Sharon.”

## Knowledge

Upload `knowledge-base.md` as a Sona knowledge page named:

`Toro Movers — After-Hours Knowledge Base`

Share it with the after-hours Sona step only after it is saved.

## Jobs

Create each object in `jobs.json`. Leave **Missed Call Follow-Up** disabled until SMS consent, opt-out, quiet hours, and platform rules are approved in writing.

## Website handoff (this repo)

`POST /api/quo/webhook` turns Sona summaries into:

- a Telegram team alert
- a Quo task with the structured lead fields
- a Quo contact when a name or phone is present

Missed-call SMS from this webhook stays off unless `OPENPHONE_MISSED_CALL_SMS=true`.

Do not deploy this until the owner approves a production build.
