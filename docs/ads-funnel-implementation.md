# Toro Movers universal ads funnel

## Routes

- `/lp/local-movers`: first paid-traffic landing page
- `/thank-you`: successful-submission confirmation page

## Form services

- `full_service_move`
- `labor_only`
- `same_building_move`
- `special_item_move`
- `pod_storage_container`
- `rental_truck_labor`
- `single_item_move`

## Lead payload

The funnel sends POST `/api/lead` with this API-ready shape:

```json
{
  "service_type": "full_service_move",
  "service_label": "Full-Service Move",
  "service_details": {
    "primary_detail": "2 bedrooms",
    "move_date": "YYYY-MM-DD",
    "origin": "Address or ZIP",
    "destination": "Address or ZIP",
    "access_conditions": "Stairs",
    "notes": "Optional customer notes"
  },
  "contact": {
    "full_name": "Customer name",
    "email": "customer@example.com",
    "phone_e164": "+13217580094",
    "sms_call_consent": true
  },
  "attribution": {
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "fl_local_moving_search",
    "gclid": "..."
  },
  "form_location": "local_movers_ads_landing"
}
```

The current `src/app/api/lead/route.ts` remains unchanged in this foundation commit. Before routing this payload to a CRM, update the endpoint to validate the nested payload server-side, persist a generated `lead_id`, and return `{ "lead_id": "..." }` only after success.

## Tracking events

Browser events are sent through `window.dataLayer` with no raw name, phone, email, or address data:

- `form_start`
- `service_type_selected`
- `form_step_complete`
- `generate_lead`

Configure GTM, GA4, Google Ads, and Meta browser/server events so `generate_lead` is counted only after a successful API response. When a server-side lead ID exists, use it as the matching Meta browser `eventID` and Conversions API `event_id`.

## Attribution

First/last-touch attribution is stored in `sessionStorage` using `toro_ads_attribution_v1`. Stored values include standard UTM parameters plus Google, Meta, Microsoft, and TikTok click identifiers. Server-side validation and persistence are required before production ad launch.

## QA before launch

1. Confirm all seven services proceed through the form.
2. Verify typed and pasted phone numbers retain original digit order and submit in E.164 form.
3. Confirm a successful `/api/lead` response redirects to `/thank-you` once.
4. Verify invalid contact data never submits.
5. Verify UTM and click IDs survive the complete form session.
6. Confirm `generate_lead` fires once only after a verified server success.
7. Test Chrome desktop, iPhone Safari, and Android Chrome.
8. Add consent-aware GTM/Meta/Google configuration and server-side lead storage before paid traffic goes live.
