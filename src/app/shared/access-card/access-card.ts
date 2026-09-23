import { Component, input } from '@angular/core';
import { Gate } from '../../core/i18n.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-access-card',
  imports: [MatCardModule],
  templateUrl: './access-card.html',
  styleUrl: './access-card.css',
})
export class AccessCard {
  readonly gate = input.required<Gate>();
}
