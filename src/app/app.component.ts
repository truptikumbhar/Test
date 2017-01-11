import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, ToastController } from 'ionic-angular';
import { StatusBar, Splashscreen, InAppBrowser } from 'ionic-native';
import { Storage } from '@ionic/storage';
import './rxjs-operators';

import { ContactPage } from '../pages/contact/contact';
import { AboutPage } from '../pages/about/about';

import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/auth/landingPg/landingPg';
import { SignInPage } from '../pages/auth/signIn/signIn';
import { SignOutPage } from '../pages/auth/signOut/signOut';
import { SignUpPage } from '../pages/auth/signUp/signUp';
import { ChangePwdPage } from '../pages/auth/changePwd/changePwd';

import { HappyThoughtsPage } from '../pages/tabs/happyThoughts/happyThoughts';
import { YoutubeChannelPage } from '../pages/tabs/youtubeChannel/youtubeChannel';
import { InternetRadioPage } from '../pages/tabs/internetRadio/internetRadio';
import { PeacePrayerPage } from '../pages/tabs/peacePrayer/peacePrayer';

import { MakeDonationPage } from '../pages/donation/makeDonation/makeDonation';
import { ListDonationPage } from '../pages/donation/listDonation/listDonation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  backEventCount: number = 0;
  backEventTime: Date;
  rootPage: any;

  pages: Array<{title: string, component: any}>;

  browser: any;
  isUserLoggedIn: boolean = false;
  
  constructor(public platform: Platform, public storage: Storage, public events: Events, public toastCtrl: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Welcome', component: LandingPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //Splashscreen.hide();
      setTimeout(() => {
          Splashscreen.hide();
      }, 1000);

	  
			// ----- Get the User Data -------------------------------------
			this.storage.get('user').then((val) => {
				console.log('app component ---- user data is -----------:', val);
				let data = JSON.parse(val);
				console.log('app component ---- data -----------:', data);
        
				if(data && data['mobile']){
                    this.isUserLoggedIn = true;
                    this.setMenuForLoggedInUser();
                    if(data['orgID'] && data['orgID'] === 1){
                        this.addAdminPagesInMenu();
                    }
					this.rootPage = TabsPage; //this.nav.setRoot(TabsPage);
				}else{
					this.rootPage = LandingPage; //this.nav.setRoot(SignInPage);
				}
			});
	  
	  
    });
    
    this.platform.registerBackButtonAction(() => {
      console.log('------app.component.ts --------initilize() -------registerBackButtonAction------backEventCount' + this.nav.length());
      if( this.nav.length()>1)
          {
           this.nav.pop();   
          }
      else
          {
              let view = this.nav.getActive();
              if(view.component.name === 'TabsPage')
                {
                    this.backEventCount++;
                    if(this.backEventCount === 1)
                        {
                           this.nav.setRoot((this.isUserLoggedIn ? TabsPage : LandingPage));
                           let toast = this.toastCtrl.create({
                              message: 'Touch again to exist.',
                              duration: 3000
                            });
                            toast.present();
                            this.backEventTime = new Date();
                        }
                    else
                      {
                          let currTime = new Date();
                          let timeDiff = (currTime.getTime() - this.backEventTime.getTime()) / 1000;
                          if(timeDiff <= 3) {
                              this.platform.exitApp();   
                          }else{
                              this.backEventCount = 0;
                          }
                          
                      }
                }
              else
                {
                  this.nav.setRoot((this.isUserLoggedIn ? TabsPage : LandingPage)); 
                }
          }
    });
    
	this.events.subscribe('functionCall:userLoggedIn', orgID => { 
        console.log('app component ---- subscribed userLoggedIn Event-------- orgID ---:' + orgID);
        this.setMenuForLoggedInUser();
        this.isUserLoggedIn = true;
      
		if(orgID && orgID === 1){
			this.addAdminPagesInMenu();
		}
	});
    
	this.events.subscribe('functionCall:userLoggedOut', flag => { 
        console.log('app component ---- subscribed userLoggedOut Event-------- flag ---:' + flag);
        this.setMenuForLoggedOutUser();
        this.isUserLoggedIn = false;
    });
    
    this.events.subscribe('functionCall:tabChanged', flag => { 
        console.log('app component ---- subscribed tabChanged Event-------- flag ---:' + flag);
		this.backEventCount = 0;
	});
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.backEventCount=0;
    if(page.title == "Feedback" || page.title == "Helpdesk")
      //window.location.href="http://helpdesk.tejgyan.org"; 
      this.browser = new InAppBrowser('http://helpdesk.tejgyan.org', '_self');
    else
      this.nav.setRoot(page.component);
  }
  
  setMenuForLoggedInUser() {
    this.pages = [
      { title: 'Home', component: TabsPage },
      { title: 'Profile', component: SignUpPage },
      { title: 'Change Password', component: ChangePwdPage },
      { title: 'Internet Radio', component: InternetRadioPage },
      { title: 'Youtube Channel', component: YoutubeChannelPage },
      { title: 'Peace Prayer', component: PeacePrayerPage },
      { title: 'Feedback', component: ContactPage },
      { title: 'Helpdesk', component: AboutPage },
      { title: 'Donation', component: MakeDonationPage },
      //{ title: 'Donation Management', component: ListDonationPage },
      { title: 'Sign Out', component: SignOutPage }
    ];
  }
  
  setMenuForLoggedOutUser() {
    this.pages = [
      { title: 'Welcome', component: LandingPage }
    ];
  }

  addAdminPagesInMenu(){
      this.pages.splice(9,1);
      this.pages.push({ title: 'Donation Management', component: ListDonationPage });
      this.pages.push({ title: 'Sign Out', component: SignOutPage });
  }

}
