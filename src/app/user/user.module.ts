
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OrderInfoComponent } from './order-info/order-info.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserLayoutComponent,
    UserDashboardComponent,
    PlaceOrderComponent,
    OrdersListComponent,
    OrderInfoComponent,
  ],
  imports: [
    FormsModule,
    UserRoutingModule,
    CommonModule

  ],
  providers: [],
  bootstrap: []
})
export class UserModule { }
