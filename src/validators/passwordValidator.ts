import { FormControl } from '@angular/forms';
 
export class PasswordValidator {
 
static checkPassword(control: FormControl): any {
 
      let password: String = control.value;
      if(password ){
          console.log('---------passwordValidator.ts----------checkPassword()------- password ---:' + password + ':----- Length: ' + password.length);
      }
    
    // -------------Seperate Error Message for each validation --------------
      if (!password){
          console.log('---------passwordValidator.ts----------checkPassword()------- !password ---:' + password + ':-----');
          return{'required': true};
      /*}else if (password.length < 6) {
          return("too_short");
      } else if (password.length > 30) {
          return("too_long");*/
      }else if (password.search(/\d/) == -1) {
          return{'no_number': true};
      } else if (password.search(/[a-z]/) == -1) {
          return {'no_lowerCase': true};
      } else if (password.search(/[A-Z]/) == -1) {
          return {'no_upperCase': true};
      } else if (password.search(/[\!\@\#\$\%\^\&\*\(\)\_\+]/) == -1) {
          return {'no_specialChar': true};
      } else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
          return {'bad_char': true};
      }

    
    // -------------Single generic Error Message for validation --------------
      /*if (password == undefined){
          return{'required': true};
      } else if (password.search(/\d/) == -1) {
          return{'invalidPassword': true};
      } else if (password.search(/[a-z]/) == -1) {
          return {'invalidPassword': true};
      } else if (password.search(/[A-Z]/) == -1) {
          return {'invalidPassword': true};
      } else if (password.search(/[\!\@\#\$\%\^\&\*\(\)\_\+]/) == -1) {
          return {'invalidPassword': true};
      } else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
          return {'invalidPassword': true};
      }*/
    
    
      return null;
  }
 
}