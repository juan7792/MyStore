import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { interceptorFactory } from './helpers/interceptor';
import { AuthGuard } from './services/authguard.service';
import { AppErrorHandler } from './common/app-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    AllProductsComponent,
    NotFoundComponent,
    LoginComponent,
    CreateAccountComponent,
    MyProductsComponent,
    HomeComponent,
    NavbarComponent,
    TransactionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'account',
        component: CreateAccountComponent
      },
      {
        path: 'allproducts',
        component: AllProductsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'myproducts',
        component: MyProductsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        component: NotFoundComponent
      }

    ])
  ],
  providers: [
    provideClientHydration(),
    DataService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: interceptorFactory, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
