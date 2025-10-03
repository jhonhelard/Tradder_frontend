import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { DecimalPipe } from "@angular/common";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FeaturesModule } from "./features/features.module";
import { AppLayoutComponent } from "./layout/app-layout/app-layout.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { PrimeNgModule } from "./plugins/prime-ng.module";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LoginComponent } from "./layout/login/login.component";
import { SymbolAlertComponent } from "./features/symbol-details/symbol-alert/symbol-alert.component";
import { ToastrModule } from "ngx-toastr";
import { RegisterComponent } from "./layout/register/register.component";
import { ChangePasswordComponent } from "./layout/change-password/change-password.component";
import { ForgotPasswordComponent } from "./layout/forgot-password/forgot-password.component";
import { SuccessPageComponent } from "./features/success-page/success-page.component";
import { ScreenerController } from "./core/services/screener/screener.controller";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { SidebarModule } from "primeng/sidebar";
import { ButtonModule } from "primeng/button";
import { NgxPaginationModule } from "ngx-pagination";
import { ContactComponent } from "./layout/contact/contact.component";
import { TermsComponent } from "./layout/terms/terms.component";
import { PrivacyComponent } from "./layout/privacy/privacy.component";
import { DialogModule } from "primeng/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EarningsComponent } from './earnings/earnings.component';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SymbolAlertComponent,
    RegisterComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    SuccessPageComponent,
    ContactComponent,
    TermsComponent,
    PrivacyComponent,
    EarningsComponent,
   

  ],
  imports: [
    HttpClientModule, 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FeaturesModule,
    PrimeNgModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CoreModule.forRoot(),
    SharedModule,
    ToastrModule.forRoot(),
    InfiniteScrollModule,
    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    DialogModule,
    NgxPaginationModule,
  ],
  providers: [DecimalPipe, ScreenerController],
  bootstrap: [AppComponent],
})
export class AppModule {}
