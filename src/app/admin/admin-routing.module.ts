import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isEmployer } from '../auth.guard';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const routes: Routes = [
    { 
        path: '', component: AdminLayoutComponent, children: [
        { path: '', redirectTo: 'admin-panel', pathMatch: 'full' },
        { path: 'admin-panel', component: AdminDashboardComponent , canActivate:[isEmployer]},
        { path: 'profile', component: AdminProfileComponent,canActivate:[isEmployer] },
        {path: '**', component: PageNotFoundComponent}
      ] 
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
