import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../app/services/auth.service';
import { LotteryService } from '../../app/services/lottery.service';
import { NavController } from 'ionic-angular';
import { TicketsComponent } from '../tickets/tickets.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit, OnDestroy {
  openLogin: boolean = false;
  userInfo;
  lotteries;
  tickets: Array<any>;
  _subscription;
  _subscription2;
  _timeout;

  constructor(
    private auth: AuthService,
    private lotteryService: LotteryService,
    private navCtrl: NavController
  ) {
    // subscribed to changes in user
    this._subscription = this.auth.currentUserChange.subscribe((user) => {
      this.userInfo = user;
    });
    // subscribe to lotteries observable
    this._subscription2 = this.lotteryService.lotteriesChange.subscribe((res) => {
      this.lotteries = res;
      this.updateLotteryData();
    });
  }

  ngOnInit() {
    // get user info
    this.userInfo = this.auth.currentUser;
    // set lottery data
    this.lotteries = this.lotteryService.lotteries;
    if (this.lotteries) {
      this.updateLotteryData();
    }
    // setTimeout to change countdown each minute
    this._timeout = setInterval(() => {
      this.updateClock();
    }, 60000);
  }

  updateLotteryData() {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    this.lotteries.forEach((lottery) => {
      const announcedInSeconds = lottery.resultsAnnouncedAt.seconds;
      lottery.date = {};
      lottery.date.time = announcedInSeconds - nowInSeconds;
      lottery.date.days = Math.floor(lottery.date.time / 86400);
      lottery.date.hours = Math.floor((lottery.date.time / 3600) - (lottery.date.days * 24));
      lottery.date.minutes = Math.floor((lottery.date.time / 60) - (lottery.date.days * 1440) - (lottery.date.hours * 60));
    });
  }

  updateClock() {
    if (this.lotteries) {
      this.lotteries.forEach((lottery) => {
        lottery.date.time -= 60;
        lottery.date.days = Math.floor(lottery.date.time / 86400);
        lottery.date.hours = Math.floor((lottery.date.time / 3600) - (lottery.date.days * 24));
        lottery.date.minutes = Math.floor((lottery.date.time / 60) - (lottery.date.days * 1440) - (lottery.date.hours * 60));
      });
    }
  }

  goTo(lotteryName) {
    this.navCtrl.setRoot(TicketsComponent, {
      lottery: lotteryName
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this._subscription2.unsubscribe();
    clearInterval(this._timeout);
  }
}
