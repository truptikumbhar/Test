import { FormControl } from '@angular/forms';
 
export class JoinDateValidator {
     static isValid(control: FormControl): any {
        if(control.value != null) {
             let todaysDate = new Date();
            let joinFrom = new Date(control.value);
             //let joinFromDate = joinFrom.getFullYear()
          let foundationDate = new Date('15-AUG-1997');
  if ( joinFrom < foundationDate ||todaysDate <= joinFrom )
      {
          console.log("---- joinDateValidator.ts ---- isValid ---- data ------:"+joinFrom );

              return {
                  "wrong date": true
              };
      }
            
           /*if ( todaysDate <= foundationDate  )
      {
          console.log("---- joinDateValidator.ts ---- isValid ---- data ------:"+joinFrom );

              return {
                  "wrong date": true
              };
      }*/
                         
          //return null;
        }else
          return null;
      }
  }