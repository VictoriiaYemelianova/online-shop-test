import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { IsAdminGuard } from './Guard/is-admin/is-admin.guard';


const routes: Routes = [
  { path: 'enter-page', component: FirstPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: CreateAccountComponent },
  { path: '', redirectTo: '/enter-page', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('./modules/admin.module').then(m => m.AdminModule),
  canActivate: [IsAdminGuard] },
  { path: 'user', loadChildren: () => import('./modules/user.module').then(m => m.UserModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
