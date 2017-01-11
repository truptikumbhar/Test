import { FormControl } from '@angular/forms';
 
export class RemainingAmtDateValidator {
     static isValid(control: FormControl): any {
        if(control.value != null) {
             let todaysDate = new Date();
            let remAmtByDate = new Date(control.value);
               
  if (todaysDate >= remAmtByDate )
      {
          console.log("---- remainingAmtDateValidator.ts ---- isValid ---- data ------:"+remAmtByDate );

              return {
                  "wrong date": true
              };
      }
        }else
          return null;
      }
  }