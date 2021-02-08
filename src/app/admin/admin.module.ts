
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

import { AdminOrderCardsComponent } from './admin-order-cards/admin-order-cards.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminLayoutComponent,
    AdminOrderCardsComponent,
    AdminProfileComponent,
  ],
  imports: [
    FormsModule,
    AdminRoutingModule,
    CommonModule

  ],
  providers: [],
  bootstrap: []
})
export class AdminModule { }
