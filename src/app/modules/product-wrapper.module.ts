import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ProductWrapperComponent } from '../product-wrapper/product-wrapper.component';

const routes: Routes = [
  { path: '', component: ProductWrapperComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductWrapperModule { }
