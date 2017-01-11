import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { AlertController } from 'ionic-angular';

/* ---------------- DonationProvider ------------------------------
*/
@Injectable()
export class DonationProvider {
  usrData: any;
  
  constructor(public http: Http, public storage: Storage, public alertCtrl: AlertController) {

  }
  
  // ----- Save DOnation data --------------------------------------
  saveDonationData(usrData, dnData){
	console.log("--- donation.ts ---- saveDonationData ---- usrData ---:" + usrData + ":---- dnData ---:" + JSON.stringify(dnData.value) );

	//let headers = new Headers({ 'Content-Type': 'text/plain' });
    //let options = new RequestOptions({ headers: headers });
	let dnt =  JSON.parse(JSON.stringify(dnData.value).replace(/""/g, "null"));
	console.log("--- donation.ts ---- saveDonationData ---- first POST dnData ---:" + JSON.stringify(dnt) );
	//let tranID = this.http.post("http://52.172.179.180/mDonation", JSON.stringify(dnData.value), options)
	// /:userID/:contributeTo/:contributeFreq/:paymentMode/:amount/:todaysAmount/:remAmtByDate/:reminderPeriod/:donationReceipt
	return this.http.get("http://52.172.179.180/mDonationGET/" + dnt['userID'] + "/" + dnt['contributeTo'] + "/" + dnt['contributeFreq'] + "/" + dnt['paymentMode'] + "/" + dnt['amount'] + "/" + dnt['todaysAmount'] + "/" + dnt['remAmtByDate'] + "/" + dnt['reminderPeriod'] + "/" + dnt['donationReceipt'], {})
                    .map(this.extractData)
                    .catch(this.handleError);	
	//console.log("--- donation.ts ---- saveDonationData ---- after POST dnData ---:" + tranID );
	
	//return this.http.get("http://103.224.241.94:8085/PaymentBillCloud/Request/OnlinePaymentRequest.jsp?Biller=BillCloud&Service=Payment&BillerId=12345&CustomerId=TGF1234&ReferenceId=DUMMY1234&TxnAmount=400.0&ResponseUrl=http://52.172.179.180/mDonConfirm&Editable=false&FirstName=Ravikiran&MiddleName=Tukaram&LastName=Indore&Address1=aa&Country=India&State=Maha&City=Pune&ZipCode=411017&AddInfo1=a&AddInfo2=b&AddInfo3=c&AddInfo4=d&AddInfo5=e", {})
    //                .map(this.extractData)
    //                .catch(this.handleError);	  
	
	//return tranID;	
  }
  
  // ----- List Donation data --------------------------------------
  listDonationData(usrData, dnData){
	let dnVals =  JSON.stringify(dnData.value); 
	console.log("--- donation --- listDonationData ---- dnData ---:" + dnData + ":---- fromDate ----:" + dnData.controls['fromDate'].value + ":--- toDate ----:" + dnData.controls['toDate'].value + ":--- contributeTo ----:" +  dnData.controls['contributeTo'].value + ":--- AMt due by ----:" +  dnData.controls['remAmtByDate'].value  ) ;
    return this.http.get("http://52.172.179.180/mDonationList/" + dnData.controls['fromDate'].value + "/" + dnData.controls['toDate'].value + "/" +  dnData.controls['contributeTo'].value + "/" + dnData.controls['remAmtByDate'].value, {})
                    .map(this.extractData)
                    .catch(this.handleError);	
	  
  }

  
  private extractData(res: Response) {
    let body = res.json();
	this.usrData = body;
	console.log("----- donation.ts ---- extractData ---- res --:" + res + ":---- body ---:" + body + ":--- body.data ---:" + body.data);
    return body || { };
  }
  
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
	
	// --- check connection and assign usrData if already available
	//this.connectionAlert();
    console.error("------ donation.ts --- handleError --- errMsg ---:" + errMsg);
    return Observable.throw(errMsg);
  }

	private connectionAlert() {
        let alert = this.alertCtrl.create({
            title: 'Connection Error',
            subTitle: 'Either the internet connection is not avaible or the network coverage is too weak for updates.  Previously downloaded data will be used.',
            buttons: ['CONTINUE']
        });
        alert.present();
    }  

}
