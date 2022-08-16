import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleComponent } from '../article/article.component';
import { Article } from '../models/article';
import { ArticleService } from '../shared/article.service';
import { UserService } from '../shared/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../models/user';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})


export class DashbordComponent implements OnInit {
  opened =true;
  currentUser: User ;
  
  constructor(public dialog:MatDialog, private _userService: UserService, 
              private _articleService:ArticleService, private router: Router) { }
  displayedColumns: string[] = ['title', 'description', 'creationDate', 'actions'];
  dataSource = new MatTableDataSource(this._articleService.findArticlesByUser()) ;
  ngOnInit(): void {
    this.currentUser = this._userService.getLoggedUser();
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
}
