import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.css',
})
export class SectionHeading {
  readonly number = input.required<string>();
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly intro = input('');
  readonly headingId = input.required<string>();
}
