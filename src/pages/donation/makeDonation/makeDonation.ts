import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Network} from 'ionic-native';

import { TabsPage } from '../../tabs/tabs';
import { SignInPage } from '../../auth/signIn/signIn';
import { ConfirmCitizenshipPage } from '../confirmCitizenship/confirmCitizenship';

import { RemainingAmtDateValidator } from  '../../../validators/remainingAmtDateValidator';
import { CustomValidators } from  '../../../validators/customValidator';

import { DonationProvider } from '../../../providers/donationProvider';
/*  ================= make donation ======================== */
/* ----------------  -------------
login id of CCAvenue for INR Donation 
web_10653 (login)
Vachan17&SS
*/
@Component({
  selector: 'page-makeDonation',
  templateUrl: 'makeDonation.html',
})

export class MakeDonationPage {
  error: any;
  form: any;
  passwordGroup: any;
  dnForm: FormGroup;
  submitAttempt: boolean = false;
  invalidForm: boolean = true;
  uID: any = 0;
  nextYear:any;  
  
  // ----- Define the constructor -------------------------------------
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private formBuilder: FormBuilder, private donation: DonationProvider, public storage: Storage) {	

	// ----- Set the next year value ------------------------------------
	let today=new Date();
	this.nextYear= today.getFullYear()+1;
  
	// ----- Preapare the form builder ---------------------------------
    this.dnForm = this.formBuilder.group({
		id: [''],
		userID: [0],
		contributeTo: ['MNN', Validators.required],
		contributeFreq: ['One Time', Validators.required],
		paymentMode: ['Netbanking', Validators.required],
		amount: [, Validators.compose([CustomValidators.minLength(1), CustomValidators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
		todaysAmount: [, Validators.compose([CustomValidators.minLength(1), CustomValidators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
		remAmtByDate: [null, Validators.compose([CustomValidators.maxLength(12), RemainingAmtDateValidator.isValid])],
		reminderPeriod: [''],
		donationReceipt: ['By Courier']
	});

	// ---- if user data is not available, go to the signIn page ------
     this.storage.get('user').then((val) => {
        let uData = JSON.parse(val);		 
	   if(val && val !== null){
		   this.uID = uData['id'];
		   console.log('user data from IFFF ----- val[id] ------:'+ uData['id'] + ':--- this.uID ----:' + this.uID);
           this.dnForm.patchValue({userID: this.uID});	
       }
     });

	
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
		
		if(Number(this.dnForm.controls['todaysAmount'].value) > Number(this.dnForm.controls['amount'].value)){
			const todayAmtMessages = this.validationMessages['todaysAmount'];
			this.invalidForm = true;
			this.formErrors['todaysAmount'] += todayAmtMessages['lessamt']+' ';
		}
		
		if(Number(this.dnForm.controls['amount'].value) <= 9){
			const amtMessages = this.validationMessages['amount'];
			this.invalidForm = true;
			this.formErrors['amount'] += amtMessages['gtreaterThanZero']+' ';
		}else{
			this.formErrors['amount'] = '';
		}

		if(Number(this.dnForm.controls['todaysAmount'].value) <= 9){
			const todayAmtMessages = this.validationMessages['todaysAmount'];
			this.invalidForm = true;
			this.formErrors['todaysAmount'] += todayAmtMessages['gtreaterThanTen']+' ';
		}
		
    for (const rField in this.requiredFields) {
        const rControl = form.get(rField);
        console.log(' -------- makeDonation.ts ---------onValueChange() ------- ' + rField + ' : ' + rControl.value);
        if(rControl && (rControl.value === '' || !rControl.value) ){
            this.invalidForm = true;
        }
    }
		
	  }  
	  
  // ------ declare required fields -----------------------------------------------------------
  requiredFields = {
		contributeTo: '',
		contributeFreq: '',
		paymentMode: '',
		amount: '',
		todaysAmount: ''
  }
	  
  // ----- Reset the formErrors array -------------------------------------	  	
  formErrors = {
		contributeTo: '',
		contributeFreq: '',
		paymentMode: '',
		amount: '',
		todaysAmount: '',
		remAmtByDate: '',
		reminderPeriod: '',
		donationReceipt: ''
  };

  // ----- Define the validationMessages for all the valications ----------- 
  validationMessages = {
	'contributeTo': {
		'required':      'Please select for which you will like to contribute to...'
	},
	'contributeFreq': {
		'required':      'Please select no. of times, you will like to contribue...'
	},
	'paymentMode': {
		'required':      'Please select the payment mode...'
	},
    'amount': {
      'required':      'Amount is required and must contain only numbers.',
      'minlength':     'Amount must be at least 1 digit long.',
      'maxlength':     'Amount must not be more than 10 digit long.',
      'pattern': 	   'Amount must contain only numbers',
	  'gtreaterThanZero': 'Amount must be Rs. 10 or more.'
    },
    'todaysAmount': {
      'required':      "Today's Amount is required and must contain only numbers.",
      'minlength':     "Today's must be at least 1 digit long.",
      'maxlength':     "Today's must not be more than 10 digit long.",
      'pattern': 	   "Today's must contain only numbers",
	  'lessamt': 	   "Today's amount must be less than committed amount!",
	  'gtreaterThanTen': 'Amount must be Rs. 10 or more.'
    },
    'remAmtByDate': {
      'wrong date':      'Remaining Amount By Date Is Not Valid Date.'    
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
  saveDonationData() {
	// /mDonationGET/:userID/:contributeTo/:contributeFreq/:paymentMode/:amount/:todaysAmount/:remAmtByDate/:reminderPeriod/:donationReceipt

    
	let usrData: any;  
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

	this.submitAttempt = true;
	  console.log("--------- makeDonation.ts ---- saveDonationData ---- dnForm valid ---:" + this.invalidForm + ":--- usrData ---:" + usrData + ":--- this.dnForm.value ----:" + JSON.stringify(this.dnForm.value) +  ":---- todaysAmount ----:"  + this.dnForm.controls['todaysAmount'].value );
	  
	// ---- first create donation entry and get the transaction ID
		this.donation.saveDonationData(usrData, this.dnForm).subscribe(data => {
			// The auth subscribe method inside the app.ts will handle the page switch to home
			console.log("---- makeDonation.ts ---- saveDonationData ---- data ---:" + JSON.stringify(data));
			this.dnForm.patchValue({userID: this.uID});	
		setTimeout(() => {
			
			// ----- if invalidForm then only make HTTP call ----------------  
			if(!this.invalidForm ){ // && usrData !== null
				console.log("--------- makeDonation.ts ----- saveDonationData ---- before window.location.href");

				// ------ Store donation data in the storage --------------
				this.storage.set('newDonation', JSON.stringify(data));
				
				if(this.dnForm.controls['todaysAmount'].value > 9)
					this.navCtrl.push(ConfirmCitizenshipPage);
				
			}	
			
			loading.dismiss();
		  }, 1000);
		}, err => {
			console.log('Error from makeDonation.ts ----- =============:'+ err);	   
		  setTimeout(() => {
			loading.dismiss();
			this.error = err;
		  }, 1000);
		});
		loading.dismiss();			
	} 

}
