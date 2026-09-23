import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { I18nService, Locale } from '../../core/i18n.service';
import { LeafMark } from '../../shared/leaf-mark/leaf-mark';

@Component({
  selector: 'app-site-header',
  imports: [MatToolbarModule, MatButtonToggleModule, MatTooltipModule, LeafMark],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
})
export class SiteHeader {
  readonly i18n = inject(I18nService);
  changeLanguage(locale: Locale): void {
    void this.i18n.select(locale);
  }
}
