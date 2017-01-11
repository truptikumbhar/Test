import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailValidator } from  '../../../validators/emailValidator';
import { Network} from 'ionic-native';
import { AuthProvider } from '../../../providers/authProvider';
@Component({
  selector: 'page-forgotPwd',
  templateUrl: 'forgotPwd.html'
})
export class ForgotPwdPage {

  error: any;
  fpForm: FormGroup;
  notFound: any = "abc";
  invalidForm: boolean = true;

  constructor(public navCtrl: NavController,  private authProvider: AuthProvider, private loadingCtrl: LoadingController, private formBuilder: FormBuilder) {	
	    this.fpForm = this.formBuilder.group({
			mobile: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
			emailID: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(100), Validators.pattern('[a-z0-9@.-_]*'), Validators.required, EmailValidator.isValidEmail])]
		});
this.fpForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
	  
	this.onValueChanged(); 
		
  }
    onValueChanged(data?: any) {
     
    if (!this.fpForm) { return; }
    const form = this.fpForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty ) {
			//this.vFlag = "";
			this.invalidForm = false;
                if(!control.valid) {
                  const messages = this.validationMessages[field];
                  for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                  }
                 // this.vFlag = "error";
                  this.invalidForm = true;
                  break;
                }
		  }
		}
		for (const field in this.formErrors) {
			const control = form.get(field);
			if (control && !control.valid)
				this.invalidForm = true;
			
		}            
	  }  


  formErrors = {
		mobile: '',
		emailID: ''
  };
    
    validationMessages = {
    'mobile': {
      'required':      'Mobile number is required.',
      'minlength':     'Mobile number must be at least 10 digits long.',
      'maxlength':     'Mobile number cannot be more than 10 digits long.',
      'pattern': 	   'Mobile number can contain only numbers'
    },
    'emailID': {
      'required':      'Email address is required.',
      'minlength':     'Email address must be at least 10 characters long.',
      'maxlength':     'Email address cannot be more than 100 characters long.',
      'pattern': 	   'Email address can contain only numbers, letters and @._ characters',
      'invalidEmail':  'Email address is not valid. It can contain only numbers, letters and @._ characters'
    }
    }
   noConnection() {
    /*states[Connection.UNKNOWN]  = 'Unknown connection';
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
  
 
  forgotPwd() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.authProvider.forgotPassword(this.fpForm.value).subscribe(data => {
      setTimeout(() => {
        // The auth subscribe method inside the app.ts will handle the page switch to home
		console.log("---- forgotPwd.ts ---- forgotPwd ---- data ---:" + data);
		this.notFound = (data.indexOf("Wrong Mobile Number Or EMail") > -1 ? "wrong" : "");
			
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
