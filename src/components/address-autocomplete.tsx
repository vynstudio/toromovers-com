"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import {
  formatMapboxAddress,
  isFullStreetAddress,
  stripCountry,
  type MapboxFeature,
} from "@/lib/address-format";

export { isFullStreetAddress };

/**
 * Address autocomplete — Mapbox first (NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN),
 * Google Places New fallback (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY).
 */

const MAPBOX = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const GOOGLE = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const CFL = { lng: -81.3792, lat: 28.5383 };

type Suggestion = {
  id: string;
  primary: string;
  secondary: string;
  /** Complete line saved when the person picks this suggestion. */
  full: string;
  source: "mapbox" | "google";
  placeId?: string;
};

async function mapboxSuggest(
  input: string,
  streetOnly: boolean,
): Promise<Suggestion[]> {
  if (!MAPBOX || input.trim().length < 3) return [];
  const q = encodeURIComponent(input.trim());
  const types = streetOnly
    ? "address"
    : "address,place,locality,neighborhood,postcode";
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json` +
    `?access_token=${MAPBOX}` +
    `&country=us` +
    `&proximity=${CFL.lng},${CFL.lat}` +
    `&types=${types}` +
    `&autocomplete=true` +
    `&limit=6`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = (await res.json()) as { features?: MapboxFeature[] };
    return (data.features ?? [])
      .filter((f) => {
        if (!streetOnly) return true;
        if (f.address) return true;
        return /\d/.test(f.place_name || "");
      })
      .map((f, i) => {
        const full = formatMapboxAddress(f);
        const primary =
          [f.address, f.text].filter(Boolean).join(" ") ||
          full.split(",")[0] ||
          full;
        const secondary = full.includes(",")
          ? full.slice(full.indexOf(",") + 1).trim()
          : (f.context || []).map((c) => c.text).filter(Boolean).join(", ");
        return {
          id: f.id || `mb-${i}-${full}`,
          primary,
          secondary,
          full,
          source: "mapbox" as const,
        };
      })
      .filter((s) => s.full);
  } catch {
    return [];
  }
}

async function googleFormatted(
  placeId: string,
  sessionToken: string,
): Promise<string | null> {
  if (!GOOGLE || !placeId) return null;
  const id = placeId.replace(/^places\//, "");
  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(id)}?sessionToken=${encodeURIComponent(sessionToken)}`,
      {
        headers: {
          "X-Goog-Api-Key": GOOGLE,
          "X-Goog-FieldMask": "formattedAddress,addressComponents",
        },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      formattedAddress?: string;
      addressComponents?: {
        longText?: string;
        shortText?: string;
        types?: string[];
      }[];
    };
    const parts = data.addressComponents || [];
    const text = (type: string, short = false) => {
      const hit = parts.find((part) => part.types?.includes(type));
      return (short ? hit?.shortText : hit?.longText) || "";
    };
    const line1 = [text("street_number"), text("route")].filter(Boolean).join(" ");
    const city = text("locality") || text("postal_town") || text("sublocality");
    const state = text("administrative_area_level_1", true);
    const zip = text("postal_code");
    const built = [
      line1,
      [city, [state, zip].filter(Boolean).join(" ")].filter(Boolean).join(", "),
    ]
      .filter(Boolean)
      .join(", ");
    if (line1 && city && zip) return built;
    return stripCountry(data.formattedAddress || built);
  } catch {
    return null;
  }
}

async function googleSuggest(
  input: string,
  sessionToken: string,
  streetOnly: boolean,
): Promise<Suggestion[]> {
  if (!GOOGLE || input.trim().length < 2) return [];

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": GOOGLE,
    "X-Goog-FieldMask":
      "suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat",
  };
  const bodyBase = {
    input,
    sessionToken,
    includedRegionCodes: ["us"] as string[],
    locationBias: {
      circle: {
        center: { latitude: CFL.lat, longitude: CFL.lng },
        radius: 50000,
      },
    },
  };

  try {
    let res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...bodyBase,
        includedPrimaryTypes: streetOnly
          ? ["street_address", "premise", "subpremise"]
          : ["street_address", "premise", "subpremise", "route"],
      }),
    });
    if (!res.ok) {
      res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
        method: "POST",
        headers,
        body: JSON.stringify(bodyBase),
      });
    }
    if (!res.ok) return [];
    const data = (await res.json()) as {
      suggestions?: {
        placePrediction?: {
          placeId?: string;
          text?: { text?: string };
          structuredFormat?: {
            mainText?: { text?: string };
            secondaryText?: { text?: string };
          };
        };
      }[];
    };
    return (data.suggestions ?? [])
      .map((s) => s.placePrediction)
      .filter((p): p is NonNullable<typeof p> => p != null)
      .map((p) => ({
        id: p.placeId || p.text?.text || Math.random().toString(36),
        primary:
          p.structuredFormat?.mainText?.text ?? p.text?.text ?? "",
        secondary: p.structuredFormat?.secondaryText?.text ?? "",
        full: stripCountry(p.text?.text ?? ""),
        source: "google" as const,
        placeId: p.placeId,
      }))
      .filter((s) => s.full || s.primary);
  } catch {
    return [];
  }
}

async function fetchSuggestions(
  input: string,
  sessionToken: string,
  streetOnly: boolean,
): Promise<Suggestion[]> {
  // Prefer Mapbox when configured
  if (MAPBOX) {
    const mb = await mapboxSuggest(input, streetOnly);
    if (mb.length) return mb;
  }
  if (GOOGLE) {
    return googleSuggest(input, sessionToken, streetOnly);
  }
  return [];
}

function viewportListen(place: () => void, remove = false) {
  const viewport = window.visualViewport;
  const method = remove ? "removeEventListener" : "addEventListener";
  viewport?.[method]("resize", place);
  viewport?.[method]("scroll", place);
  window[method]("scroll", place, true);
}

function newToken(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  autoComplete?: string;
  name?: string;
  id?: string;
  className?: string;
  required?: boolean;
  /**
   * Only offer numbered street addresses, and save street, city, state, ZIP.
   * On by default so every address field captures a full address.
   */
  streetOnly?: boolean;
};

export function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Start typing street…",
  ariaLabel,
  autoComplete = "off",
  name,
  id,
  className,
  required,
  streetOnly = true,
}: Props) {
  const reactId = useId();
  const listId = `${reactId}-list`;
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const debounceRef = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const tokenRef = useRef(newToken());
  const fetchSeq = useRef(0);
  const focusedRef = useRef(false);
  const blurTimer = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    const onDocPointer = (e: Event) => {
      const t = e.target as Node | null;
      if (wrapRef.current && t && !wrapRef.current.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDocPointer, true);
    return () => document.removeEventListener("pointerdown", onDocPointer, true);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, []);

  const runFetch = async (query: string) => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const seq = ++fetchSeq.current;
    try {
      const items = await fetchSuggestions(
        query,
        tokenRef.current,
        streetOnly,
      );
      if (seq !== fetchSeq.current) return;
      setSuggestions(items);
      if (blurTimer.current) {
        window.clearTimeout(blurTimer.current);
        blurTimer.current = null;
      }
      setOpen(items.length > 0 && focusedRef.current);
      setActive(-1);
      if (items.length > 0 && focusedRef.current) {
        requestAnimationFrame(() => revealInput());
      }
    } catch {
      /* plain typing still works */
    }
  };

  useEffect(() => {
    if (!open) return;
    const place = () => {
      const input = inputRef.current;
      const list = listRef.current;
      const viewport = window.visualViewport;
      if (!input || !list || !viewport || window.innerWidth > 699) {
        if (list) list.removeAttribute("style");
        return;
      }
      const rect = input.getBoundingClientRect();
      const below = viewport.height - rect.bottom;
      list.style.position = "fixed";
      list.style.left = "12px";
      list.style.right = "12px";
      list.style.zIndex = "80";
      list.style.margin = "0";
      if (below >= 140) {
        list.style.top = `${rect.bottom + 4}px`;
        list.style.bottom = "auto";
        list.style.maxHeight = `${Math.min(240, below - 8)}px`;
      } else {
        list.style.top = "auto";
        list.style.bottom = `${viewport.height - rect.top + 4}px`;
        list.style.maxHeight = `${Math.min(240, Math.max(120, rect.top - 8))}px`;
      }
    };
    place();
    viewportListen(place);
    return () => viewportListen(place, true);
  }, [open, suggestions]);

  const revealInput = () => {
    const input = inputRef.current;
    const viewport = window.visualViewport;
    if (!input || !viewport) return;
    const rect = input.getBoundingClientRect();
    const topGap = 96;
    if (rect.top < topGap || rect.bottom > viewport.height - 180) {
      window.scrollBy({ top: rect.top - topGap, behavior: "auto" });
    }
  };

  const handleChange = (v: string) => {
    onChangeRef.current(v);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      void runFetch(v);
    }, 220);
  };

  const selectSeq = useRef(0);

  const select = (s: Suggestion) => {
    const seq = ++selectSeq.current;
    const apply = (full: string) => {
      if (seq !== selectSeq.current) return;
      onChangeRef.current(full);
      setSuggestions([]);
      setOpen(false);
      setActive(-1);
    };
    apply(s.full || s.primary);
    const token = tokenRef.current;
    tokenRef.current = newToken();
    if (s.source === "google" && s.placeId) {
      void googleFormatted(s.placeId, token).then((resolved) => {
        if (resolved) apply(resolved);
      });
    }
    requestAnimationFrame(() => inputRef.current?.blur());
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (open && suggestions.length > 0) {
        e.preventDefault();
        e.stopPropagation();
        if (active >= 0 && active < suggestions.length) {
          select(suggestions[active]);
        } else if (suggestions[0]) {
          select(suggestions[0]);
        }
        return;
      }
      return;
    }
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setActive(-1);
    }
  };

  return (
    <div ref={wrapRef} className={`address-input-wrap${open ? " is-open" : ""}`}>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="text"
        required={required}
        autoComplete={autoComplete}
        autoCorrect="off"
        autoCapitalize="words"
        spellCheck={false}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => {
          focusedRef.current = true;
          if (suggestions.length > 0) setOpen(true);
        }}
        onBlur={() => {
          if (blurTimer.current) window.clearTimeout(blurTimer.current);
          blurTimer.current = window.setTimeout(() => {
            focusedRef.current = false;
            setOpen(false);
          }, 400);
        }}
        onKeyDown={onKey}
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-controls={listId}
        aria-expanded={open}
        role="combobox"
      />
      {open && suggestions.length > 0 && (
        <ul ref={listRef} id={listId} className="address-suggestions" role="listbox">
          {suggestions.map((s, i) => (
            <li
              key={s.id}
              role="option"
              aria-selected={i === active}
              className={`address-suggestion${i === active ? " active" : ""}`}
              onPointerDown={(e) => {
                e.preventDefault();
                select(s);
              }}
              onMouseEnter={() => setActive(i)}
            >
              <span className="addr-primary">{s.full || s.primary}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** @deprecated Prefer AddressAutocomplete — kept for older imports */
export { AddressAutocomplete as GoogleAddressInput };
