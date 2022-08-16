import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { passwordMatchValidator } from '../shared/Validator';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {
  currentUser ;
  get firstName(){
    return this.editProfileForm.get('firstName');
  }
  get lastName(){
    return this.editProfileForm.get('lastName');
  }
  get password(){
    return this.editProfileForm.get('password');
  }
  get confirmPassword(){
    return this.editProfileForm.get('confirmPassword');
  }
  
  editProfileForm= this.fb.group({
    firstName : ['',[Validators.required , Validators.minLength(5)]],
    lastName : ['',[Validators.required , Validators.minLength(5)]],
    password : ['',[Validators.required]],
    confirmPassword : ['',[Validators.required]],
    phone : [''],
    company : [''],
    companyAddress : ['']
  }, {validator: [passwordMatchValidator]}
  )
  constructor(private fb:FormBuilder, private _userService:UserService) { }

  ngOnInit(): void {
    this.currentUser = this._userService.getLoggedUser();

    this.editProfileForm.patchValue(this.currentUser);
  }
  onSubmit(profile){
    profile.email = this.currentUser.email;
    profile.profileCover = this.currentUser.profileCover;
    profile.profilePhoto = this.currentUser.profilePhoto;
    this._userService.editUser(profile);
    delete profile.confirmPassword;
    localStorage.setItem('token', JSON.stringify(profile));
  }
  onPasswordInput() {
    if (this.editProfileForm.hasError('passwordMismatch'))
      this.confirmPassword.setErrors([{'passwordMismatch': true}]);
    else
      this.confirmPassword.setErrors(null);
  }
}
