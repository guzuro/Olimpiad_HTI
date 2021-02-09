import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule } from '@angular/fire/firestore'
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';

import { FormsModule } from '@angular/forms';
import { AuthGuard, isEmployer, LoginRedirect } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

//уведомления
import { SimpleNotificationsModule } from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,

    LoginFormComponent,

    PageNotFoundComponent,


  ],
  imports: [
    FormsModule,

    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule, 
    SimpleNotificationsModule.forRoot()

  ],
  exports:[
  ],
  providers: [AuthGuard, LoginRedirect, isEmployer,     { provide: LOCALE_ID, useValue: 'ru' }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
