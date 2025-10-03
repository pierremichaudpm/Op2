"use client";
import React, { createContext, useContext, useMemo } from 'react';

export type SupportedLocale = 'fr' | 'en';

export type Dictionary = { [key: string]: string | Dictionary | any };

type I18nContextValue = {
  locale: SupportedLocale;
  t: (key: string) => string;
  dict: any;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  dict,
  children
}: {
  locale: SupportedLocale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const flat = useMemo(() => flattenDict(dict), [dict]);
  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t: (key: string) => flat[key] ?? key,
      dict
    }),
    [locale, flat, dict]
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

function flattenDict(input: Dictionary, parentKey = ''): Record<string, string> {
  const out: Record<string, string> = {};
  Object.entries(input).forEach(([key, value]) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === 'string') {
      out[newKey] = value;
    } else if (value && typeof value === 'object') {
      Object.assign(out, flattenDict(value as Dictionary, newKey));
    }
  });
  return out;
}


