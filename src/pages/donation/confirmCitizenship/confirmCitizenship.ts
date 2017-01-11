import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Network} from 'ionic-native';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';

import { TabsPage } from '../../tabs/tabs';
import { PaymentGatewayPage } from '../paymentGateway/paymentGateway';

import { DonationProvider } from '../../../providers/donationProvider';
/*  ================= confirm residency ======================== */
@Component({
  selector: 'page-confirmCitizenship',
  templateUrl: 'confirmCitizenship.html',
})

export class ConfirmCitizenshipPage {
  error: any;
  form: any;
  submitAttempt: boolean = false;
  isIndianCitizen: boolean = false;
  donAmount: any;
  pgURL: any;
  usrData: any;
  dntData: any;
  
  // ----- Define the constructor -------------------------------------
  constructor(public navCtrl: NavController, private donation: DonationProvider, public sanitizer: DomSanitizer, public storage: Storage) {

	// ---- set the donation amount -----------------------------------
     /*this.storage.get('newDonation').then((dval) => {
        let dData = JSON.parse(dval);
        this.donAmount = dData['todaysAmount'];		 
		console.log("----- confirmCitizenship.ts ----- constructor --- todaysAmount ---:" + this.donAmount);
	 });*/

  }

  // ========================================================================
  // --------------- Page Specific functions --------------------------------
  // ========================================================================

  // ------ check internet connection ---------------------------------------		
  noConnection() {
	// possible values : unknown, ethernet, wifi, 2g, 3g, 4g, cellular, none  
	return (Network.connection === 'none');
  } 

  // ---- in case, if user is not an Indian citizen   
  loadLandingPage(){
	  this.navCtrl.setRoot(TabsPage);	
  }  
  
  // ---- in case, if user is an Indian citizen
  loadPaymentGatewayPage(){
	if(this.isIndianCitizen){  
	  //this.navCtrl.push(PaymentGatewayPage);
      //**********************************************
      // ---- if user data is not available, go to the signIn page ------
         this.storage.get('user').then((val) => {
            this.usrData = JSON.parse(val);		 
             console.log("----- paymentGateway.ts ----- constructor --- user ----:" + val + ":--- usrData ---:" + this.usrData + ":--- id --:" + this.usrData.id + ":--- u id ---:" + this.usrData );


        // ---- if donation data is not available, go to the signIn page ------
         this.storage.get('newDonation').then((dval) => {
            this.dntData = JSON.parse(dval);		 
            console.log("----- paymentGateway.ts ----- constructor --- donation ----:" + dval + ":--- dntData ---:" + this.dntData + ":--- id --:" + this.dntData.id + ":--- u id ---:" + this.dntData);

            let nm = this.usrData.name.split(' ');
            let dangerousVideoUrl = 'http://payment.billcloud.in/Request/OnlinePaymentRequest.jsp?Biller=TF&Service=Donation&BillerId=Payment&CustomerId='+ this.usrData.id + '&ReferenceId=' + this.dntData.id + '&TxnAmount=' + this.dntData.todaysAmount + '&ResponseUrl=http://52.172.179.180/mDonConfirm/&Editable=false&FirstName=' + (nm[0] ? nm[0] : '-') + '&MiddleName=' + (nm[2] ? nm[1] : '-') + '&LastName=' + (nm[2] ? nm[2] : (nm[1] ? nm[1] : '-')) + '&Address1=' + (this.usrData.address1 ? this.usrData.address1 : '-') +  '&Country=' + (this.usrData.country ? this.usrData.country : '-') + '&State=' + (this.usrData.state ? this.usrData.state : '-') +  '&City=' + (this.usrData.city ? this.usrData.city : '-') +'&ZipCode=' + (this.usrData.pincode ? this.usrData.pincode : '-') + '&EmailId=' + (this.usrData.emailID ? this.usrData.emailID : '-') + '&MobileNo=' + (this.usrData.mobile ? this.usrData.mobile : '-') + '&AddInfo1=a&AddInfo2=b&AddInfo3=c&AddInfo4=d&AddInfo5=e';
            this.pgURL =  this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);

            //window.location.href="http://helpdesk.tejgyan.org"; 
            //window.location.href=this.pgURL; 
            window.location.href=dangerousVideoUrl; 
            });
        });
      //**********************************************
      
    }else{
	  this.navCtrl.setRoot(TabsPage);	
	}  
  }  
}
