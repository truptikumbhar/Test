import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { AlertController } from 'ionic-angular';

/* ---------------- AuthProvider ---------------------------
*/
@Injectable()
export class AuthProvider {
  usrData: any;
  
  constructor(public http: Http, public storage: Storage, public alertCtrl: AlertController) {
    //console.log('Hello Auth Provider');  52.172.180.17
  }
// ----------------------------------------------------------------------------
  /* When forgot password, send password by an email  */  
  forgotPassword(fpData){
	console.log("--- auth forgotPassword ---- Form Data ---:" + JSON.stringify(fpData.value) + ":---- email ----:" + fpData['emailID']);
    return this.http.get("http://52.172.179.180/mForgot/" + fpData['mobile'] + "/" + fpData['emailID'], {})
                    .map(this.extractData)
                    .catch(this.handleError);	
	  
  }
  
// ----------------------------------------------------------------------------
  /* Change password */  
  changePassword(cpData){
    let cpVals = JSON.stringify(cpData.value);
	console.log("--- auth changePassword ---- Form Data ---:" + JSON.stringify(cpData.value) + ":---- currPassword ----:" + cpData['currPassword']);
	console.log("--- auth changePassword ---- url ---:http://52.172.179.180/mChangePassword/" + cpData.controls['userID'].value + "/" + cpData.controls['currPassword'].value + "/" + cpData.controls['newPassword'].value);
	/*let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://52.172.179.180/mChangePassword" , JSON.stringify(cpData.value), options)
                    .map(this.extractData)
                    .catch(this.handleError);	*/
  return this.http.get("http://52.172.179.180/mChangePassword/" + cpData.controls['userID'].value + "/" + cpData.controls['currPassword'].value + "/" + cpData.controls['newPassword'].value, {})
                    .map(this.extractData)
                    .catch(this.handleError);	
	  
  }
  
// ----------------------------------------------------------------------------
  /* Login with mobile number and password  */  
  loginWithMobile(siData){
	let siVals =  JSON.stringify(siData.value); 
	console.log("--- auth loginWithMobile ---- siVals ---:" + siVals + ":---- mobile ----:" + siData.controls['mobile'].value + ":--- password ----:" + siData.controls['password'].value);
    return this.http.get("http://52.172.179.180/mLogin/" + siData.controls['mobile'].value + "/" + siData.controls['password'].value, {})
                    .map(this.extractData)
                    .catch(this.handleError);	
	  
  }

// ----------------------------------------------------------------------------
  /* Check whether mobile number exsits  */  
  checkMobileExists(mbl){
	console.log("--- auth --- checkMobileExists ---- mbl ---:" + mbl);
	// 52-172-180-17 52.172.180.17     52.172.179.180
    return this.http.get("http://52.172.179.180/mCheckMbleNum/" + mbl, {})
                    .map(this.extractData)
                    .catch(this.handleError);	
					
  }

// ----------------------------------------------------------------------------
  /* Extract User Data for profile if available  */  
  getUserProfileData(mbl){
	console.log("--- auth getUserProfileData ---- mbl ---:" + mbl);
	// 52~172~180~17 52.172.180.17
    return this.http.get("http://52.172.179.180/mProfile/" + mbl, {})
                    .map(this.extractData)
                    .catch(this.handleError);	
	  
  }
 
// ----------------------------------------------------------------------------
getJsonValue(pVal){
	return (pVal ? pVal : "null");
}
// ----------------------------------------------------------------------------
  /* Save Sign Up data */  
  saveSignUpData(suData){
	 let sud =  JSON.parse(JSON.stringify(suData.value).replace(/""/g, "null"));
	console.log("--- authProvider.ts ----- saveSignUpData ---- suData ---:" + sud  + ":--- mobile ---:" + sud['mobile'] + ":---- name ----:" + sud['name']);
	return this.http.get("http://52.172.179.180/mSignUp/" + (sud['id'] ? sud['id'] : -1) + "/" + this.getJsonValue(sud['salutation']) + "/" +  this.getJsonValue(sud['name']) + "/" + this.getJsonValue(sud['mobile']) + "/" + this.getJsonValue(sud['emailID']) + "/" + this.getJsonValue(sud['userID']) + "/" + this.getJsonValue(sud['password']) + "/" + this.getJsonValue(sud['profession']) + "/" + this.getJsonValue(sud['address1']) + "/" + this.getJsonValue(sud['address2']) + "/" + this.getJsonValue(sud['city']) + "/" + this.getJsonValue(sud['district']) + "/" + this.getJsonValue(sud['state']) + "/" + this.getJsonValue(sud['country']) + "/" + this.getJsonValue(sud['dob']) + "/" + this.getJsonValue(sud['gender']) + "/" + this.getJsonValue(sud['joinedFrom']) + "/" + this.getJsonValue(sud['status']) + "/" + this.getJsonValue(sud['preferredWayNTime']) + "/" + this.getJsonValue(sud['availableOn']) + "/" + this.getJsonValue(sud['remarks']) , {})
					.map(this.extractData)
                    .catch(this.handleError);	
	   

  }
  
// ----------------------------------------------------------------------------
  /* Save Sign Up data */  
  oldSaveSignUpData(suData){
	console.log("--- authProvider.ts ----- saveSignUpData ---- suData ---:" + suData.value );

	//let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
	let headers = new Headers({ 'Content-Type': 'text/plain' });
	//let headers = new Headers({ 'Content-Type': 'application/json' });
	//let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
    let options = new RequestOptions({ headers: headers });
    //let inpString =  this.jsonToURLEncoded(suData.value);
    //let inpString = ("tgf" + JSON.stringify(suData.value).replace(/"/g, "~^") + "tgf");
    //let inpString = ("tgf" + JSON.stringify(suData.value).replace(/""/g, "null") + "tgf");
    let inpString = JSON.parse(JSON.stringify(suData.value).replace(/""/g, "null"));
	console.log("--- authProvider.ts ----- saveSignUpData ---- inpString ---:" + inpString);
    return this.http.post("http://52.172.179.180/mSignUp123", inpString, options)
                    .map(this.extractData)
                    .catch(this.handleError);	
	   
//	 return this.http.post("http://52.172.179.180/mSignUp", JSON.stringify(suData.value), options).map(response => response.json());
  }
  
// ----------------------------------------------------------------------------
jsonToURLEncoded(myFormData){
  return Object.keys(myFormData).map(function(key){
		return encodeURIComponent(key) + '=' + encodeURIComponent(myFormData[key]);
	}).join('&');

}
// ----------------------------------------------------------------------------
  /* Extract data  */  
  private extractData(res: Response) {
    console.log("----- auth.js ---- extractData ---- res --:" + res + ":--- ");
	let body = res.json();
	this.usrData = body;
	
    return body || { };
  }
  
// ----------------------------------------------------------------------------
  /* Handle error  */  
  private handleError (error: Response | any) {
	console.error("------ authProvider.ts --- handleError first --- errMsg ---:" + error);  
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
    console.error("------ auth.ts --- handleError --- errMsg ---:" + error);
    return Observable.throw(errMsg);
  }

// ----------------------------------------------------------------------------
  /* Alert user if no internet connection available  */  
	private connectionAlert() {
        let alert = this.alertCtrl.create({
            title: 'Connection Error',
            subTitle: 'Either the internet connection is not available or the network coverage is too weak for updates.  Previously downloaded data will be used.',
            buttons: ['CONTINUE']
        });
        alert.present();
    }  
	
}
