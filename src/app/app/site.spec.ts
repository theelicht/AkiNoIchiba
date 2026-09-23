import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { App } from './app';
import { I18nService } from '../core/i18n.service';
import ja from '../../../public/i18n/ja.json';
import en from '../../../public/i18n/en.json';

describe('Autumn market page', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }),
  );

  it('renders the date, programme, admission, photography, and disclosure in Japanese', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain(ja.hero.titleFirst);
    expect(page.querySelector('app-season-notice')?.textContent).toContain(ja.seasonNotice.body);
    expect(page.textContent).toContain('2026年10月10日');
    expect(page.textContent).toContain('09:00 — 12:00');
    expect(page.querySelectorAll('app-market-card').length).toBe(4);
    expect(page.querySelectorAll('app-access-card').length).toBe(3);
    expect(page.querySelectorAll('app-image-frame').length).toBe(5);
    expect(page.querySelectorAll('app-image-frame img').length).toBe(6);
    expect(page.querySelectorAll('app-image-frame .placeholder').length).toBe(0);
    expect(page.querySelector<HTMLImageElement>('app-hero img')?.getAttribute('src')).toBe(
      'images/shinjuku-gyoen-autumn.jpg',
    );
    expect(
      page.querySelector<HTMLImageElement>('app-hero img.photo-alternate')?.getAttribute('src'),
    ).toBe('images/shinjuku-kimono-gingko.webp');
    expect(
      page.querySelector<HTMLImageElement>('app-market-card img[src$="tea-and-wagashi.jpg"]')?.style
        .objectPosition,
    ).toBe('center 72%');
    for (const price of ja.visit.prices)
      expect(page.querySelector('.prices')?.textContent).toContain(price.price);
    expect(page.querySelector('footer')?.textContent).toContain(ja.footer.copyright);
    expect(page.querySelector('mat-button-toggle-group')?.getAttribute('aria-label')).toBe(
      ja.a11y.language,
    );
    for (const anchor of Array.from(page.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))) {
      expect(page.querySelector(anchor.getAttribute('href')!)).not.toBeNull();
    }
  });

  it('switches all sections and official links through the language control', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    page.querySelector<HTMLButtonElement>('mat-button-toggle[value="en"] button')!.click();
    TestBed.inject(HttpTestingController).expectOne('i18n/en.json').flush(en);
    await fixture.whenStable();
    expect(TestBed.inject(I18nService).locale()).toBe('en');
    expect(page.querySelector('h1')?.textContent).toContain(en.hero.titleFirst);
    expect(page.querySelector('app-season-notice')?.textContent).toContain(en.seasonNotice.body);
    expect(page.querySelector('app-market-card')?.textContent).toContain(en.market.items[0].title);
    expect(page.querySelector('app-access-card')?.textContent).toContain(en.access.gates[0].name);
    expect(page.querySelector('footer')?.textContent).toContain(en.footer.copyright);
    expect(page.querySelector('.prices')?.textContent).toContain('¥500');
    expect(page.querySelector('mat-button-toggle-group')?.getAttribute('aria-label')).toBe(
      en.a11y.language,
    );
    expect(page.querySelector('a[href$="english/guide/information/"]')).not.toBeNull();
    TestBed.inject(HttpTestingController).verify();
  });
});
