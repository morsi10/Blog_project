import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleComponent } from '../article/article.component';
import { Article } from '../models/article';
import { ArticleService } from '../shared/article.service';
import { UserService } from '../shared/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})



export class DashbordComponent implements OnInit {
  opened =true;
  currentUser: User ;
  
  constructor(public dialog:MatDialog, private _userService: UserService, 
              private _articleService:ArticleService, private router: Router,
              private _snackBar: MatSnackBar) { }
  displayedColumns: string[] = ['title', 'description', 'creationDate', 'actions'];
  dataSource = new MatTableDataSource(this._articleService.findArticlesByUser()) ;
  ngOnInit(): void {
    this.currentUser = this._userService.getLoggedUser();
    this.currentUser = this._userService.getLoggedUser();
    if (this.currentUser.profileCover == "") {
      this.currentUser.profileCover = "assets/default-cover.jpg";
    }
    if (this.currentUser.profilePhoto == "") {
      this.currentUser.profilePhoto = "assets/default-photo.png";
    }
  }
  
  addArticle(){
    let dialogRef =this.dialog.open(ArticleComponent, {data : {action:'add'}});
    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = new MatTableDataSource(this._articleService.findArticlesByUser());
    });
  }
  deleteArticle(row:Article){
   this._articleService.deleteArticle(row.id);
   this.dataSource = new MatTableDataSource(this._articleService.findArticlesByUser());
   this._snackBar.open('item deleted', '', {"duration": 2000});
  }
  editArticle(row:Article){
    let dialogRef =this.dialog.open(ArticleComponent, {data: {row, action: 'edit'}});
    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = new MatTableDataSource(this._articleService.findArticlesByUser());
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  viewArticles(){
    this.router.navigate(['articles']);
  }
  ShowProfil(){
    this.router.navigate(['profile']);
  }
  openDeleteDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
}
