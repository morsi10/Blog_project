import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private _userSerice: UserService) { }

  AddArticle(article){
    article.username = this._userSerice.getLoggedUser().username;
    article.creationDate = new Date().toLocaleDateString();
    const articleArr: Article[] = JSON.parse (localStorage.getItem('articleList'));
    if (articleArr !== null){
      console.log(article);
      articleArr.push(article);
      localStorage.setItem('articleList', JSON.stringify(articleArr));
    }else{
      console.log(article);
      const newArticleArray: Article[] = [];
      newArticleArray.push(article);
      localStorage.setItem('articleList', JSON.stringify(newArticleArray));
    }
  }
  findArticlesByUser(){
    const articleList: Article[] = JSON.parse(localStorage.getItem('articleList'));
    if (articleList !==null){
      const userArticles = articleList.filter(data => {
        return data.username === this._userSerice.getLoggedUser().username});
        return userArticles;
    }
    else return [];
    
  }
}
