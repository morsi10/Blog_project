import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor() { }

  AddUser(user){
    const oldRecords = localStorage.getItem('userList');
    if (oldRecords !== null){
      const userList: User[] = JSON.parse(oldRecords);
      userList.push(user);
      localStorage.setItem('userList', JSON.stringify(userList));
    } else{
      const userArr: User[] = [];
      userArr.push(user);
      localStorage.setItem('userList', JSON.stringify(userArr));
      console.log(user);
    }
  }

  FindUser(user:User) : User[]{
   /*console.log(user.password);
    console.log(user);*/
    const userList: User[] = JSON.parse(localStorage.getItem('userList'));
    const found = userList.filter(data => {
      return data.username === user.username && data.password === user.password});
      return found
  }
  getLoggedUser() : User{
    let loggedUser = JSON.parse(localStorage.getItem('token'))
    /*console.log(loggedUser[0])*/
    return loggedUser[0];
  }
}
