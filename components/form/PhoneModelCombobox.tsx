"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { PHONE_MODELS } from "@/lib/phone-models";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
};

export function PhoneModelCombobox({
  value,
  onChange,
  onBlur,
  error,
}: Props) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...PHONE_MODELS];
    return PHONE_MODELS.filter((m) => m.toLowerCase().includes(q));
  }, [query]);
  const hasExactMatch = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return false;
    return PHONE_MODELS.some((m) => m.toLowerCase() === q);
  }, [query]);
  const showCustomOption = query.trim().length > 0 && !hasExactMatch;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [close]);

  return (
    <div ref={rootRef} className="relative">
      <label className="mb-1.5 block text-xs font-medium text-slate-700">
        Phone model
      </label>
      <div className="relative">
        <motion.input
          whileFocus={{ scale: 1.005 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          className={cn(
            "min-h-12 w-full rounded-xl border bg-white py-3 pl-4 pr-11 text-base text-slate-900 outline-none ring-0 transition-[border,box-shadow] placeholder:text-slate-400 sm:min-h-0 sm:text-sm",
            error
              ? "border-rose-400 focus:border-rose-500"
              : "border-slate-300 focus:border-[var(--color-brand-pink)] focus:shadow-[0_0_0_3px_rgba(228,0,127,0.18)]",
          )}
          placeholder="Search e.g. iPhone 15, Galaxy S24…"
          value={query}
          onChange={(e) => {
            const nextValue = e.target.value;
            setQuery(nextValue);
            onChange(nextValue);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            onBlur();
          }}
        />
        <ChevronDown
          className={cn(
            "pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-transform duration-200",
            open && "rotate-180",
          )}
          strokeWidth={2.25}
          aria-hidden
        />
      </div>
      <AnimatePresence>
        {open && (filtered.length > 0 || showCustomOption) ? (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="absolute z-40 mt-2 max-h-52 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-xl"
          >
            {showCustomOption ? (
              <li>
                <button
                  type="button"
                  role="option"
                  aria-selected={value.trim().toLowerCase() === query.trim().toLowerCase()}
                  className="flex w-full border-b border-slate-100 px-3 py-2.5 text-left text-sm font-medium text-[var(--color-brand-pink)] hover:bg-pink-50"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    const selected = query.trim();
                    onChange(selected);
                    setQuery(selected);
                    close();
                  }}
                >
                  Use custom model: {query.trim()}
                </button>
              </li>
            ) : null}
            {filtered.slice(0, 80).map((m) => (
              <li key={m}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === m}
                  className="flex w-full px-3 py-2.5 text-left text-sm text-slate-800 hover:bg-slate-50"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(m);
                    setQuery(m);
                    close();
                  }}
                >
                  {m}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
      {error ? (
        <p className="mt-1.5 text-xs text-rose-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
