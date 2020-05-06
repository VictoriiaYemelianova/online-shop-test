import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { UserPageComponent } from '../user-panel/user-page/user-page.component';
import { ShopBasketComponent } from '../user-panel/shop-basket/shop-basket.component';

const routes: Routes = [
  { path: '', component: UserPageComponent, children: [
    { path: 'categories', loadChildren: () => import('./categories.module').then(m => m.CategoriesModule) },
    { path: 'categories/:name', loadChildren: () => import('./products.module').then(m => m.ProductsModule) },
    { path: 'basket', component: ShopBasketComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModule { }
