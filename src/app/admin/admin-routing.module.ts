import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const routes: Routes = [
    { 
        path: '', component: AdminLayoutComponent, children: [
        { path: '', redirectTo: 'admin-panel', pathMatch: 'full' },
        { path: 'admin-panel', component: AdminDashboardComponent },
        { path: 'profile', component: AdminProfileComponent },
      ] 
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
