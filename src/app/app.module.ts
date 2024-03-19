import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TopBarComponent } from './top-bar/top-bar.component';
import { InsuranceModule } from './components/insurance/insurance.module';
import { InsuranceService } from './services/insurance/insurance.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { CustomerService } from './services/customer/customer.service';
import { QuotationService } from './services/quotation/quotation.service';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InsuranceModule,
    HttpClientModule
 
  ],
  providers: [
    AuthService,
    InsuranceService,
    CustomerService,
    QuotationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
