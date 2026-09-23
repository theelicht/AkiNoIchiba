import { Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { I18nService } from '../../core/i18n.service';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-about',
  imports: [SectionHeading, MatChipsModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly i18n = inject(I18nService);
}
