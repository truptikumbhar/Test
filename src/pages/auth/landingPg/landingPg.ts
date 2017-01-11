import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Network} from 'ionic-native';

import { SignInPage } from '../../auth/signIn/signIn';
import { SignUpPage } from '../../auth/signUp/signUp';

/*  ================= SignInPage ======================== */
@Component({
  selector: 'page-landingPg',
  templateUrl: 'landingPg.html'
})

export class LandingPage {
  

  // ----- Define the constructor -------------------------------------
  constructor(public navCtrl: NavController) {	
  	  
  }   
  
  //============= check internet connection -----------------------------------------		
  noConnection() {
	return (Network.connection === 'none');
  } 
  
  // ----- ionViewDidLoad event =========-------------------------------------
  ionViewDidLoad() {
    //console.log('Hello Sign In Page and once again Page');
  }

  // ----- Function to open SignUp page -------------------------------------
  openSignInPage() {
    this.navCtrl.push(SignInPage);
  }

  // ----- Function to open SignUpPage ---------------------------------------  
  openSignUpPage() {
    this.navCtrl.push(SignUpPage);
  }

}
