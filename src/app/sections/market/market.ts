import { Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { MarketCard } from '../../shared/market-card/market-card';

@Component({
  selector: 'app-market',
  imports: [SectionHeading, MarketCard],
  templateUrl: './market.html',
  styleUrl: './market.css',
})
export class Market {
  readonly i18n = inject(I18nService);
  readonly tones = ['clay', 'rose', 'sage', ''];
  readonly images: Record<string, string | undefined> = {
    food: 'images/autumn-sweet-snacks.jpg',
    craft: 'images/handmade-ceramics.jpg',
    tea: 'images/tea-and-wagashi.jpg',
    garden: 'images/garden-sketching.jpg',
  };
  readonly imagePositions: Record<string, string> = {
    tea: 'center 72%',
  };
}
