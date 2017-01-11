import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Network} from 'ionic-native';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';

import { TabsPage } from '../../tabs/tabs';
import { MakeDonationPage } from '../../pages/makeDonation/makeDonation';
import { SignInPage } from '../../auth/signIn/signIn';

import { RemainingAmtDateValidator } from  '../../../validators/remainingAmtDateValidator';
import { DonationProvider } from '../../../providers/donationProvider';
/*  ================= make donation ======================== */
/* ----------------  -------------
login id of CCAvenue for INR Donation 
web_10653 (login)
Vachan17&SS
*/
@Component({
  selector: 'page-paymentGateway',
  templateUrl: 'paymentGateway.html',
})

export class PaymentGatewayPage {
  error: any;
  form: any;
  submitAttempt: boolean = false;
  pgURL: any;
  usrData: any;
  dntData: any;
  
  // ----- Define the constructor -------------------------------------
  constructor(public navCtrl: NavController, private donation: DonationProvider, public sanitizer: DomSanitizer, public storage: Storage) {
  
   
	// ---- if user data is not available, go to the signIn page ------
     this.storage.get('user').then((val) => {
        this.usrData = JSON.parse(val);		 
		 console.log("----- paymentGateway.ts ----- constructor --- user ----:" + val + ":--- usrData ---:" + this.usrData + ":--- id --:" + this.usrData.id + ":--- u id ---:" + this.usrData );
		 
		 
	// ---- if donation data is not available, go to the signIn page ------
     this.storage.get('newDonation').then((dval) => {
        this.dntData = JSON.parse(dval);		 
		console.log("----- paymentGateway.ts ----- constructor --- donation ----:" + dval + ":--- dntData ---:" + this.dntData + ":--- id --:" + this.dntData.id + ":--- u id ---:" + this.dntData);

		let nm = this.usrData.name.split(' ');
		let dangerousVideoUrl = 'http://payment.billcloud.in/Request/OnlinePaymentRequest.jsp?Biller=TF&Service=Donation&BillerId=Payment&CustomerId='+ this.usrData.id + '&ReferenceId=' + this.dntData.id + '&TxnAmount=' + this.dntData.todaysAmount + '&ResponseUrl=http://52.172.180.17/mDonConfirm/&Editable=false&FirstName=' + (nm[0] ? nm[0] : '-') + '&MiddleName=' + (nm[2] ? nm[1] : '-') + '&LastName=' + (nm[2] ? nm[2] : (nm[1] ? nm[1] : '-')) + '&Address1=' + (this.usrData.address1 ? this.usrData.address1 : '-') +  '&Country=' + (this.usrData.country ? this.usrData.country : '-') + '&State=' + (this.usrData.state ? this.usrData.state : '-') +  '&City=' + (this.usrData.city ? this.usrData.city : '-') +'&ZipCode=' + (this.usrData.pincode ? this.usrData.pincode : '-') + '&AddInfo1=a&AddInfo2=b&AddInfo3=c&AddInfo4=d&AddInfo5=e';
		this.pgURL =  this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
		
		//Depending on, how transaction goes through, navigate to the appropriate page
		//this.navCtrl.push(MakeDonationPage);	
		});
	});
	
	 
    //let dangerousVideoUrl = 'https://www.youtube.com/embed/wRHBwykH_UU';
	//this.pgURL =  this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
	//window.location.href='http://103.224.241.94:8085/PaymentBillCloud/Request/OnlinePaymentRequest.jsp?Biller=BillCloud&Service=Payment&BillerId	=12345&CustomerId=TGF1234&ReferenceId=DUMMY1234&TxnAmount=400.0&ResponseUrl=http://52.172.180.17/mDonConfirm/&Editable=false&FirstName=Ravikiran&MiddleName=Tukaram&LastName=Indore&Address1=aa&Country=India&State=Maha&City=Pune&ZipCode=411017&AddInfo1=a&AddInfo2=b&AddInfo3=c&AddInfo4=d&AddInfo5=e';	
	//this.pgURL=;	

  }
 
}
