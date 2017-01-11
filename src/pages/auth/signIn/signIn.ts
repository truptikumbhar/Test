import { Component } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Network} from 'ionic-native';

import { SignUpPage } from '../../auth/signUp/signUp';
import { ForgotPwdPage } from '../forgotPwd/forgotPwd';
import { MakeDonationPage } from '../../donation/makeDonation/makeDonation';
import { ListDonationPage } from '../../donation/listDonation/listDonation';
import { TabsPage } from '../../tabs/tabs';

import { AuthProvider } from '../../../providers/authProvider';
import { PasswordValidator } from  '../../../validators/passwordValidator';
import { MobileValidator } from  '../../../validators/mobileValidator';
import { CustomValidators } from  '../../../validators/customValidator';
/*  ================= SignInPage ======================== */
@Component({
  selector: 'page-signIn',
  templateUrl: 'signIn.html'
})

export class SignInPage {
  error: any;
  invalidForm: boolean = true;
  vFlag: any = "";
  siForm: FormGroup;
  notFound: any = "";

  // ----- Define the constructor -------------------------------------
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private formBuilder: FormBuilder, private authPrv: AuthProvider, public storage: Storage, public events: Events) {	
  	  let dt = new Date();
  	  let tt1 = Date.parse( dt.getFullYear() +"-" + (dt.getMonth() + 1) + "-" + dt.getDate() + "T15:39:00");
	  console.log("----- signIn.ts ---- constructor ---- Network.connection ----:" + Network.connection + ":---- dt --:" + dt +":--- tt1 ---:"+ tt1 + ":--- date ---:" + new Date(tt1));
	  
		 
	    // ----- Preapare the form builder ------------------------------
	    this.siForm = this.formBuilder.group({
			mobile: ['', Validators.compose([CustomValidators.minLength(10), CustomValidators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required, MobileValidator.isValidMobile])],
            password: ['', Validators.compose([Validators.required, CustomValidators.minLength(6), CustomValidators.maxLength(30), PasswordValidator.checkPassword])]
		});
	  
		// ----- subscribe to the valueChanges event -------------------
		this.siForm.valueChanges
		  .subscribe(data => this.onValueChanged(data));
	  
		// --- call onValueChanged event for the fields which are prepopulated 
		this.onValueChanged(); 
  }

    // ----- onValueChanged event -------------------------------------
	onValueChanged(data?: any) {
		if (!this.siForm) { return; }
		const form = this.siForm;
		for (const field in this.formErrors) {
		  // clear previous error message (if any)
		  this.formErrors[field] = '';
		  const control = form.get(field);
		  console.log("----- signIn.ts ---- onValueChanged ---- field ---:" + field + ":---- vFlag ---:" + this.vFlag + ":--- valid ---:" + control.valid);
		  if (control && control.dirty ) {
			this.vFlag = "";
			this.invalidForm = false;
                if(!control.valid) {
                  const messages = this.validationMessages[field];
                  for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                  }
                  this.vFlag = "error";
                  this.invalidForm = true;
                  //break;
                }
		  }
		}
		for (const field in this.formErrors) {
			const control = form.get(field);
			if (control && !control.valid)
				this.invalidForm = true;
			
		}	
	  }  

  // ----- Reset the formErrors array -------------------------------------	  
  formErrors = {
		mobile: '',
		password: ''
  };
   
  // ----- Define the validationMessages for all the valications ----------- 
  validationMessages = {
    'mobile': {
      'required':      'Mobile number is required and must contain only numbers.',
      'minlength':     'Mobile number must be 10 digit long.',
      'maxlength':     'Mobile number must be 10 digit long.',
      'pattern': 	   'Mobile number must contain only numbers',
	  'isValidMobile': 'Please enter valid mobile number'
    },
    'password': {
      'required':      'Password is required.',
      'minlength':     'Password must be at least 6 character long.',
      'maxlength':     'Password cannot be more than 30 characters long.',
      'no_lowerCase':     'Password must contain at least one lower case letter.',
      'no_upperCase':     'Password must contain at least one upper case letter.',
      'no_number':        'Password must contain at least one number.',
      'no_specialChar':   'Password must contain at least one valid (! @ # $ % ^ & * \ _ +) special character.',
      'bad_char':      'Password can only contain these special characters: (! @ # $ % ^ & * \ _ +)',
      'invalidPassword':       'Password must contain at least one number, lower case letter, upper case letter and valid (! @ # $ % ^ & * \ _ +) special character.'
    }
  }   
  
  //============= check internet connection -----------------------------------------		
  noConnection() {
	return (Network.connection === 'none');
  } 
  
  // ----- ionViewDidLoad event =========-------------------------------------
  ionViewDidLoad() {
    //console.log('Hello Sign In Page and once again Page');
  }

  // ----- Function to open SignUpPage ---------------------------------------  
  openSignUpPage(): void {
    this.navCtrl.push(SignUpPage);
  }

  // ----- Function to open ForgotPwdPage ------------------------------------
  openForgotPasswordPage(): void {
    this.navCtrl.push(ForgotPwdPage);
  }

  // ----- Function to submit login data -------------------------------------
  login() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    //let fd = JSON.stringify(this.siForm.value)
	if(!this.invalidForm){
		this.authPrv.loginWithMobile(this.siForm).subscribe(data => {
		  setTimeout(() => {
			// The auth subscribe method inside the app.ts will handle the page switch to home
			console.log("---- signIn.ts ---- login ---- data ---:" + JSON.stringify(data) + ":---- data[mobile] ----:" + data['mobile'] + ":---- this.siForm ----:" +  this.siForm.value +":----");
			this.notFound = (data == "notFound" ? "notFound" : "");
			
			
			if(data !== "notFound"){
                // ------ Store data in the storage --------------
                this.storage.set('user', JSON.stringify(data));
				
				// Published event - event is subscribed in app.components.ts file to add 'Donation Managment' page in menu
				this.events.publish('functionCall:userLoggedIn', data['orgID']);
				this.navCtrl.setRoot(TabsPage);
			}		
			loading.dismiss();		
		  }, 500);
		}, err => {
		  setTimeout(() => {
			loading.dismiss();
			this.error = err;
		  }, 500);
		});
	}
  }
  

}
