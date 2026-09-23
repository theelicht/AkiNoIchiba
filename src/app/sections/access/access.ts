import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { I18nService } from '../../core/i18n.service';
import { OFFICIAL_LINKS } from '../../core/links';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { AccessCard } from '../../shared/access-card/access-card';
import { LeafMark } from '../../shared/leaf-mark/leaf-mark';

@Component({
  selector: 'app-access',
  imports: [SectionHeading, AccessCard, MatButtonModule, LeafMark],
  templateUrl: './access.html',
  styleUrl: './access.css',
})
export class Access {
  readonly i18n = inject(I18nService);
  readonly links = OFFICIAL_LINKS;
}
