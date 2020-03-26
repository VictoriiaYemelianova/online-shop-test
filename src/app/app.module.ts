import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {Routes, RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CategotiesComponent } from './categoties/categoties.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { ClothingComponent } from './clothing/clothing.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

const appRoutes: Routes = [
  { path: '', component: FirstPageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'categories', component:  CategotiesComponent },
  { path: 'clothing', component: ClothingComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategotiesComponent,
    CreateAccountComponent,
    FirstPageComponent,
    ClothingComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
