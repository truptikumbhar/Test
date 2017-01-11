import { FormControl } from '@angular/forms';
 
export class MobileValidator {
     static isValidMobile(control: FormControl): any {

		if (!control.value || (control.value && control.value.charAt(0) == "0")) {
		  return {
                  "isValidMobile": true
              };
		}else{
			return null;
		}
		
  }
}  