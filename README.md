# 秋彩の朝市 · Autumn Morning Market

A Japanese-first Angular 22 / Angular Material concept page for 10 October 2026, 09:00–12:00 (Japan time).

## Run locally

```sh
npm install
npm start
```

Open http://localhost:4200. Use `npm run build` for a production build in `dist/Proposal/browser`, and `npm test -- --watch=false` for the focused Vitest suite.

## Content and language

Edit `public/i18n/ja.json` and `public/i18n/en.json`. All page copy, accessible labels, programme entries, market cards, admission information, and directions live here. Keep both files structurally identical; the tests check this, including array entries. The TypeScript translation schema is inferred from the Japanese dictionary.

Both dictionaries are loaded through HttpClient. Japanese is also bundled as an emergency fallback, so a failed initial request does not leave a blank page. Missing or incorrectly typed English values fall back individually to Japanese; a failed English request switches the whole page back to Japanese. The most recent language selection wins if requests finish out of order.

Every new visit starts in Japanese as requested. An explicit selection is stored under `autumn-market-locale` for reference, but intentionally is not restored on reload. Language changes update the document language, title, description and official links without navigation.

## Components and styling

- `src/app/sections`: hero, introduction, market, programme, admission and access sections.
- `src/app/shared`: reusable image frames, section headings, market/access cards and leaf decoration.
- `src/app/layout`: sticky header, language selector and footer.
- `src/styles.scss`: Material theme, autumn colours, typography, focus styles and reduced-motion handling.

Each component has its own directory containing matching `.ts`, `.html`, and `.css` files (for example, `src/app/sections/hero/hero.ts`, `hero.html`, and `hero.css`). The root component and page integration tests live in `src/app/app/`. Component decorators reference external templates and styles; shared theme styles remain in `src/styles.scss`.

The reusable image frame renders local photography or a localized placeholder, supports per-image focal points, and can crossfade between two hero images. Current photos live in `public/images`: the hero cycles between the two supplied Shinjuku Gyoen photographs; food and ceramics use the supplied image candidates; and tea and garden sketching use locally stored Pexels photographs. Photo source pages: [tea and wagashi](https://www.pexels.com/photo/traditional-japanese-tea-and-sweet-on-tatami-mat-32330102/) by Viridiana Rivera and [garden sketching](https://www.pexels.com/photo/person-drawing-an-artwork-7859134/) by Greta Hoffman. The hero remains static when the visitor requests reduced motion.

Material 22 includes native component animations; no deprecated Angular animations provider is needed. The reduced-motion stylesheet suppresses animations and smooth scrolling when requested by the operating system. System fonts avoid external font requests.

## Visitor information

Garden information was checked on 23 September 2026 against the Ministry of the Environment's admission and access pages. Links are centralized in `src/app/core/links.ts`. Recheck official fees, operating hours and station exits before sharing the page.

The event is fictional. The translated footer contains the agreed concept disclosure and non-affiliation notice. There is no booking flow, payment collection or backend. No hosting or deployment is configured.
