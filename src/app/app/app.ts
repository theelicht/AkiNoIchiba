import { Component } from '@angular/core';
import { SiteHeader } from '../layout/site-header/site-header';
import { SiteFooter } from '../layout/site-footer/site-footer';
import { SeasonNotice } from '../shared/season-notice/season-notice';
import { Hero } from '../sections/hero/hero';
import { About } from '../sections/about/about';
import { Market } from '../sections/market/market';
import { Programme } from '../sections/programme/programme';
import { VisitorInfo } from '../sections/visitor-info/visitor-info';
import { Access } from '../sections/access/access';

@Component({
  imports: [
    SiteHeader,
    SiteFooter,
    SeasonNotice,
    Hero,
    About,
    Market,
    Programme,
    VisitorInfo,
    Access,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
