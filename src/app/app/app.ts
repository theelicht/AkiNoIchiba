import { Component, HostListener, signal } from '@angular/core';
import { SiteHeader } from '../layout/site-header/site-header';
import { SiteFooter } from '../layout/site-footer/site-footer';
import { HomePage } from '../pages/home-page/home-page';
import { VendorPage } from '../pages/vendor-page/vendor-page';

@Component({
  imports: [SiteHeader, SiteFooter, HomePage, VendorPage],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  readonly showVendor = signal(window.location.hash === '#vendors');

  @HostListener('window:hashchange')
  onHashChange(): void {
    const fragment = window.location.hash.slice(1);
    this.showVendor.set(fragment === 'vendors');
    if (fragment && fragment !== 'vendors') {
      setTimeout(() => document.getElementById(fragment)?.scrollIntoView());
    }
  }
}
