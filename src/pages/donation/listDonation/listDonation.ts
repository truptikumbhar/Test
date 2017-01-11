import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Network} from 'ionic-native';

import { CustomValidators } from  '../../../validators/customValidator';
import { SignInPage } from '../../auth/signIn/signIn';

import { DonationProvider } from '../../../providers/donationProvider';
/*  ================= make donation ======================== */
@Component({
  selector: 'page-listDonation',
  templateUrl: 'listDonation.html',
})

export class ListDonationPage {
  error: any;
  dnForm: FormGroup;
  submitAttempt: boolean = false;
  invalidForm: boolean = true;
  dnList: any[];
  
  // ----- Define the constructor -------------------------------------
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private formBuilder: FormBuilder, private donation: DonationProvider, public storage: Storage) {
  
	// ---- if user data is not available, go to the signIn page ------
	   
  
	// ----- Preapare the form builder ---------------------------------
    this.dnForm = this.formBuilder.group({
		fromDate: [new Date().toISOString(), Validators.required],
		toDate: [new Date().toISOString(), Validators.required],
		contributeTo: ['MNN', Validators.required],
		remAmtByDate: [new Date().toISOString(),Validators.required]
	});

	this.invalidForm = false;
	
	// ----- Set the default values --------------------------------	
		
	// ----- subscribe to the valueChanges event -------------------
	this.dnForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
	  
	// --- call onValueChanged event for the fields which are prepopulated   
	this.onValueChanged();
  }
  
  // ----- onValueChanged event -------------------------------------
  ionViewDidLoad() {
//    console.log('Hello Sign In Page and once again Page');
  }

  // ----- onValueChanged event -------------------------------------
	 onValueChanged(data?: any) {
		if (!this.dnForm) { return; }
		const form = this.dnForm;
		for (const field in this.formErrors) {
		  // clear previous error message (if any)
		  this.formErrors[field] = '';
		  const control = form.get(field);
          if (control && control.dirty) {
                this.invalidForm = false;
                if(!control.valid) {

					const messages = this.validationMessages[field];
					for (const key in control.errors) {
					  this.formErrors[field] += messages[key] + ' ';
					}
			  this.invalidForm = true;
			  //break;
			}  
		  }
		}
	
	 if((this.dnForm.controls['fromDate'].value) > (this.dnForm.controls['toDate'].value)){
		const todayAmtMessages = this.validationMessages['toDate'];
		this.invalidForm = true;
		this.formErrors['toDate'] += todayAmtMessages['fromToDate']+' ';
	}     
	
    for (const rField in this.requiredFields) {
        const rControl = form.get(rField);
        console.log(' -------- listDonation.ts ---------onValueChange() ------- ' + rField + ' : ' + rControl.value);
        if(!rControl.value){
            this.invalidForm = true;
        }
    }
		
	  }  
	  
  // ------ declare required fields -----------------------------------------------------------
  requiredFields = {
	fromDate: '',
	toDate: '',
	contributeTo: '',
	remAmtByDate: ''
  }
	  
  // ----- Reset the formErrors array -------------------------------------	  	
  formErrors = {
	fromDate: '',
	toDate: '',
	contributeTo: '',
	remAmtByDate: ''
  };

  // ----- Define the validationMessages for all the valications ----------- 
  validationMessages = {
	'fromDate': {
		'required':      'Please enter from date...'
	},
	'toDate': {
		'required':      'Please enter to date...',
		'fromToDate': 	'From date should be less than to date.'
	},
	'remAmtByDate': {
		'required':      'Please enter date...'
	},
	'contributeTo': {
		'required':      'Please select for which you will like to contribute to...'
	}
  };

  // ========================================================================
  // --------------- Page Specific functions --------------------------------
  // ========================================================================

  // ------ check internet connection ---------------------------------------		
  noConnection() {
	// possible values : unknown, ethernet, wifi, 2g, 3g, 4g, cellular, none  
	return (Network.connection === 'none');
  } 


  // ----- Submit Donation data to payment gateway and save it -------------
  listDonationData() {
	let usrData: any;  
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

	// ----- Get the User Data -------------------------------------
     this.storage.get('user').then((val) => {
       console.log('user data is -----------:', val);
	   if(val !== null)
		   usrData = val;
     })
	
	this.submitAttempt = true;
	  console.log("--------- listDonationData ---- dnForm valid ---:" + this.invalidForm + ":--- usrData ---:" + usrData + ":--- this.dnForm.value ----:" + JSON.stringify(this.dnForm.value) )
		
		this.donation.listDonationData(usrData, this.dnForm).subscribe(data => {
			// The auth subscribe method inside the app.ts will handle the page switch to home
			console.log("---- listDonation.ts ---- listDonationData ---- data ---:" + data);
			//this.navCtrl.setRoot(TabsPage);
			this.dnList = data;
			this.error = '';
		setTimeout(() => {
			loading.dismiss();
		  }, 1000);
		}, err => {
			console.log('Error from listDonation.ts ----- =============:'+ err);	   
		  setTimeout(() => {
			loading.dismiss();
			this.error = err;
		  }, 1000);
		});
//		loading.dismiss();			
			
   }

} 


