import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoginRedirect } from './auth.guard';
import { LoginFormComponent } from './login-form/login-form.component';


const routes: Routes = [
  { path: 'login', component:LoginFormComponent, canActivate:[LoginRedirect]},
  { path: '', redirectTo: 'user/user-dashboard', pathMatch: 'full' },

  {
    path: 'user', loadChildren:() => import('./user/user.module').then(m => m.UserModule)
  },
{
  path: 'admin', loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule)
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
