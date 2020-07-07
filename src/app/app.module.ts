import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { ShopBasketComponent } from './user-panel/shop-basket/shop-basket.component';

import { UserServiceService } from './service/user-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IsAdminGuard } from './Guard/is-admin/is-admin.guard';
import { UserGuard } from './Guard/is-user/user.guard';
import { ClickOutsideDirective } from './click-outside.directive';
import { ParamInterceptor } from './param.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SubcategoryComponent } from './subcategory/subcategory.component';

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
    ProductsComponent,
    ShopBasketComponent,
    ClickOutsideDirective,
    SubcategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    UserServiceService,
    IsAdminGuard,
    UserGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
