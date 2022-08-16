import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor() { }

  AddUser(user){
    user.profileCover ='';
    user.profilePhoto = '';
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
      return data.email === user.email && data.password === user.password});
      return found
  }
  getLoggedUser() : User{
    
    let loggedUser = JSON.parse(localStorage.getItem('token'));
    console.log(loggedUser);
    return loggedUser;
  }
  FindUserByEmail(email: String) : User[]{
    /*console.log(user.password);
     console.log(user);*/
     const userList: User[] = JSON.parse(localStorage.getItem('userList'));
     if(userList !== null){
      const found = userList.filter(data => {
        return data.email === email});
        return found
     }else{
      return [];
     }
   }
   editUser(user){
    const userList: User[] = JSON.parse(localStorage.getItem('userList'));
    const index = userList.findIndex((object)=>{
      return object.email === user.email; 
  })
  //article.image_url = this.ArticleImage;
  userList[index] = user;
    localStorage.setItem('userList', JSON.stringify(userList));
    
  }
}
