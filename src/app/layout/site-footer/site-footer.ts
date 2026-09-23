import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { I18nService } from '../../core/i18n.service';
import { OFFICIAL_LINKS } from '../../core/links';
import { LeafMark } from '../../shared/leaf-mark/leaf-mark';

@Component({
  selector: 'app-site-footer',
  imports: [LeafMark, MatDividerModule],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
})
export class SiteFooter {
  readonly i18n = inject(I18nService);
  readonly links = OFFICIAL_LINKS;
}
