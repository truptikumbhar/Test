import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { LandingPage } from '../pages/auth/landingPg/landingPg';
import { SignUpPage } from '../pages/auth/signUp/signUp';
import { ForgotPwdPage } from '../pages/auth/forgotPwd/forgotPwd';
import { ChangePwdPage } from '../pages/auth/changePwd/changePwd';
import { SignInPage } from '../pages/auth/signIn/signIn';
import { SignOutPage } from '../pages/auth/signOut/signOut';

import { HappyThoughtsPage } from '../pages/tabs/happyThoughts/happyThoughts';
import { InternetRadioPage } from '../pages/tabs/internetRadio/internetRadio';
import { YoutubeChannelPage } from '../pages/tabs/youtubeChannel/youtubeChannel';
import { PeacePrayerPage } from '../pages/tabs/peacePrayer/peacePrayer';

import { MakeDonationPage } from '../pages/donation/makeDonation/makeDonation';
import { ListDonationPage } from '../pages/donation/listDonation/listDonation';
import { PaymentGatewayPage } from '../pages/donation/paymentGateway/paymentGateway';
import { ConfirmCitizenshipPage } from '../pages/donation/confirmCitizenship/confirmCitizenship';

import { WppNotificationPage } from '../pages/modals/wppNotification/wppNotification';

import { AuthProvider } from '../providers/authProvider';
import { DonationProvider } from  '../providers/donationProvider';	
import { RadioPlayer } from  '../providers/radioPlayer';	

@NgModule({
  declarations: [
    MyApp,
    LandingPage,
    AboutPage,
    ContactPage,
    TabsPage,
	SignUpPage,
	ForgotPwdPage,
	ChangePwdPage,
	SignInPage,
	SignOutPage,
	MakeDonationPage,
	ListDonationPage,
	PaymentGatewayPage,
    ConfirmCitizenshipPage,
	HappyThoughtsPage,
	YoutubeChannelPage,
	InternetRadioPage,
	PeacePrayerPage,
	WppNotificationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LandingPage,
    AboutPage,
    ContactPage,
    TabsPage,
	SignUpPage,
	ForgotPwdPage,
	ChangePwdPage,
	SignInPage,
	SignOutPage,
	MakeDonationPage,
	ListDonationPage,
	PaymentGatewayPage,
	ConfirmCitizenshipPage,
    HappyThoughtsPage,
	YoutubeChannelPage,
	InternetRadioPage,
	PeacePrayerPage,
	WppNotificationPage
  ],
  providers: [Storage,
			   AuthProvider,	
			   RadioPlayer,
			   DonationProvider,	
			  {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
