import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { User } from '../models/user';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show;
  constructor(private fb:FormBuilder, private _userService:UserService, private router:Router,
              private auth:AuthService) { }
  loginForm= this.fb.group({
    email : [''],
    password : [''],
    remembered: [false]
  })
  get remembered(){
    return this.loginForm.get('remembered');
  }
  ngOnInit(): void {
   let token = localStorage.getItem('token');
    
    if(token && JSON.parse(token).remembered == true){
     /* this.router.navigate(['dashboard']);*/
     this.loginForm.patchValue(JSON.parse(token));
    } 
  }
  onSubmit(user){
   const foundUser:User[] = this._userService.FindUser(user);
   console.log(foundUser);
   console.log(foundUser.length);
   if (foundUser.length > 0){
    console.log(foundUser);
    /* this.auth.isLogged = true;*/
    /*localStorage.setItem('token',"aaaaaa");*/
    
    localStorage.removeItem('token');
    localStorage.setItem('token', JSON.stringify(Object.assign(foundUser[0],{'remembered':user.remembered})));
    this.router.navigate(['dashboard']);
   }else{
    alert('username or password are incorrects')
   }
  }
  showPassword(input){
   // input.type = input.type === 'password' ?  'text' : 'password';
   if(input.type == 'password'){
    input.type = 'text';
    this.show = true; 
   }else{
    input.type = 'password';
    this.show = false;
   }

  }
}
