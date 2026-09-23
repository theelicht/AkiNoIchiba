import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { I18nService } from '../../core/i18n.service';
import { OFFICIAL_LINKS } from '../../core/links';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-visitor-info',
  imports: [SectionHeading, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './visitor-info.html',
  styleUrl: './visitor-info.css',
})
export class VisitorInfo {
  readonly i18n = inject(I18nService);
  readonly links = OFFICIAL_LINKS;
}
