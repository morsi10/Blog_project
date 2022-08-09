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

  constructor(private fb:FormBuilder, private _userService:UserService, private router:Router,
              private auth:AuthService) { }
  loginForm= this.fb.group({
    username : [''],
    password : ['']
  })
  ngOnInit(): void {
  }
  onSubmit(user){
   const foundUser:User[] = this._userService.FindUser(user);
   console.log(foundUser);
   console.log(foundUser.length);
   if (foundUser.length > 0){
    console.log('found');
   /* this.auth.isLogged = true;*/
    /*localStorage.setItem('token',"aaaaaa");*/
    localStorage.setItem('token', JSON.stringify(foundUser));
    this.router.navigate(['dashboard']);
   }else{
    alert('username or password are incorrects')
   }
  }

}
