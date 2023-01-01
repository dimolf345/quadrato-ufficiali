import { environment } from 'src/environments/environment';
//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

//Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//services
import { AuthService } from './services/auth.service';
import { SnackbarService } from './services/snackbar.service';

//Locales
import myLocalIT from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';

// Components
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

// Firebase - Firestore
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';

//NgRx
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OfficerspageComponent } from './components/officerspage/officerspage.component';
import { AccountComponent } from './components/account/account.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountService } from './services/account.service';

registerLocaleData(myLocalIT);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    OfficerspageComponent,
    AccountComponent,
    PaymentsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    StoreModule.forRoot(reducers),
    AngularFireAuthModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [AuthService, SnackbarService, AngularFirestore, AccountService],
  bootstrap: [AppComponent],
})
export class AppModule {}
