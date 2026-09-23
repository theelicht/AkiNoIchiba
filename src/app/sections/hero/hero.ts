import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { I18nService } from '../../core/i18n.service';
import { ImageFrame } from '../../shared/image-frame/image-frame';
import { LeafMark } from '../../shared/leaf-mark/leaf-mark';

@Component({
  selector: 'app-hero',
  imports: [MatButtonModule, ImageFrame, LeafMark],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  readonly i18n = inject(I18nService);
}
