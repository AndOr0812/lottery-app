import { Component, Input, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';
import { LotteryService } from '../services/lottery.service';
import { NavController } from 'ionic-angular';
import { TicketsComponent } from '../tickets/tickets.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {
  @Input() email;
  histories: Array<any>;

  constructor(
    private history: HistoryService,
    private lottery: LotteryService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.history.getUserPurchaseHistory(this.email).then(userHistory => {
      this.histories = this.findMatchingNumbers(userHistory.reverse());
    });
  }

  findMatchingNumbers(history) {
    history.forEach(game => {
      const actualResults = game.actualResults;
      if (actualResults) {
        game.purchases.forEach(purchase => {
          purchase.tickets.forEach(ticket => {
            ticket.matchedMega = (ticket.mega === actualResults.mega);
            ticket.numbers.forEach((number, i) => {
              const tempNumber = {
                value: number,
                matched: actualResults.numbers.indexOf(number) !== -1
              };
              ticket.numbers[i] = tempNumber;
            });
          });
        });
      }
    });
    return history;
  }

  reorder(game, tickets) {
    console.log('purchase', game, tickets);
    this.lottery.tickets = tickets;
    this.navCtrl.setRoot(TicketsComponent, {
      lottery: game
    });
  }
}
