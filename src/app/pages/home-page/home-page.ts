import { Component } from '@angular/core';
import { SeasonNotice } from '../../shared/season-notice/season-notice';
import { Hero } from '../../sections/hero/hero';
import { About } from '../../sections/about/about';
import { Market } from '../../sections/market/market';
import { Programme } from '../../sections/programme/programme';
import { VisitorInfo } from '../../sections/visitor-info/visitor-info';
import { Access } from '../../sections/access/access';

@Component({
  selector: 'app-home-page',
  imports: [SeasonNotice, Hero, About, Market, Programme, VisitorInfo, Access],
  templateUrl: './home-page.html',
})
export class HomePage {}
