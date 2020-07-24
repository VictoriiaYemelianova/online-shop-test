import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AdminPageComponent } from '../admin-panel/admin-page/admin-page.component';
import { CategoryFormComponent } from '../admin-panel/category-form/category-form.component';
import { ProductFormComponent } from '../admin-panel/product-form/product-form.component';
import { SubcategoryFormComponent } from '../admin-panel/subcategory-form/subcategory-form.component';

const routes: Routes = [
  { path: '', component: AdminPageComponent, children: [
    { path: 'create-category', component:  CategoryFormComponent, data: {isAdmin: true} },
    { path: 'create-subcategory', component:  SubcategoryFormComponent, data: {isAdmin: true} },
    { path: 'create-product', component:  ProductFormComponent, data: {isAdmin: true} },
    { path: 'categories', loadChildren: () => import('./categories.module').then(m => m.CategoriesModule), data: {isAdmin: true} },
    { path: 'categories/:category',
      loadChildren: () => import('./product-wrapper.module').then(m => m.ProductWrapperModule), data: {isAdmin: true} },
    { path: 'categories/:name/:subname',
      loadChildren: () => import('./product-wrapper.module').then(m => m.ProductWrapperModule) }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModule { }
