import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CategotiesComponent } from './categories/categories.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { AdminPageComponent } from './admin-panel/admin-page/admin-page.component';
import { CategoryFormComponent } from './admin-panel/category-form/category-form.component';
import { ProductFormComponent } from './admin-panel/product-form/product-form.component';
import { UserPageComponent } from './user-panel/user-page/user-page.component';
import { ModalComponent } from 'src/app/modal/modal.component';
import { ProductsComponent } from './products/products.component';

import { UserServiceService } from './service/user-service.service';
import { DataService } from './service/data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IsAdminGuard } from './Guard/is-admin.guard';

const appRoutes: Routes = [
  { path: 'enter-page', component: FirstPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: CreateAccountComponent },
  { path: '', redirectTo: '/enter-page', pathMatch: 'full' },
  { path: 'admin', component: AdminPageComponent, canActivate: [IsAdminGuard], children: [
    { path: 'create-category', component:  CategoryFormComponent, data: {isAdmin: true} },
    { path: 'categories', component: CategotiesComponent, data: {isAdmin: true} },
    { path: 'categories/:name', component: ProductsComponent, data: {isAdmin: true} },
    { path: 'categories/:name/create-product', component:  ProductFormComponent, data: {isAdmin: true} },
    { path: 'categories/:name/:id', component: ProductsComponent, data: {isAdmin: true} }
  ] },
  { path: 'user', component: UserPageComponent, children: [
    { path: 'categories', component: CategotiesComponent },
    { path: 'categories/:name', component: ProductsComponent },
    { path: 'categories/:name/:id', component: ProductsComponent }
  ] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategotiesComponent,
    CreateAccountComponent,
    FirstPageComponent,
    AdminPageComponent,
    CategoryFormComponent,
    ProductFormComponent,
    UserPageComponent,
    ModalComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule
  ],
  providers: [UserServiceService, DataService, IsAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
