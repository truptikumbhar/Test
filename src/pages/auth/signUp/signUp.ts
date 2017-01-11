import { Component } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Network} from 'ionic-native';

import { TabsPage } from  '../../tabs/tabs';

import { AgeValidator } from  '../../../validators/ageValidator';
import { EmailValidator } from  '../../../validators/emailValidator';
import { MobileValidator } from  '../../../validators/mobileValidator';
import { JoinDateValidator } from  '../../../validators/joinDateValidator';
import { PasswordValidator } from  '../../../validators/passwordValidator';
import { CustomValidators } from  '../../../validators/customValidator';

import { AuthProvider } from  '../../../providers/authProvider';

/* ============= SignUp page ============= */
@Component({
  selector: 'page-signUp',
  templateUrl: 'signUp.html'
})
export class SignUpPage {

  error: any;
  form: any;
  formMsg: any;
  data: any;
  passwordGroup: any;
  suForm: FormGroup;
  submitAttempt: boolean = false;
  invalidForm: boolean = true;
  khojiIdAvailable: boolean = false;
  isPasswordFieldActive: boolean = false;
  
  constructor(private authPrv: AuthProvider, public navCtrl: NavController, private loadingCtrl: LoadingController, private formBuilder: FormBuilder, public storage: Storage, public events: Events) {

    this.suForm = this.formBuilder.group({
        id:[null],
		salutation: [''],
		name: ['', Validators.compose([Validators.required, CustomValidators.minLength(6), CustomValidators.maxLength(150), CustomValidators.pattern('[a-zA-Z ]*')])],
		mobile: ['', Validators.compose([Validators.required, CustomValidators.minLength(10), CustomValidators.maxLength(10), CustomValidators.pattern('[0-9]*'), , MobileValidator.isValidMobile])],
		emailID: ['', Validators.compose([Validators.required, CustomValidators.minLength(10), CustomValidators.maxLength(100), EmailValidator.isValidEmail])],
		userID: [''],
		password: ['', Validators.compose([Validators.required, CustomValidators.minLength(6), CustomValidators.maxLength(30), PasswordValidator.checkPassword])],
		passwordMatch:  ['', Validators.compose([Validators.required, CustomValidators.minLength(6), CustomValidators.maxLength(30)])],
		profession: [''],
		isKhojiID: [''],
		address1: ['', CustomValidators.maxLength(100)],
		address2: ['', CustomValidators.maxLength(100)],
		city: ['', CustomValidators.maxLength(50)],
        pinCode: ['', CustomValidators.maxLength(15)],
		district: ['', CustomValidators.maxLength(50)],
		country: ['IN'],
		state: ['', CustomValidators.maxLength(50)],
		dob: [null, Validators.compose([CustomValidators.maxLength(12), AgeValidator.isValid])],
		gender: [''],
		joinedFrom: [null, Validators.compose([CustomValidators.maxLength(12), JoinDateValidator.isValid])],
		status: [''],
		preferredWayNTime: [''],
		availableOn: [''],
		remarks: ['', CustomValidators.maxLength(500)],
		monAvailability: ['N'],
		tueAvailability: ['N'],
		wedAvailability: ['N'],
		thuAvailability: ['N'],
		friAvailability: ['N'],
		satAvailability: ['N'],
		sunAvailability: ['N'],
		mobContact: ['N'],
		emailContact: ['N']
	});

	console.log("------- SignUp.ts ----- Constructor Network.connection ----:" + Network.connection +":====");
	// ---- if user data is available, go to the landing page ---------------------------
	 this.storage.get('user').then((val) => {
	   this.data = JSON.parse(val);	
	   console.log('======== SignUp.ts ----- user data is availble in SignUpPage, populate it ----:' + val + ':--- this.data ---:' + this.data + ':---- connection ---:' + !this.noConnection());
		//if internet connection is available then fetch data over internet -----------------
		if(!this.noConnection() && this.data && this.data['mobile'] && this.data !== null ){
			this.authPrv.getUserProfileData(this.data['mobile']).subscribe(iData => {
				this.data = iData;
				if(this.data && this.data !== null ){
					this.invalidForm = false;	
				}	
				this.populateFormData(this.suForm);
			});
		}else{
			// --- Actually, we can avoid else part but for now, we will keep it...
			this.populateFormData(this.suForm);			
		}  

  	}); 	
	
	this.suForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
	  
	this.onValueChanged(); 
  }
  
  // ============ Populate data in form fields --------------------------------------
  populateFormData(form){
	    if(this.data && this.data !== null){
			form.patchValue({id: this.data['id']});
			form.patchValue({city: this.data['city']});
			form.patchValue({salutation:this.data['salutation']});
			form.patchValue({name:this.data['name']});
			form.patchValue({mobile:this.data['mobile']});
			form.patchValue({emailID: this.data['emailID']});
			form.patchValue({userID: this.setJsonValue(this.data['userID'])});
			form.patchValue({password: this.data['password']});
			form.patchValue({passwordMatch: this.data['password']});
			form.patchValue({profession: this.data['profession']});
			//form.patchValue({isKhojiID: this.setJsonValue(this.data['isKhojiID'])});
			form.patchValue({address1: this.setJsonValue(this.data['address1'])});
			form.patchValue({address2: this.setJsonValue(this.data['address2'])});
			form.patchValue({district: this.setJsonValue(this.data['district'])});
			form.patchValue({country: this.data['country']});
			form.patchValue({state: this.data['state']});
			form.patchValue({dob: this.data['dob']});
			form.patchValue({gender: this.data['gender']});
			form.patchValue({joinedFrom: this.data['joinedFrom']});
			form.patchValue({status: this.data['status']});
			form.patchValue({preferredWayNTime: this.data['preferredWayNTime']});
			form.patchValue({availableOn: this.data['availableOn']});
			form.patchValue({remarks: this.setJsonValue(this.data['remarks'])});
            let usrID: string = this.data['userID'];
            console.log(' -----------signUp.ts ------------ populateFormData() ----------- UID : '+ usrID + '--------uID length: ' + usrID.length);
            if(usrID != 'null' && usrID.length > 0){
                this.khojiIdAvailable = true;
            }
            console.log(' -----------signUp.ts ------------ populateFormData() ----------- khojiIdAvailable : '+ this.khojiIdAvailable);
          
            if(this.data['city'] && this.data['city'].indexOf('-')>0){
                let cityArray = this.data['city'].split("-");	
                console.log("----- SignUp ts ---- populateFormData ---- city ---:"+ this.data['city'] +":---- cityArray ----:" + cityArray);
                form.patchValue({city: cityArray[0], pinCode: cityArray[1]});
            }else{
                form.patchValue({city: this.data['city']});
            }	

            this.selectAvailableOnNpreferredWayNTime();
		}
	  
  }
  //============= ionViewDidLoad Event ----------------------------------------------		
  ionViewDidLoad() {
//    console.log('Hello Sign In Page and once again Page');
  }

// ----------------------------------------------------------------------------
setJsonValue(pVal){
	return (pVal != "null" ? pVal : null);
}
  
  //============= check internet connection -----------------------------------------		
  noConnection() {
	// possible values : unknown, ethernet, wifi, 2g, 3g, 4g, cellular, none  
	return (Network.connection === 'none');
  } 
 
  //============= onValueChange function ---------------------------------------------		
  onValueChanged(data?: any) {
    if (!this.suForm) { return; }
    const form = this.suForm;
        //console.log("----------- SignUp.ts ------ onValueChanged --- form --:" + form);
        for (const field in this.formErrors) {
          // clear previous error message (if any)
          this.formErrors[field] = '';
		  //console.log("----------- SignUp.ts ------ onValueChanged --- field --:" + field);		
		//this.resetNextErrors(field);
          const control = form.get(field);
          if (control && control.dirty) {
				
				//----- Trim the spaces --------------
				//let fVal: String = form.get(field).value;
				//form.patchValue({field: fVal.trim() });
				//form.get(field).updateValue(control.value.trim());
				
				//console.log("----------- SignUp.ts ------ onValueChanged --- control --:" + control.dirty);
                this.invalidForm = false;
                if(!control.valid) {
                  const messages = this.validationMessages[field];
                  for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                  }
                  this.invalidForm = true;
                  //break;
                }
                if (field === 'mobile' && form.get('mobile') && form.get('mobile').value.length == 10 ) {

					this.authPrv.checkMobileExists(form.get('mobile').value).subscribe(data => {
						console.log("---- signUp.ts ---- checkMobileExists ---- data ---:" + data);
						
						// ------ if user already logged in, display signup/ profile page or else Tabs page
	                    if(data == "1"){
							const mobExistsMessages = this.validationMessages[field];
							this.invalidForm = true;
							this.formErrors[field] += mobExistsMessages['mobNumExists']+' ';
						}

					});
					
				}
                if (field === 'passwordMatch') {
                    if(control.value != form.get('password').value){
                        const confPasswordMessages = this.validationMessages[field];
                        this.invalidForm = true;
                        this.formErrors[field] += confPasswordMessages['mismatch']+' ';
                    }
                }
                if(field === 'userID' && form.get('userID').value) {
                    let uID:string = form.get('userID').value;
                    console.log(' -----------signUp.ts ------------ onValueChange() ----------- UID : '+ uID + '--------uID length: ' + uID.length);
                    if(uID != 'null' && uID.length > 0){
                        this.khojiIdAvailable = true;
                    }
                    console.log(' -----------signUp.ts ------------ onValueChange() ----------- khojiIdAvailable : '+ this.khojiIdAvailable);
                    /*if(form.get('userID').value != null && form.get('userID').value != '') {
                        this.khojiIdAvailable = true;
                    }*/
                }
          }
        }

    for (const rField in this.requiredFields) {
        const rControl = form.get(rField);
        //console.log(' -------- signUp.ts ---------onValueChange() ------- ' + rField + ' : ' + rControl.value);
        if(rControl.value === '' || rControl.value === undefined){
            this.invalidForm = true;
        }
    }

  }  
  
  // ------ reset all next field errors -----------------------------------------------------------
/*  resetNextErrors(fld) {
	  let flag = false;
	 for (const field in this.formErrors) {
		if(flag || fld == field){
			if(fld == field){
				flag = true;				
			}else{
				this.formErrors[field] = '';				
			}			
		} 
	 }	 
  }
  */
  // ------ declare required fields -----------------------------------------------------------
  requiredFields = {
        name: '',
        mobile: '',
		emailID: '',
		password: '',
		passwordMatch: ''
  }
  
  // ------ declare form error variables ------------------------------------------------------
  formErrors = {
		salutation: '',
		name: '',
		mobile: '',
		emailID: '',
		userID: '',
		password: '',
		passwordMatch: '',
//		profession: -1,
//		isKhojiID: '',
		address1: '',
		address2: '',
		city: '',
		district: '',
		state: '',
		country: '',
		dob: '',
		gender: '',
		joinedFrom: '',
		status: '',
		preferredWayNTime: '',
		availableOn: '',
		remarks: '',
		monAvailability: '',
		tueAvailability: '',
		wedAvailability: '',
		thuAvailability: '',
		friAvailability: '',
		satAvailability: '',
		sunAvailability: '',
		mobContact: '',
		emailContact: ''
		
  };

  // ------ specify validationMessages ------------------------------------------------
  validationMessages = {
    'salutation': {},
	'name': {
      'required':      'Name is required.',
      'pattern':      'Name can not contain special characters.',
      'minlength':     'Name must be at least 6 characters long.',
      'maxlength':     'Name cannot be more than 120 characters long.'
    },
    'mobile': {
      'required':      'Mobile number is required and must contain only numbers.',
      'minlength':     'Mobile number must be 10 digit long.',
      'maxlength':     'Mobile number must be 10 digit long.',
      'pattern': 	   'Mobile number must contain only numbers',
	  'isValidMobile': 'Please enter valid mobile number',
	  'mobNumExists':  'Mobile number is already registered.'
    },
    'emailID': {
      'required':      'Email address is required.',
      'minlength':     'Email address must be at least 10 characters long.',
      'maxlength':     'Email address cannot be more than 100 characters long.',
      'pattern': 	   'Email address can contain only numbers, letters and @._ characters.',
      'invalidEmail':  'Enter valid email address. It can contain only numbers, letters and @._ characters.'
    },
    'password': {
      'required':      'Password is required.',
      'minlength':     'Password must be at least 6 character long.',
      'maxlength':     'Password cannot be more than 30 characters long.',
      'no_lowerCase':     'Password must contain at least one lower case letter.',
      'no_upperCase':     'Password must contain at least one upper case letter.',
      'no_number':        'Password must contain at least one number.',
      'no_specialChar':   'Password must contain at least one valid (! @ # $ % ^ & * \ _ +) special character.',
      'bad_char':         'Password can only contain these special characters: (! @ # $ % ^ & * \ _ +)',
      'invalidPassword':  'Password must contain at least one number, lower case letter, upper case letter and valid (! @ # $ % ^ & * \ _ +) special character.'
    },
    'passwordMatch': {
      'required':      'Confirm Password is required.',
      'minlength':     'Confirm Password must be at least 6 character long.',
      'maxlength':     'Confirm Password cannot be more than 30 characters long.',
      'mismatch':      'Confirm Password must be same as Password.'
    },
    'dob': {
      'not a number':   'Not a valid date.',          
      'too young':      'Age must not be less than 18 years.',
      'not realistic':  'Age must not be greater than 120 years.'
    },
    'joinedFrom': {
      'wrong date':      'Not a valid Joining date.'    
    }
  };
  
  // ------ show password info ------------------------------------------------------
  showPasswordInfo() {
    this.isPasswordFieldActive = true;
  }

  // ------ hide password info ------------------------------------------------------
  hidePasswordInfo() {
    this.isPasswordFieldActive = false;
  }

  // ------ generate available On and preferredWayNTime strings ---------------------
  selectAvailableOnNpreferredWayNTime(){
	  if(this.data && this.data !== null){
		const form = this.suForm;  
		// ----- set availableOn values -----------------------
		if(this.data['availableOn']){
			let valArray = this.data['availableOn'].split("-");  
			console.log("----- SignUp ts ---- selectAvailableOnNpreferredWayNTime ---- availableOn ---:"+ this.data['availableOn'] +":---- valArray ----:" + valArray);
			form.patchValue({monAvailability: valArray[0], tueAvailability: valArray[1], wedAvailability: valArray[2], thuAvailability: valArray[3], friAvailability: valArray[4], satAvailability: valArray[5], sunAvailability: valArray[6]});
		}
		// ----- set preferredWayNTime values -----------------------
		if(this.data['preferredWayNTime']){
			let pwtArray = this.data['preferredWayNTime'].split("-");	
			console.log("----- SignUp ts ---- selectAvailableOnNpreferredWayNTime ---- preferredWayNTime ---:"+ this.data['preferredWayNTime'] +":---- pwtArray ----:" + pwtArray);
            form.patchValue({mobContact: pwtArray[0], emailContact: pwtArray[1]});
		}	
	  }	
 
  }
  
  // ------ generate available On and preferredWayNTime strings ---------------------
  generateAvailableOnNpreferredWayNTime() {
	// ----- Concatenate all the availibity days -----------
    let retVal: string = this.suForm.get('monAvailability').value + '-' + this.suForm.get('tueAvailability').value + '-' + this.suForm.get('wedAvailability').value + '-' + this.suForm.get('thuAvailability').value + '-' + this.suForm.get('friAvailability').value + '-' + this.suForm.get('satAvailability').value + '-' + this.suForm.get('sunAvailability').value;

    this.suForm.patchValue({availableOn: retVal});
    
	// ----- Concatenate preferredWayNTime values ----------
    retVal = this.suForm.get('mobContact').value + '-' + this.suForm.get('emailContact').value;
	this.suForm.patchValue({preferredWayNTime: retVal});
	  
	  
	// ----- Concatenate preferredWayNTime values ----------
    retVal = this.suForm.get('city').value + '-' + this.suForm.get('pinCode').value;
	this.suForm.patchValue({city: retVal});

    return this.suForm;
  }

  // ------ save SignUp/Profile data ------------------------------------------------
  saveSignUpData() {
    //console.log("--------- signUp.ts --------------- saveSignUpData ----");
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

	this.submitAttempt = true;
    console.log("--------- saveSignUpData ---- suForm valid ---:" + this.invalidForm + ":--- this.suForm.value ----:" + JSON.stringify(this.suForm.value) )
    if(!this.invalidForm){
		// --- set availableOn and preferredWayNTime values
		this.suForm = this.generateAvailableOnNpreferredWayNTime();
      console.log("--------- saveSignUpData ------ b4 authPrv call ---- this.suForm.value ----:" + JSON.stringify(this.suForm.value) );
		this.authPrv.saveSignUpData(this.suForm).subscribe(retData => {
			console.log("---- signUp.ts ---- saveSignUpData ---- retData ---:" + retData);
			this.suForm.patchValue({id: retData});
			
            // ------ Store retData in the storage --------------
			this.storage.set('user', JSON.stringify(this.suForm.value));
          
			// ------ if user already logged in, display signup/ profile page or else Tabs page
			if(!this.data){
                this.events.publish('functionCall:userLoggedIn', 0);
				this.navCtrl.setRoot(TabsPage);
				this.formMsg = "";
			}else{
				this.formMsg = "Profile data saved successfully!";				
			}
			

			//this.data = retData;	
		setTimeout(() => {
			loading.dismiss();
		  }, 1500);
		}, err => {
			console.log('Error from signUp.ts ----- =============:'+ err);	   
		  setTimeout(() => {
			loading.dismiss();
			this.error = err;
		  }, 1500);
		});
		
		//loading.dismiss();			
    }
	
  }
  
  // ------ save SignUp/Profile data ------------------------------------------------
  checMobileNumber() {
/*    if(this.suForm && this.suForm.get("mobile").value.length == 10){

		this.authPrv.checkMobileExists(this.suForm.get("mobile").value).subscribe(data => {
			console.log("---- signUp.ts ---- checMobileNumber ---- data ---:" + data);
			
			// ------ if user already logged in, display signup/ profile page or else Tabs page
			if(data == "true"){
				return false;
			}else{
				return true;
			}
		});
	
	}
*/	
  }
  
}
