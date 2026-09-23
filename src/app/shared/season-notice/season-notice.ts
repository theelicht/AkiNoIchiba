import { Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { LeafMark } from '../leaf-mark/leaf-mark';

@Component({
  selector: 'app-season-notice',
  imports: [LeafMark],
  templateUrl: './season-notice.html',
  styleUrl: './season-notice.css',
})
export class SeasonNotice {
  readonly i18n = inject(I18nService);
}
