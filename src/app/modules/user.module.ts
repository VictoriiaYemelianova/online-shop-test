import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { UserPageComponent } from '../user-panel/user-page/user-page.component';
import { ShopBasketComponent } from '../user-panel/shop-basket/shop-basket.component';

const routes: Routes = [
  { path: '', component: UserPageComponent, children: [
    { path: 'categories', loadChildren: () => import('./categories.module').then(m => m.CategoriesModule) },
    { path: 'categories/:name',
      loadChildren: () => import('./product-wrapper.module').then(m => m.ProductWrapperModule) },
    { path: 'categories/:name/:subname',
      loadChildren: () => import('./product-wrapper.module').then(m => m.ProductWrapperModule) },
    { path: 'basket', component: ShopBasketComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModule { }
