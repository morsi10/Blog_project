import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private _userSerice: UserService) { }
  latestId;
  ArticleImage;
  getLatestId(){
    let lastId:string = localStorage.getItem('LastId');
    if(lastId == null){
      localStorage.setItem('LastId', "1");
      return 1;
    }else {
      lastId = (Number(lastId) + 1).toString();
      localStorage.setItem('LastId',lastId);
      return Number(lastId);
    }
  }

  AddArticle(article) {
    
    article.username = this._userSerice.getLoggedUser().username;
    article.creationDate = new Date().toLocaleDateString();
    article.image_url = this.ArticleImage;
    const articleArr: Article[] = JSON.parse(localStorage.getItem('articleList'));

    if (articleArr !== null) {
      article.id = this.getLatestId();
      console.log(article);
      articleArr.push(article);
      localStorage.setItem('articleList', JSON.stringify(articleArr));
     
    } else {
     
      article.id = this.getLatestId();
      console.log(article);
      const newArticleArray: Article[] = [];
      newArticleArray.push(article);
      localStorage.setItem('articleList', JSON.stringify(newArticleArray));
     
    }
  }
  findArticlesByUser() {
    const articleList: Article[] = JSON.parse(localStorage.getItem('articleList'));
    if (articleList !== null) {
      const userArticles = articleList.filter(data => {
        return data.username === this._userSerice.getLoggedUser().username
      });
      return userArticles;
    }
    else return [];
  }
  deleteArticle(id){
    const articleList: Article[] = JSON.parse(localStorage.getItem('articleList'));
    const index = articleList.findIndex((object)=>{
      return object.id === id; 
    })
    console.log(index);
    if(index !== -1){
      articleList.splice(index,1);
      localStorage.setItem('articleList', JSON.stringify(articleList));
    }
  }
  editArticle(article){
    const articleList: Article[] = JSON.parse(localStorage.getItem('articleList'));
    const index = articleList.findIndex((object)=>{
      return object.id === article.id; 
  })
  article.image_url = this.ArticleImage;
    articleList[index] = article;
    localStorage.setItem('articleList', JSON.stringify(articleList));
    
  }
  getAll(){
    const articleList: Article[] = JSON.parse(localStorage.getItem('articleList'));
    return articleList;
  }
}
