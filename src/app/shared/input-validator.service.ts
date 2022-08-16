import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class InputValidatorService {

  constructor(private _userService:UserService) { }
 public alreadyUsedEmailValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    let user:User[];
   
    const email = formGroup.get('email');
    if (email?.pristine && email?.untouched ){
      return null
    }else{
      user = this._userService.FindUserByEmail(formGroup.get('email').value)
      console.log(user);
      if(user.length > 0){
        return {emailExist: true};   
      }else
      return null;
    }
    
  }
   
  
}
