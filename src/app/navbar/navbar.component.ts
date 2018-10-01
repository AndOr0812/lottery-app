import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LotteryService } from '../services/lottery.service';
import { NavController } from 'ionic-angular';
import { HomepageComponent } from '../homepage/homepage.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
  openLogin: boolean = false;
  userInfo;
  _subscription;

  constructor(
    private auth: AuthService,
    private lottery: LotteryService,
    private navCtrl: NavController
  ) {
    // subscribed to changes in user
    this._subscription = auth.currentUserChange.subscribe((user) => {
      this.userInfo = user;
    });
    // get user info initiated
    this.auth.getCurrentUser();
  }

  ngOnInit() {
    this.userInfo = this.auth.currentUser;
    // initiate subscription for the lotteries
    this.lottery.getLotteries();
  }

  goHome() {
    this.navCtrl.setRoot(HomepageComponent);
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
