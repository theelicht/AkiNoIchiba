import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { I18nService, Translations, withFallback } from './i18n.service';
import ja from '../../../public/i18n/ja.json';
import en from '../../../public/i18n/en.json';

const english: Translations = en;

describe('Runtime translations', () => {
  let service: I18nService;
  let http: HttpTestingController;
  let storage: Map<string, string>;
  let storageDescriptor: PropertyDescriptor | undefined;
  beforeEach(() => {
    TestBed.resetTestingModule();
    storage = new Map();
    storageDescriptor = Object.getOwnPropertyDescriptor(document.defaultView!, 'localStorage');
    Object.defineProperty(document.defaultView!, 'localStorage', {
      configurable: true,
      value: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
      },
    });
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(I18nService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    http.verify();
    if (storageDescriptor)
      Object.defineProperty(document.defaultView!, 'localStorage', storageDescriptor);
    TestBed.resetTestingModule();
  });

  it('starts in Japanese even when English was previously selected', async () => {
    storage.set('autumn-market-locale', 'en');
    const initialized = service.initialize();
    http.expectOne('i18n/ja.json').flush(ja);
    await initialized;
    expect(service.locale()).toBe('ja');
    expect(document.documentElement.lang).toBe('ja');
    expect(document.title).toBe(ja.meta.title);
  });

  it('loads English, records the choice, and updates page metadata', async () => {
    const selected = service.select('en');
    http.expectOne('i18n/en.json').flush(english);
    await selected;
    expect(service.text().hero.titleFirst).toBe(en.hero.titleFirst);
    expect(service.locale()).toBe('en');
    expect(storage.get('autumn-market-locale')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toBe(en.meta.title);
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      en.meta.description,
    );
  });

  it('falls back to Japanese when an English request fails', async () => {
    const selected = service.select('en');
    http.expectOne('i18n/en.json').flush('Unavailable', { status: 503, statusText: 'Unavailable' });
    await selected;
    expect(service.locale()).toBe('ja');
    expect(service.text()).toEqual(ja);
    expect(service.loading()).toBe(false);
  });

  it('can render the bundled Japanese dictionary when the initial request fails', async () => {
    const initialized = service.initialize();
    http.expectOne('i18n/ja.json').error(new ProgressEvent('error'));
    await initialized;
    expect(service.text().footer.copyright).toBe(ja.footer.copyright);
    expect(service.loading()).toBe(false);
  });

  it('keeps the latest choice when responses arrive out of order', async () => {
    const first = service.select('en');
    const second = service.select('ja');
    http.expectOne('i18n/ja.json').flush(ja);
    await second;
    http.expectOne('i18n/en.json').flush(en);
    await first;
    expect(service.locale()).toBe('ja');
    expect(service.text().meta.title).toBe(ja.meta.title);
  });

  it('falls back for missing and invalid keys, including nested card fields', () => {
    const partial = withFallback(ja, {
      hero: { titleFirst: en.hero.titleFirst, time: 123 },
      market: { items: [{ title: 'Test card' }] },
    });
    expect(partial.hero.titleFirst).toBe(en.hero.titleFirst);
    expect(partial.hero.time).toBe(ja.hero.time);
    expect(partial.market.items[0].title).toBe('Test card');
    expect(partial.market.items[0].description).toBe(ja.market.items[0].description);
    expect(partial.market.items.length).toBe(4);
    expect(partial.footer.copyright).toBe(ja.footer.copyright);
  });

  it('ships identical nonempty dictionary structures in both languages', () => {
    function shape(value: unknown): unknown {
      if (Array.isArray(value)) return value.map(shape);
      if (value && typeof value === 'object')
        return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, shape(entry)]));
      expect(typeof value).toBe('string');
      expect((value as string).trim().length).toBeGreaterThan(0);
      return typeof value;
    }
    expect(shape(en)).toEqual(shape(ja));
  });
});
