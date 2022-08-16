import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ArticleService } from '../shared/article.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  selectedFile;
  url;
  articleForm= this.fb.group({
    title : [''],
    description : ['']
  }

   
  )
  constructor(private fb:FormBuilder, private _articleService:ArticleService, 
              @Inject(MAT_DIALOG_DATA) public data:any,
              private http: HttpClient) { }

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
  onSelectFile(event){
    if(event.target.files){
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event:any)=>{
    /*this.url=event.target.result;*/
    localStorage.setItem('images', event.target.result)
      this.url = localStorage.getItem('images');
      this._articleService.ArticleImage = event.target.result;
    }
    
  }
 /* this.selectedFile = event.target.files[0];*/
  }
  onUpload(){
    const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        this.http.post('/assets', fd)
          .subscribe(res => {
            console.log(res);
          });
  }

}

