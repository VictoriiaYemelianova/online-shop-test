import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router} from '@angular/router';

import { ProductsComponent } from '../products/products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsModule { }
