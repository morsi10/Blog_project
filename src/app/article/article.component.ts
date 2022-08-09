import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ArticleService } from '../shared/article.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  loogedUser;
  articleForm= this.fb.group({
    title : [''],
    description : ['']
  }
   
  )
  constructor(private fb:FormBuilder, private _articleService:ArticleService) { }

  ngOnInit(): void {

  }
  onSubmit(article){
    this._articleService.AddArticle(article);
    
  }

}
