import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TermsComponent } from '../terms/terms.component';

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html'
})
export class BottomComponent {
  constructor(private navCtrl: NavController) {}

  goToTerms() {
    this.navCtrl.setRoot(TermsComponent);
  }
}
