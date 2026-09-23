import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { VendorPage } from './vendor-page';
import ja from '../../../../public/i18n/ja.json';

describe('VendorPage', () => {
  it('shows the local-only form and confirmation state', () => {
    TestBed.configureTestingModule({
      imports: [VendorPage],
      providers: [provideHttpClient()],
    });
    const fixture = TestBed.createComponent(VendorPage);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.textContent).toContain(ja.vendor.conceptNote);
    expect(page.querySelector('form')).not.toBeNull();

    const component = fixture.componentInstance;
    component.form.setValue({
      business: 'Test shop',
      contact: 'Test person',
      email: 'test@example.jp',
      offering: 'Test offerings',
      note: '',
    });
    component.submit();
    fixture.detectChanges();

    expect(page.querySelector('form')).toBeNull();
    expect(page.textContent).toContain(ja.vendor.success.body);
  });
});
