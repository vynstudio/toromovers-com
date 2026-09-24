"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { isFullStreetAddress } from "@/lib/address-format";
import { PHONE_DISPLAY } from "@/lib/site";
import type { SelectedPlace } from "@/lib/selected-place";

export { isFullStreetAddress };

/**
 * Street autocomplete. Suggestions come from /api/address-suggest (Mapbox on
 * the server) so a URL-restricted token still works on toromovers.com.
 */

type SearchState = "idle" | "results" | "empty" | "down";

function viewportListen(place: () => void, remove = false) {
  const viewport = window.visualViewport;
  const method = remove ? "removeEventListener" : "addEventListener";
  viewport?.[method]("resize", place);
  viewport?.[method]("scroll", place);
  window[method]("scroll", place, true);
}

type Props = {
  value: string;
  onChange: (value: string) => void;
  /** Fired only when a suggestion is picked. Typing does not call this. */
  onSelect?: (place: SelectedPlace) => void;
  onSearchState?: (state: SearchState) => void;
  placeholder?: string;
  ariaLabel?: string;
  autoComplete?: string;
  name?: string;
  id?: string;
  className?: string;
  required?: boolean;
  /** Kept for older call sites. Suggestions are always street addresses. */
  streetOnly?: boolean;
};

export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  onSearchState,
  placeholder = "Start typing street…",
  ariaLabel,
  autoComplete = "off",
  name,
  id,
  className,
  required,
}: Props) {
  const reactId = useId();
  const listId = `${reactId}-list`;
  const [suggestions, setSuggestions] = useState<SelectedPlace[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [status, setStatus] = useState<SearchState>("idle");
  const [pickedLine, setPickedLine] = useState("");
  const debounceRef = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const fetchSeq = useRef(0);
  const onChangeRef = useRef(onChange);
  const onSelectRef = useRef(onSelect);
  const onSearchStateRef = useRef(onSearchState);
  useEffect(() => {
    onChangeRef.current = onChange;
    onSelectRef.current = onSelect;
    onSearchStateRef.current = onSearchState;
  });

  useEffect(() => {
    const onDocPointer = (event: Event) => {
      const target = event.target as Node | null;
      if (wrapRef.current && target && !wrapRef.current.contains(target)) {
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

  const setSearch = (next: SearchState) => {
    setStatus(next);
    onSearchStateRef.current?.(next);
  };

  const runFetch = async (query: string) => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      setSearch("idle");
      return;
    }
    const seq = ++fetchSeq.current;
    try {
      const res = await fetch(
        `/api/address-suggest?q=${encodeURIComponent(query.trim())}`,
      );
      if (seq !== fetchSeq.current) return;
      if (!res.ok) {
        setSuggestions([]);
        setOpen(false);
        setSearch("down");
        return;
      }
      const data = (await res.json()) as { suggestions?: SelectedPlace[] };
      const items = Array.isArray(data.suggestions) ? data.suggestions : [];
      setSuggestions(items);
      setActive(items.length ? 0 : -1);
      setOpen(items.length > 0);
      setSearch(items.length ? "results" : "empty");
      if (items.length) requestAnimationFrame(() => revealInput());
    } catch {
      if (seq !== fetchSeq.current) return;
      setSuggestions([]);
      setOpen(false);
      setSearch("down");
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

  const handleChange = (next: string) => {
    if (pickedLine && next !== pickedLine) setPickedLine("");
    onChangeRef.current(next);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      void runFetch(next);
    }, 220);
  };

  const select = (place: SelectedPlace) => {
    setPickedLine(place.line);
    onChangeRef.current(place.line);
    onSelectRef.current?.(place);
    setSuggestions([]);
    setOpen(false);
    setActive(-1);
    setSearch("idle");
    requestAnimationFrame(() => inputRef.current?.blur());
  };

  const onKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && open && suggestions.length > 0) {
      event.preventDefault();
      event.stopPropagation();
      const index = active >= 0 && active < suggestions.length ? active : 0;
      const pick = suggestions[index];
      if (pick) select(pick);
      return;
    }
    if (!open || suggestions.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => Math.min(current + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, 0));
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      setActive(-1);
    }
  };

  const hint =
    status === "down"
      ? `Address search is unavailable. Call ${PHONE_DISPLAY}.`
      : status === "empty"
        ? "No matching addresses. Keep the street number and name, then choose a suggestion."
        : status === "results" &&
            !open &&
            value !== pickedLine
          ? "Choose a suggestion — street, city, state, and ZIP."
          : "";

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
        onChange={(event) => handleChange(event.target.value)}
        onFocus={() => {
          if (suggestions.length > 0) setOpen(true);
          else if (value.trim().length >= 3) void runFetch(value);
        }}
        onKeyDown={onKey}
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-controls={listId}
        aria-expanded={open}
        role="combobox"
      />
      {hint ? (
        <p className={`addr-hint${status === "down" ? " is-error" : ""}`} role="status">
          {hint}
        </p>
      ) : null}
      {open && suggestions.length > 0 && (
        <ul ref={listRef} id={listId} className="address-suggestions" role="listbox">
          {suggestions.map((place, index) => (
            <li
              key={place.placeId}
              role="option"
              aria-selected={index === active}
              className={`address-suggestion${index === active ? " active" : ""}`}
              onPointerDown={(event) => {
                event.preventDefault();
                select(place);
              }}
            >
              <span className="addr-primary">{place.line}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** @deprecated Prefer AddressAutocomplete — kept for older imports */
export { AddressAutocomplete as GoogleAddressInput };
