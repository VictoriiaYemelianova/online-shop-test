import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AdminPageComponent } from '../admin-panel/admin-page/admin-page.component';
import { CategoryFormComponent } from '../admin-panel/category-form/category-form.component';
import { ProductFormComponent } from '../admin-panel/product-form/product-form.component';

const routes: Routes = [
  { path: '', component: AdminPageComponent, children: [
    { path: 'create-category', component:  CategoryFormComponent, data: {isAdmin: true} },
    { path: 'categories', loadChildren: () => import('./categories.module').then(m => m.CategoriesModule), data: {isAdmin: true} },
    { path: 'categories/:name', loadChildren: () => import('./products.module').then(m => m.ProductsModule), data: {isAdmin: true} },
    { path: 'categories/:name/create-product', component:  ProductFormComponent, data: {isAdmin: true} },
    // { path: 'categories/:name/:id', data: {isAdmin: true} }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModule { }
