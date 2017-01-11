import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Network} from 'ionic-native';

import { SignInPage } from '../signIn/signIn';

import { AuthProvider } from '../../../providers/authProvider';
import { PasswordValidator } from  '../../../validators/passwordValidator';
import { CustomValidators } from  '../../../validators/customValidator';
/* ----------------- Sign In ------------------- */
@Component({
  selector: 'page-change-pwd',
  templateUrl: 'changePwd.html'
})
export class ChangePwdPage {
  error: any;
  uID: any;
  cpForm: FormGroup;
  notFound: any = "abc";
  invalidForm: boolean = true;
  vFlag: any = "";

  constructor(public navCtrl: NavController, private authPrv: AuthProvider, private loadingCtrl: LoadingController, private formBuilder: FormBuilder, public storage: Storage) {	
	    this.cpForm = this.formBuilder.group({
			userID: [''],
			currPassword: ['', Validators.compose([CustomValidators.minLength(6), CustomValidators.maxLength(30), Validators.required, PasswordValidator.checkPassword])],
			newPassword: ['', Validators.compose([CustomValidators.minLength(6), CustomValidators.maxLength(30), Validators.required, PasswordValidator.checkPassword])],
			passwordMatch:  ['', Validators.compose([CustomValidators.minLength(6), CustomValidators.maxLength(30), Validators.required, PasswordValidator.checkPassword])]
		});

	// ----- Get the User Data -------------------------------------
     this.storage.get('user').then((val) => {
       console.log('chnagePwd.ts ---- constructor ------- user data ----:', val);
       //console.log('app component ---- initializeApp ---- orgID -----------:', val['orgID']);
	   let data = JSON.parse(val);
	   if(data && data['id'] ){
		   console.log('chnagePwd.ts ---- constructor ------- userID ----:', data['id']);
		   this.cpForm.patchValue({userID: data['id'].toString()});
	   }   
     });
		
	this.cpForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
	  
	this.onValueChanged(); 
		
  }

    // ----- onValueChanged event -------------------------------------
	onValueChanged(data?: any) {
		if (!this.cpForm) { return; }
		const form = this.cpForm;
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
                  //vFlag = false;
                  this.invalidForm = true;
                  //break;
                }
                if (field === 'passwordMatch') {
                    if(control.value != form.get('newPassword').value){
                        const confPasswordMessages = this.validationMessages[field];
                        this.invalidForm = true;
                        this.formErrors[field] += confPasswordMessages['mismatch']+' ';
                    }
                }
          }
        }

		this.vFlag = "";
		for (const field in this.formErrors) {
			const control = form.get(field);
			if (control && !control.valid)
				this.vFlag = "error"
			
		}	
		this.invalidForm = (this.vFlag == "" && !this.invalidForm ? false: true); 
	  }  
  
  // ----- Reset the formErrors array -------------------------------------	  	
  formErrors = {
		userID: '',
		currPassword: '',
		newPassword: '',
		passwordMatch: ''
  };
   
  validationMessages = {
    'currPassword': {
      'required':      'Password is required.',
      'minlength':     'Password must be at least 6 character long.',
      'maxlength':     'Password cannot be more than 30 characters long.',
      'no_lowerCase':     'Password must contain at least one lower case letter.',
      'no_upperCase':     'Password must contain at least one upper case letter.',
      'no_number':        'Password must contain at least one number.',
      'no_specialChar':   'Password must contain at least one valid (! @ # $ % ^ & * \ _ +) special character.',
      'bad_char':      'Password can only contain these special characters: (! @ # $ % ^ & * \ _ +)',
      'invalidPassword':       'Password must contain at least one number, lower case letter, upper case letter and valid (! @ # $ % ^ & * \ _ +) special character.'
    },
    'newPassword': {
      'required':      'New password is required.',
      'minlength':     'New password must be at least 6 character long.',
      'maxlength':     'New password cannot be more than 30 characters long.',
      'no_lowerCase':     'New password must contain at least one lower case letter.',
      'no_upperCase':     'New password must contain at least one upper case letter.',
      'no_number':        'New password must contain at least one number.',
      'no_specialChar':   'New password must contain at least one valid (! @ # $ % ^ & * \ _ +) special character.',
      'bad_char':      'New password can only contain these special characters: (! @ # $ % ^ & * \ _ +)',
      'invalidPassword':       'New password must contain at least one number, lower case letter, upper case letter and valid (! @ # $ % ^ & * \ _ +) special character.'
    },
    'passwordMatch': {
      'required':      'Confirm password is required.',
      'minlength':     'Confirm password must be at least 6 character long.',
      'maxlength':     'Confirm password cannot be more than 30 characters long.',
      'no_lowerCase':     'Confirm password must contain at least one lower case letter.',
      'no_upperCase':     'Confirm password must contain at least one upper case letter.',
      'no_number':        'Confirm password must contain at least one number.',
      'no_specialChar':   'Confirm password must contain at least one valid (! @ # $ % ^ & * \ _ +) special character.',
      'bad_char':      'Confirm password can only contain these special characters: (! @ # $ % ^ & * \ _ +)',
      'invalidPassword':       'Confirm password must contain at least one number, lower case letter, upper case letter and valid (! @ # $ % ^ & * \ _ +) special character.',
	  'mismatch':     'Confirm Password must be same as New Password.'
    }
    }
    
  //============= check internet connection -----------------------------------------		
  noConnection() {
	/* states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);*/  
	return (Network.connection === 'none');
  } 
 
	
  ionViewDidLoad() {
    //console.log('Hello Sign In Page and once again Page');
  }
  
  openSignInPage(): void {
    this.navCtrl.push(SignInPage);
  }


  changePwd() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
	
	console.log("---- changePwd.ts ---- changePwd ---- be DB call ---- data ---:" + JSON.stringify(this.cpForm.value));
    this.authPrv.changePassword(this.cpForm).subscribe(data => {
      setTimeout(() => {
        // The authPrv subscribe method inside the app.ts will handle the page switch to home
		console.log("---- changePwd.ts ---- changePwd ---- data ---:" + data);
		this.notFound = (data.indexOf("Wrong password") > -1 ? "wrong" : "");
			
        loading.dismiss();		
      }, 1000);
    }, err => {
      setTimeout(() => {
        loading.dismiss();
        this.error = err;
      }, 1000);
    });
  }
  
  
  
  
}
