import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { I18nService } from '../../core/i18n.service';
import { LeafMark } from '../../shared/leaf-mark/leaf-mark';

@Component({
  selector: 'app-vendor-page',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    LeafMark,
  ],
  templateUrl: './vendor-page.html',
  styleUrl: './vendor-page.css',
})
export class VendorPage {
  readonly i18n = inject(I18nService);
  readonly submitted = signal(false);
  readonly form = new FormGroup({
    business: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    contact: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    offering: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    note: new FormControl('', { nonNullable: true }),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.set(true);
  }

  startAnother(): void {
    this.form.reset();
    this.submitted.set(false);
  }
}
