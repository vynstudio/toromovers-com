#!/usr/bin/env bash
# Pause losers in FS Mobile · Feed 4:5, keep m_feed_relax, optional UTM + junk retire.
# Default: dry run. Never prints the access token. Does not change budgets.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export ROOT
export TM_ADS_APPLY=0
export TM_ADS_RETIRE=0
for arg in "$@"; do
  case "$arg" in
    --apply) TM_ADS_APPLY=1 ;;
    --retire|--retire-junk) TM_ADS_RETIRE=1 ;;
    -h|--help)
      echo "Usage: $0 [--apply] [--retire]"
      echo "  (default)  list Feed 4:5 ads by name"
      echo "  --apply    PAUSE wrap/orlando/brand/family; keep m_feed_relax; set url_tags"
      echo "  --retire   delete stale .net custom conversions; try archive dead pixel"
      exit 0
      ;;
    *)
      echo "Unknown arg: $arg" >&2
      exit 2
      ;;
  esac
done

python3 - <<'PY'
from __future__ import annotations

import json
import os
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

GRAPH = os.environ.get("GRAPH", "https://graph.facebook.com/v22.0")
ACT = os.environ.get("ACT", "act_971361825561389")
PIXEL_LIVE = os.environ.get("PIXEL", "985575491098437")
PIXEL_DEAD = "1637703184084307"
ADSET_NEEDLE = "feed 4:5"
KEEP_NEEDLE = "m_feed_relax"
PAUSE_NEEDLES = ("m_feed_wrap", "m_feed_orlando", "m_feed_brand", "m_feed_family")
URL_TAGS = (
    "utm_source=facebook&utm_medium=paid"
    "&utm_campaign=tm_full_service_trust&utm_content=m_feed_relax"
)
JUNK_CC = ("TM-View-Pricing", "TM-Contact-Phone", "TM-Lead-Form")
APPLY = os.environ.get("TM_ADS_APPLY") == "1"
RETIRE = os.environ.get("TM_ADS_RETIRE") == "1"
ROOT = Path(os.environ.get("ROOT", ".")).resolve()


def load_token() -> tuple[str, str]:
    env = (os.environ.get("META_ACCESS_TOKEN") or "").strip()
    if env:
        return env, "env:META_ACCESS_TOKEN"
    # Prefer staging (currently valid) over expired .env.wire.
    for p in (
        Path("/Users/vynstudio/toromovers-site/.env.staging"),
        Path("/Users/vynstudio/toromovers-site/.env.wire"),
        ROOT / ".env.local",
        ROOT / ".env",
    ):
        if not p.exists():
            continue
        for line in p.read_text().splitlines():
            if line.startswith("META_ACCESS_TOKEN="):
                val = line.split("=", 1)[1].strip().strip("'\"")
                if val:
                    return val, str(p)
    raise SystemExit("No META_ACCESS_TOKEN in env, .env.staging, or .env.wire")


TOKEN, TOKEN_SRC = load_token()
UA = {"User-Agent": "toromovers-meta-ads-fix/1.0"}


def call(method: str, path: str, data: dict | None = None, params: dict | None = None):
    q = dict(params or {})
    if method == "GET":
        q["access_token"] = TOKEN
        url = f"{GRAPH}/{path}?{urllib.parse.urlencode(q)}"
        req = urllib.request.Request(url, headers=UA)
    else:
        body = dict(data or {})
        body["access_token"] = TOKEN
        url = f"{GRAPH}/{path}"
        if q:
            url += "?" + urllib.parse.urlencode(q)
        req = urllib.request.Request(
            url,
            data=urllib.parse.urlencode(body).encode(),
            headers={**UA, "Content-Type": "application/x-www-form-urlencoded"},
            method=method,
        )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            raw = r.read().decode()
            return r.status, json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        raw = e.read().decode(errors="ignore")
        try:
            payload = json.loads(raw)
        except json.JSONDecodeError:
            payload = {"error": {"message": raw[:400]}}
        return e.code, payload


def get_all(path: str, fields: str, limit: int = 200) -> list[dict]:
    out: list[dict] = []
    params: dict = {"fields": fields, "limit": str(limit)}
    while True:
        status, payload = call("GET", path, params=params)
        if status != 200:
            raise SystemExit(f"GET {path} failed {status}: {payload}")
        out.extend(payload.get("data") or [])
        nxt = ((payload.get("paging") or {}).get("next")) or ""
        if not nxt:
            break
        parsed = urllib.parse.urlparse(nxt)
        params = dict(urllib.parse.parse_qsl(parsed.query))
        # token already in next URL; strip so call() does not duplicate
        path_only = parsed.path.lstrip("/")
        # next URLs are absolute; extract after version
        parts = path_only.split("/", 2)
        path = parts[-1] if len(parts) >= 2 else path_only
        if "access_token" in params:
            del params["access_token"]
    return out


print(f"token_source={TOKEN_SRC} token_len={len(TOKEN)} prefix={TOKEN[:4]}…")
print(f"mode={'APPLY' if APPLY else 'DRY-RUN'} retire={'yes' if RETIRE else 'no'}")
print()

ads = get_all(
    f"{ACT}/ads",
    "id,name,status,effective_status,url_tags,campaign{name,id,effective_status},"
    "adset{name,id,effective_status,daily_budget},"
    "creative{id,body,object_story_spec}",
)
feed = [
    a
    for a in ads
    if ADSET_NEEDLE in ((a.get("adset") or {}).get("name") or "").lower()
]
print("=== FS Mobile · Feed 4:5 ===")
if not feed:
    raise SystemExit("No ads found in Feed 4:5")

keep = None
pause = []
other = []
for a in feed:
    name = a.get("name") or ""
    low = name.lower()
    row = {
        "id": a.get("id"),
        "name": name,
        "status": a.get("status"),
        "effective": a.get("effective_status"),
        "adset": (a.get("adset") or {}).get("name"),
        "adset_id": (a.get("adset") or {}).get("id"),
        "budget_cents": (a.get("adset") or {}).get("daily_budget"),
    }
    body = ((a.get("creative") or {}).get("body")) or ""
    link = (
        ((a.get("creative") or {}).get("object_story_spec") or {})
        .get("link_data", {})
        .get("link")
        or ""
    )
    row["body"] = body
    row["link"] = link
    if KEEP_NEEDLE in low:
        keep = a
        flag = "KEEP"
    elif any(n in low for n in PAUSE_NEEDLES):
        pause.append(a)
        flag = "PAUSE"
    else:
        other.append(a)
        flag = "OTHER"
    print(
        f"  [{flag:5}] {a.get('id')}  {a.get('status'):7} / {a.get('effective_status'):16}  {name}"
    )
    if body:
        print(f"           body: {body}")
    if link:
        print(f"           link: {link}")

if other:
    print("\nWARNING: extra ads in this ad set (not in wrap/orlando/brand/family/relax):")
    for a in other:
        print(f"  {a.get('id')} {a.get('name')}")

if not keep:
    raise SystemExit("m_feed_relax not found — aborting")

budget = (keep.get("adset") or {}).get("daily_budget")
print(f"\nkeep  {keep.get('id')}  {keep.get('name')}")
print(f"adset {(keep.get('adset') or {}).get('id')}  daily_budget_cents={budget} (unchanged)")
print(f"pause {len(pause)} ads: " + ", ".join((a.get("name") or "") for a in pause))

if APPLY:
    print("\n=== APPLY pause ===")
    for a in pause:
        if (a.get("status") or "").upper() == "PAUSED":
            print(f"  already PAUSED {a.get('id')} {a.get('name')}")
            continue
        status, payload = call("POST", a["id"], data={"status": "PAUSED"})
        ok = status == 200 and payload.get("success") is True
        print(f"  {'OK' if ok else 'FAIL'} PAUSED {a.get('id')} {a.get('name')} {payload}")
        if not ok:
            raise SystemExit(f"pause failed for {a.get('id')}")

    print("\n=== APPLY url_tags on m_feed_relax (no creative swap) ===")
    status, payload = call("POST", keep["id"], data={"url_tags": URL_TAGS})
    print(f"  HTTP {status} {payload}")
    if status != 200:
        print("  url_tags on ad failed — destination URL already has UTM query params.")
        print("  Not swapping creative. Primary text still contains .net (see body above).")

    print("\n=== VERIFY Feed 4:5 ===")
    ads2 = get_all(
        f"{ACT}/ads",
        "id,name,status,effective_status,adset{name,id,daily_budget}",
    )
    for a in ads2:
        aset = (a.get("adset") or {}).get("name") or ""
        if ADSET_NEEDLE not in aset.lower():
            continue
        print(
            f"  {a.get('status'):7} / {a.get('effective_status'):16}  {a.get('id')}  {a.get('name')}"
        )
    print(f"  daily_budget_cents={(keep.get('adset') or {}).get('daily_budget')} (not modified)")
else:
    print("\nDry run only. Re-run with --apply to PAUSE wrap/orlando/brand/family.")

if RETIRE:
    print("\n=== RETIRE custom conversions (.net, stale since April) ===")
    ccs = get_all(
        f"{ACT}/customconversions",
        "id,name,custom_event_type,pixel,rule,last_fired_time,is_unavailable",
        limit=100,
    )
    for cc in ccs:
        name = cc.get("name") or ""
        print(
            f"  cc {cc.get('id')} {name} pixel={(cc.get('pixel') or {}).get('id')} "
            f"last={cc.get('last_fired_time') or 'never'}"
        )
        if name not in JUNK_CC:
            continue
        status, payload = call("DELETE", cc["id"])
        print(f"    DELETE HTTP {status} {payload}")
        if status != 200:
            status2, payload2 = call("POST", cc["id"], data={"is_unavailable": "true"})
            print(f"    POST is_unavailable HTTP {status2} {payload2}")

    print(f"\n=== ARCHIVE dead pixel {PIXEL_DEAD} ===")
    pixels = get_all(f"{ACT}/adspixels", "id,name,is_unavailable,last_fired_time", limit=50)
    for p in pixels:
        print(
            f"  pixel {p.get('id')} {p.get('name')} unavailable={p.get('is_unavailable')} "
            f"last={p.get('last_fired_time')}"
        )
    status, payload = call("POST", PIXEL_DEAD, data={"is_unavailable": "true"})
    print(f"  POST is_unavailable HTTP {status} {payload}")
    if status != 200:
        status, payload = call("DELETE", PIXEL_DEAD)
        print(f"  DELETE HTTP {status} {payload}")
    print(f"  live pixel {PIXEL_LIVE} left untouched")
PY
