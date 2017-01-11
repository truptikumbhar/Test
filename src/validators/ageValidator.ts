import { FormControl } from '@angular/forms';
 
export class AgeValidator {
     static isValid(control: FormControl): any {
        if(control.value != null) {
          let today = new Date();
          let birthDate = new Date(control.value);
          let age = today.getFullYear() - birthDate.getFullYear();
          let m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
          {
              age--;
          }
          console.log("---- ageValidator.ts ----  ---- age ---: " + age);

           if(isNaN(age)){
             console.log("---- ageValidator.ts ---- isValid ---- data ---: isNaN ---:" + age);

              return {
                  "not a number": true
              };
          }

          /*if(age % 1 !== 0){
               console.log("---- ageValidator.ts ---- isValid ---- data ---: !=0 ---:" + age);

              return {
                  "not a whole number": true
              };
          }*/

          if(age < 7){
               console.log("---- ageValidator.ts ---- isValid ---- data ---: <7 ---:" + age);

              return {
                  "too young": true
              };
          }

          if (age > 120){
             console.log("---- ageValidator.ts ---- isValid ---- data ---: >120 ---:" + age);

              return {
                  "not realistic": true
              };
          }
          
          //return null;
        }else
          return null;
      }
  }