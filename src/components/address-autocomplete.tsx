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
      .filter((f) => !streetOnly || Boolean(f.address))
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
  /** Only offer numbered street addresses, and save street, city, state, ZIP. */
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
  streetOnly = false,
}: Props) {
  const reactId = useId();
  const listId = `${reactId}-list`;
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const debounceRef = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tokenRef = useRef(newToken());
  const fetchSeq = useRef(0);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

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
      setOpen(items.length > 0 && document.activeElement === inputRef.current);
      setActive(-1);
    } catch {
      /* plain typing still works */
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
    <div ref={wrapRef} className="address-input-wrap">
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="text"
        autoComplete={autoComplete}
        autoCorrect="off"
        autoCapitalize="words"
        spellCheck={false}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => {
          if (suggestions.length > 0) setOpen(true);
        }}
        onKeyDown={onKey}
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-controls={listId}
        aria-expanded={open}
        role="combobox"
      />
      {open && suggestions.length > 0 && (
        <ul id={listId} className="address-suggestions" role="listbox">
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
              <span className="addr-primary">{s.primary || s.full}</span>
              {s.secondary ? (
                <span className="addr-secondary">{s.secondary}</span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** @deprecated Prefer AddressAutocomplete — kept for older imports */
export { AddressAutocomplete as GoogleAddressInput };
