import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MarketItem } from '../../core/i18n.service';
import { ImageFrame } from '../image-frame/image-frame';

@Component({
  selector: 'app-market-card',
  imports: [MatCardModule, ImageFrame],
  templateUrl: './market-card.html',
  styleUrl: './market-card.css',
})
export class MarketCard {
  readonly item = input.required<MarketItem>();
  readonly imageSrc = input<string>();
  readonly imagePosition = input('center');
  readonly tone = input('');
}
