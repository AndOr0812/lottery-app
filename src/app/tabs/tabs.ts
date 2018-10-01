import { Component } from '@angular/core';
import { HomepageComponent } from '../homepage/homepage.component';
import { TicketsComponent } from '../tickets/tickets.component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  megaParams = {
    lottery: 'megamillions'
  };
  powerParams = {
    lottery: 'powerball'
  };

  tab1Root = HomepageComponent;
  tab2Root = TicketsComponent;

  constructor() {

  }
}
