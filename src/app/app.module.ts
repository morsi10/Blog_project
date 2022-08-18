import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ArticleComponent } from './article/article.component';
import { HttpClientModule} from '@angular/common/http';
import { ArticlesComponent } from './articles/articles.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    routingComponents,
    RegisterComponent,
    DashbordComponent,
    ArticleComponent,
    ArticlesComponent,
    UserProfilComponent,
    UserProfileEditComponent,
    PageNotFoundComponent
  ],
  entryComponents: [ArticleComponent, UserProfileEditComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
