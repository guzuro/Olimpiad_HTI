import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule } from '@angular/fire/firestore'
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard, LoginRedirect } from './auth.guard';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { AdminOrderCardsComponent } from './admin-order-cards/admin-order-cards.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    UserDashboardComponent,
    LoginFormComponent,
    PlaceOrderComponent,
    OrdersListComponent,
    OrderInfoComponent,
    AdminOrderCardsComponent,
    AdminProfileComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

  ],
  providers: [AuthGuard, LoginRedirect],
  bootstrap: [AppComponent]
})
export class AppModule { }
