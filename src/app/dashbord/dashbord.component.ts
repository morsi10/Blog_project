import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleComponent } from '../article/article.component';
import { Article } from '../models/article';
import { ArticleService } from '../shared/article.service';
import { UserService } from '../shared/user.service';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})

export class DashbordComponent implements OnInit {

  constructor(public dialog:MatDialog, private _userSerivce: UserService, private _articleService:ArticleService) { }
  displayedColumns: string[] = ['title', 'description', 'creationDate'];
  dataSource = this._articleService.findArticlesByUser();
  ngOnInit(): void {

  }
  openDialog(){
    let dialogRef =this.dialog.open(ArticleComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = this._articleService.findArticlesByUser();
    });
  }
}
