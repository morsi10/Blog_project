import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ArticleService } from '../shared/article.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(private fb:FormBuilder, private _articleService:ArticleService, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    if(this.data.action == 'edit'){
      this.articleForm.patchValue(this.data.row)
    }
  }
  onSubmit(article, data)
  { 
    if(data.action == 'add'){
    this._articleService.AddArticle(article);
    }else if(data.action == 'edit'){
      article.id = data.row.id;
      article.creationDate = data.row.creationDate;
      article.username = data.row.username;
      this._articleService.editArticle(article);
    }
    
    
  }

}

