import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./features/home/home.component";
import { AppLayoutComponent } from "./layout/app-layout/app-layout.component";
import { Home2Component } from "./features/home_2/home.component";
import { SymbolDetailsComponent } from "./features/symbol-details/symbol-details.component";
import { SubscriptComponent } from "./features/subscript/subscript.component";
import { SubscriptChangeComponent } from "./features/subscript-change/subscript-change.component";
import { CustomerCardsComponent } from "./features/customer-card-list/customer-card-list.component";
import { NewsComponent } from "./features/news/news.component";
import { SuccessPageComponent } from "./features/success-page/success-page.component";
import { ScreenerComponent } from "./features/screener/screener.component";
import { SubscriberGuard } from "./core/guard/subscriber.guard";
import { AdminAuthGuard } from "./core/guard/admin-auth.guard";
import { MarketReportComponent } from "./features/reports/market-report/market-report.component";
import { MarketReportDetailsComponent } from "./features/reports/market-report-details/market-report-details.component";
import { ContactComponent } from "./layout/contact/contact.component";
import { TermsComponent } from "./layout/terms/terms.component";
import { PrivacyComponent } from "./layout/privacy/privacy.component";
import { HeatmapComponent } from "./features/heatmap/heatmap.component";
import { ImagePopupComponent } from "./image-popup/image-popup.component";
import { ChartsListComponent } from "./features/charts-list/charts-list.component";
import { EarningsComponent } from './earnings/earnings.component'; // Adjust the path as necessary

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "login", redirectTo: "home", pathMatch: "full" },
  { path: "contact", component: ContactComponent, pathMatch: "full" },
  { path: "Terms", component: TermsComponent, pathMatch: "full" },
  { path: "Privacy", component: PrivacyComponent, pathMatch: "full" },
  { path: 'earnings', component: EarningsComponent },
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "stockchart/:id",
        component: SymbolDetailsComponent,
      },
      {
        path: "subscript-change",
        canActivate: [SubscriberGuard],
        component: SubscriptChangeComponent,
      },
      {
        path: "customer-card-list",
        canActivate: [SubscriberGuard],
        component: CustomerCardsComponent,
      },
      {
        path: "subscript",
        // canActivate: [SubscriberGuard],
        component: SubscriptComponent,
      },
      {
        path: "subscript/:section",
        //canActivate: [SubscriberGuard],
        component: SubscriptComponent,
      },
      { path: "subscript:id", component: SubscriptComponent },
      { 
        path: "news", 
        component: NewsComponent 
      },
      {
        path: "success",
        component: SuccessPageComponent,
      },
      {
        path: "screener",
        component: ScreenerComponent,
      },
      {
        path: "market-report",
        component: MarketReportComponent,
      },
      {
        path: "market-report-details",
        component: MarketReportDetailsComponent,
      },
      {
        path: "heatmap",
        component: HeatmapComponent,
      },
      {
        path: "imagepopup",
        component: ImagePopupComponent,
      },
      {
        path: "charts",
        component: ChartsListComponent,
      },
    ],
  },
  {
    path: "admin",
    //canActivate: [AdminAuthGuard],
    component: AppLayoutComponent,
    loadChildren: () =>
      import("./admin/admin.module").then((mod) => mod.AdminModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
