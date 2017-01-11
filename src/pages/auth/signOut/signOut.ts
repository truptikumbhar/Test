import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LandingPage } from '../../auth/landingPg/landingPg';
import { RadioPlayer } from '../../../providers/radioPlayer';
/*  ================= SignInPage ======================== */
@Component({
  selector: 'page-signOut',
  templateUrl: 'signOut.html'
})

export class SignOutPage {
  error: any;
  notFound: any = "";

  // ----- Define the constructor -------------------------------------
  constructor(public navCtrl: NavController, public storage: Storage, public player: RadioPlayer, public events: Events) {	
    //stopping internet radio if its on
    this.player.pause();
    
	console.log("------- SignOutPage ---- before clearing storage ----");
	//this.storage.remove('user');  
	this.storage.clear(); 	  
    this.events.publish('functionCall:userLoggedOut', true);
	this.navCtrl.setRoot(LandingPage);
  }

  // ----- ionViewDidLoad event =========-------------------------------------
  ionViewDidLoad() {
    //console.log('Hello Sign In Page and once again Page');
  }

}
