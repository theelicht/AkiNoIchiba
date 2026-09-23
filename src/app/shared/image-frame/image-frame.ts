import { Component, inject, input } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { LeafMark } from '../leaf-mark/leaf-mark';

@Component({
  selector: 'app-image-frame',
  imports: [LeafMark],
  host: { '[class.hero-frame]': 'hero()', '[class]': 'tone()' },
  templateUrl: './image-frame.html',
  styleUrl: './image-frame.css',
})
export class ImageFrame {
  readonly i18n = inject(I18nService);
  readonly label = input.required<string>();
  readonly src = input<string>();
  readonly alternateSrc = input<string>();
  readonly imagePosition = input('center');
  readonly alternatePosition = input('center');
  readonly hero = input(false);
  readonly tone = input('');
}
