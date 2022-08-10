import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[]=[];
  constructor(private _articleService: ArticleService) { }

  ngOnInit(): void {
    this.articles = this._articleService.getAll();
  }
  
 
}
