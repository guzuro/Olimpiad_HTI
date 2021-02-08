import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule } from '@angular/fire/firestore'
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';

import { FormsModule } from '@angular/forms';
import { AuthGuard, LoginRedirect } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,

    LoginFormComponent,


  ],
  imports: [
    FormsModule,

    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

  ],
  exports:[
  ],
  providers: [AuthGuard, LoginRedirect],
  bootstrap: [AppComponent]
})
export class AppModule { }
