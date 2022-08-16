import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputValidatorService } from '../shared/input-validator.service';
import { UserService } from '../shared/user.service';
import { passwordMatchValidator } from '../shared/Validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder, private _userService:UserService, private router: Router,
              private _inputValidater: InputValidatorService) { }
  get firstName(){
    return this.registrationForm.get('firstName');
  }
  get lastName(){
    return this.registrationForm.get('lastName');
  }
  get email(){
    return this.registrationForm.get('email');
  }
  get password(){
    return this.registrationForm.get('password');
  }
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword');
  }
  get phone(){
    return this.registrationForm.get('phone');
  }
  get company(){
    return this.registrationForm.get('company');
  }
  get companyAddress(){
    return this.registrationForm.get('companyAddress');
  }
  registrationForm= this.fb.group({
    firstName : ['',[Validators.required , Validators.minLength(5)]],
    lastName : ['',[Validators.required,  Validators.minLength(5)]],
    email : ['',[Validators.required,Validators.email]],
    password : ['',[Validators.required]],
    confirmPassword : ['',[Validators.required]],
    phone : [''],
    company : [''],
    companyAddress : ['']
  }, {validator: [passwordMatchValidator, this._inputValidater.alreadyUsedEmailValidator]})
  ngOnInit(): void {
  }
  onPasswordInput() {
    if (this.registrationForm.hasError('passwordMismatch'))
      this.confirmPassword.setErrors([{'passwordMismatch': true}]);
    else
      this.confirmPassword.setErrors(null);
  }
  onEmailInput() {
    if (this.registrationForm.hasError('emailExist'))
      this.email.setErrors([{'emailExist': true}]);
    else
      this.email.setErrors(null);
  }
  onSubmit(user){
    debugger;
    // deleting the confirm password value because i don't want it to be saved in local storage
    delete user.confirmPassword;
    this._userService.AddUser(user);
    this.router.navigate(['login']);
  }

}
