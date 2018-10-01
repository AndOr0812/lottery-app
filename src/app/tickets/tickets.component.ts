import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { NavParams} from 'ionic-angular';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { LotteryService } from '../services/lottery.service';
import { GooglePayService } from '../services/googlePay.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html'
})
export class TicketsComponent implements OnInit, OnDestroy {
  type: string = 'powerball';
  range: number;
  megaRange: number;
  tickets: Array<any> = [{
    numbers: [null, null, null, null, null],
    mega: null
  }, {
    numbers: [null, null, null, null, null],
    mega: null
  }, {
    numbers: [null, null, null, null, null],
    mega: null
  }];
  activeTicket = 0;
  openTicketSelection = false;
  totalTickets: number = 0;
  smallScreen = false;
  STRIPE_PUBLIC_KEY = 'pk_live_2OttpbdZViIvHCfxrzhNppK1';
  FIREBASE_FUNCTION_URL = 'https://us-central1-lottery-f4218.cloudfunctions.net/charge';
  userInfo;
  amountToChargeStripe: number = 0;
  amountToChargeCredits: number = 0;
  completedTickets: Array<any> = [];
  lottery;
  purchaseLoading: boolean = false;
  purchaseComplete: boolean = false;
  chargeError: boolean = false;
  chargeResponse;
  _subscription;
  _subscription2;

  @HostListener('window:resize') onResize() {
    this.resize();
  }

  constructor(
    private navParams: NavParams,
    private api: ApiService,
    private auth: AuthService,
    private lotteryService: LotteryService,
    private googleService: GooglePayService
  ) {
    this.type = this.navParams.get('lottery');
    // subscribed to changes in user
    this._subscription = this.auth.currentUserChange.subscribe((user) => {
      this.userInfo = user;
      // reset costs
      this.calculateCart();
    });
    // subscribe to lotteries observable
    this._subscription2 = this.lotteryService.lotteriesChange.subscribe((res) => {
      res.forEach((lottery) => {
        if (lottery.name === this.type) {
          this.lottery = lottery;
        }
      });
    });
  }

  ngOnInit() {
    // get user info
    this.userInfo = this.auth.currentUser;
    // check screen size
    this.resize();
    if (this.type === 'powerball') {
      this.range = 69;
      this.megaRange = 26;
    } else if (this.type === 'megamillions') {
      this.range = 70;
      this.megaRange = 25;
    } else {
      this.type === 'powerball'
      this.range = 69;
      this.megaRange = 26;
    }
    if (this.lotteryService.lotteries) {
      this.lotteryService.lotteries.forEach((lottery) => {
        if (lottery.name === this.type) {
          this.lottery = lottery;
        }
      });
    }
    // check for reorder tickets
    if (this.lotteryService.tickets) {
      this.tickets = this.lotteryService.tickets.map(ticket => {
        return {
          mega: ticket.mega,
          numbers: ticket.numbers.map(num => num.value)
        };
      });
      this.lotteryService.tickets = null; // reset service once used
    }
  }

  addTicket() {
    this.tickets.push({
      numbers: [null, null, null, null, null],
      mega: null
    });
    this.activeTicket = this.tickets.length - 1;
  }

  removeTicket(index) {
    this.tickets.splice(index, 1);
    if (this.activeTicket === index) {
      this.activeTicket = index - 1;
    }
    this.completedTicketCheck();
  }

  changeTicket(index) {
    this.activeTicket = index;
    this.openTicketSelection = true;
  }

  updateTicket(ticket) {
    this.tickets[this.activeTicket] = ticket;
    this.completedTicketCheck();
  }

  completedTicketCheck() {
    // ensure error/success for charge are not showing
    this.purchaseComplete = false;
    this.chargeError = false;
    // check completed tickets
    this.totalTickets = 0;
    this.completedTickets = [];
    this.tickets.forEach((tix) => {
      if (tix.complete) {
        this.totalTickets++;
        this.completedTickets.push({
          mega: tix.mega,
          numbers: tix.numbers,
          ticketWinnings: null
        });
      }
    });
    this.calculateCart();
  }

  calculateCart() {
    const totalCost = this.totalTickets * 3;
    const availableCredits = this.userInfo ? this.userInfo.credits : 0;
    const adjustedCost = totalCost - availableCredits;
    if (adjustedCost > 0) { // we did not have enough credits to pay in full (or at all)
      if (availableCredits > 0) { // there were credits and they were all used in purchase
        this.amountToChargeCredits = availableCredits;
        this.amountToChargeStripe = adjustedCost;
      } else {
        this.amountToChargeCredits = 0;
        this.amountToChargeStripe = totalCost;
      }
    } else { // we paid the amount in full with credits
      this.amountToChargeCredits = totalCost;
      this.amountToChargeStripe = 0;
    }
  }

  getBodyContent(stripeToken?) {
    let body: any = {
      gameId: this.lottery.gameId,
      charge: {
        amountToChargeStripe: this.amountToChargeStripe,
        amountToChargeCredits: this.amountToChargeCredits,
        currency: 'usd'
      },
      lottery: this.type,
      tickets: this.completedTickets
    };
    if (stripeToken) {
      body.token = stripeToken;
    } else {
      body.token = {
        id: '',
        email: this.userInfo.email
      };
    }
    return body;
  }

  creditCheckout() {
    this.purchaseLoading = true;
    // create body data to send in POST
    const body = this.getBodyContent();
    // POST call for charge
    this.api.postCharge(body).subscribe((result) => {
      this.successfulCharge(result);
    }, (err) => {
      this.rejectedCharge(err);
    });
  }

  openCheckout() {
    this.googleService.onGooglePaymentButtonClicked(this.amountToChargeCredits);
    // const handler = (<any>window).StripeCheckout.configure({
    //   key: this.STRIPE_PUBLIC_KEY,
    //   locale: 'auto',
    //   token: async (token: any) => {
    //     this.purchaseLoading = true;
    //     // create body data to send in POST
    //     const body = this.getBodyContent(token);
    //     // POST call for charge
    //     this.api.postCharge(body).subscribe((result) => {
    //       this.successfulCharge(result);
    //     }, (err) => {
    //       this.rejectedCharge(err);
    //     });
    //   }
    // });

    // handler.open({
    //   name: 'Lottery',
    //   // image: '/assets/logo/123-Lottery_square.svg',
    //   description: `Purchase for ${this.totalTickets} tickets`,
    //   email: (this.userInfo ? this.userInfo.email : null),
    //   amount: this.amountToChargeStripe * 100
    // });
  }

  successfulCharge(response) {
    this.purchaseLoading = false;
    if (response) { // added due to possibility of API getting shut down or unreachable
      if (response.statusCode === 200) {
        // reset tickets on screen
        this.tickets = [{
          numbers: [null, null, null, null, null],
          mega: null
        }, {
          numbers: [null, null, null, null, null],
          mega: null
        }, {
          numbers: [null, null, null, null, null],
          mega: null
        }];
        this.activeTicket = 0;
        this.completedTicketCheck();
        // set success message on screen
        this.purchaseComplete = true;
        this.chargeResponse = JSON.parse(response.body);
      } else {
        this.rejectedCharge(response);
      }
    } else {
      this.purchaseLoading = false;
      this.chargeError = true;
      this.chargeResponse = {error: `Our servers are currently unreachable, we apologize for this inconvenience.
      Please check back soon or contact our support team.`};
    }
  }

  rejectedCharge(error) {
    this.purchaseLoading = false;
    this.chargeError = true;
    if (error.body) {
      this.chargeResponse = JSON.parse(error.body);
    }
  }

  resize() {
    if (window.innerWidth < 600) {
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
    }
  }

  // getTest() {
  //   console.log('CALL TEST');
  //   this.api.getTest().subscribe(res => {
  //     console.log('success test', res);
  //   }, err => {
  //     console.log('error test', err);
  //   });
  // }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this._subscription2.unsubscribe();
  }
}
