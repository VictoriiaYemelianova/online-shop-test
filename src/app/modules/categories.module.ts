import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { CategotiesComponent } from '../categories/categories.component';

const routes: Routes = [
  { path: '', component: CategotiesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesModule { }
