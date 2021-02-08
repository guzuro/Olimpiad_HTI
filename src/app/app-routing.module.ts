import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AuthGuard, LoginRedirect } from './auth.guard';
import { LoginFormComponent } from './login-form/login-form.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';

const routes: Routes = [
  { path: '', component: UserLayoutComponent, children: [
    { path: '', redirectTo: 'user-dashboard', pathMatch: 'full' },
    { path: 'user-dashboard', component: UserDashboardComponent, canActivate:[AuthGuard] },
    { path: 'login', component:LoginFormComponent, canActivate:[LoginRedirect]},
    { path: 'place-order', component: PlaceOrderComponent, canActivate:[AuthGuard] },
    { path: 'my-orders', component: OrdersListComponent, canActivate:[AuthGuard] },
    { path: 'my-orders/order/:id', component: OrderInfoComponent, canActivate:[AuthGuard] },
  ] 
},
{ path: 'admin', component: AdminLayoutComponent, children: [
  { path: '', redirectTo: 'admin-panel', pathMatch: 'full' },
  { path: 'admin-panel', component: AdminDashboardComponent },
  { path: 'profile', component: AdminProfileComponent },

] 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
