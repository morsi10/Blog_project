import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user';

import { UserService } from '../shared/user.service';
import { UserProfileEditComponent } from '../user-profile-edit/user-profile-edit.component';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  constructor(private _userService: UserService, private dialog: MatDialog) { }

  currentUser: User = { firstName: "", lastName: "", email: "", password: "", phone: "", company: "", companyAddress: "", profileCover: "", profilePhoto: "" };
  ngOnInit(): void {
   // debugger;
    this.currentUser = this._userService.getLoggedUser();
    if (this.currentUser.profileCover == "") {
      this.currentUser.profileCover = "assets/default-cover.jpg";
    }
    if (this.currentUser.profilePhoto == "") {
      this.currentUser.profilePhoto = "assets/default-photo.png";
    }
  }
  onSelectedFile(event, action) {
    if (event.target.files) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        console.log(event.target.result);
       // debugger;
        if (action == 'photo') {
          this.currentUser.profilePhoto = event.target.result;

        }
        else if (action == 'cover') {
          this.currentUser.profileCover = event.target.result;
        }
        this._userService.editUser(this.currentUser);
        localStorage.setItem('token', JSON.stringify(this.currentUser));

      }

    }
  }
  openEditDialog() {
    let dialogRef = this.dialog.open(UserProfileEditComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
