import { FormControl } from '@angular/forms';
 
export class EmailValidator {
     static isValidEmail(control: FormControl): any {
        let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!control.value || !EMAIL_REGEXP.test(control.value)) {
//		  console.log("---- EmailValidator --- if ---:" + control.toString() + ":---- value ----:" + control.value);	
		  return {
                  "invalidEmail": true
              };
		}else{
//			console.log("---- EmailValidator --- else ---:" + control.toString() + ":---- value ----:" + control.value);	
			return null;
		}
		
  }
}  