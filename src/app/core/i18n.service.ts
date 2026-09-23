import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import japanese from '../../../public/i18n/ja.json';

export type Locale = 'ja' | 'en';
export type Translations = typeof japanese;
export type MarketItem = Translations['market']['items'][number];
export type Gate = Translations['access']['gates'][number];

/** Missing or incorrectly typed values fall back individually to Japanese. */
export function withFallback<T>(fallback: T, value: unknown): T {
  if (typeof fallback === 'string')
    return (typeof value === 'string' && value.length ? value : fallback) as T;
  if (Array.isArray(fallback)) {
    return fallback.map((entry, index) =>
      withFallback(entry, Array.isArray(value) ? value[index] : undefined),
    ) as T;
  }
  if (fallback && typeof fallback === 'object') {
    const source = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
    return Object.fromEntries(
      Object.entries(fallback).map(([key, entry]) => [key, withFallback(entry, source[key])]),
    ) as T;
  }
  return fallback;
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private requestId = 0;
  private japanese: Translations = japanese;
  readonly locale = signal<Locale>('ja');
  readonly text = signal<Translations>(japanese);
  readonly loading = signal(false);

  async initialize(): Promise<void> {
    // Each new visit starts in Japanese, regardless of browser or saved preference.
    await this.load('ja', false);
  }

  select(locale: Locale): Promise<void> {
    return this.load(locale, true);
  }

  private async load(locale: Locale, persist: boolean): Promise<void> {
    const requestId = ++this.requestId;
    this.loading.set(true);
    let selected = locale;
    let text: Translations;
    try {
      const result = await firstValueFrom(this.http.get<unknown>(`i18n/${locale}.json`));
      text = withFallback(this.japanese, result);
      if (locale === 'ja') this.japanese = text;
    } catch {
      selected = 'ja';
      text = this.japanese;

    }
    if (requestId !== this.requestId) return;
    this.text.set(text);
    this.locale.set(selected);
    this.document.documentElement.lang = selected;
    this.title.setTitle(text.meta.title);
    this.meta.updateTag({ name: 'description', content: text.meta.description });
    this.loading.set(false);
    if (persist) {
      try {
        this.document.defaultView?.localStorage.setItem('autumn-market-locale', selected);
      } catch {
        /* Storage may be unavailable. */
      }
    }
  }
}
