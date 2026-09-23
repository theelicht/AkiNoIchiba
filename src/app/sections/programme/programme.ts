import { Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-programme',
  imports: [SectionHeading],
  templateUrl: './programme.html',
  styleUrl: './programme.css',
})
export class Programme {
  readonly i18n = inject(I18nService);
}
