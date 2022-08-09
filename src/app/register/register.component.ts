import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder, private _userService:UserService, private router: Router) { }
  registrationForm= this.fb.group({
    username : [''],
    password : [''],
    company : ['']
  })
  ngOnInit(): void {
  }
  onSubmit(user){
    debugger;
    this._userService.AddUser(user);
    this.router.navigate(['login']);
  }

}
