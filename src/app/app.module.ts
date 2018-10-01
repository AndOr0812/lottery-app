import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from './tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Firebase Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../config';
// Needed Module
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// components
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { InputComponent } from './login/input/input.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketComponent } from './tickets/ticket/ticket.component';
import { ModalComponent } from './modal/modal.component';
import { BottomComponent } from './bottom/bottom.component';
import { FaqComponent } from './faq/faq.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TermsComponent } from './terms/terms.component';
import { HistoryComponent } from './history/history.component';
// Services
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { BroadcasterService } from './services/broadcaster.service';
import { LotteryService } from './services/lottery.service';
import { HistoryService } from './services/history.service';
import { GooglePayService } from './services/googlePay.service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    InputComponent,
    TicketsComponent,
    TicketComponent,
    ModalComponent,
    BottomComponent,
    FaqComponent,
    SpinnerComponent,
    TermsComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomepageComponent,
    TicketsComponent,
    TermsComponent,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiService,
    AuthService,
    BroadcasterService,
    LotteryService,
    HistoryService,
    GooglePayService
  ]
})
export class AppModule {}
