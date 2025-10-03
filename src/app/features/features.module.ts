import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTweetModule } from "ngx-tweet";
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { CarouselModule } from 'primeng/carousel';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeBannerComponent } from './home/home-banner/home-banner.component';
import { HomeTablesContentComponent } from './home/home-tables-content/home-tables-content.component';
import { Home2Component } from './home_2/home.component';
import { HomeTechnicalScannerComponent } from './home/home-technical-scanner/home-technical-scanner.component';
import { HomeChartComponent } from './home/home-chart/home-chart.component';
import { ChartComponent } from './home/home-chart/chart/chart.component';
import { HomeTopGainersComponent } from './home/home-top-gainers/home-top-gainers.component';
import { TableContentComponent } from './home/home-tables-content/table-content/table-content.component';
import { TopGainerTableComponent } from './home/home-top-gainers/top-gainer-table/top-gainer-table.component';
import { SymbolDetailsComponent } from './symbol-details/symbol-details.component';
import { RightContentComponent } from './home/right-content/right-content.component';
import { VideosComponent } from './home/videos/videos.component';
import { RightNewsComponent } from './home/right-content/right-news/right-news.component';
import { RightRecentlyViewedComponent } from './home/right-content/right-recently-viewed/right-recently-viewed.component';
import { RightTrendingStocksComponent } from './home/right-content/right-trending-stocks/right-trending-stocks.component';
import { RightBannerComponent } from './home/right-content/right-banner/right-banner.component';
import { RighBlogsComponent } from './home/right-content/righ-blogs/righ-blogs.component';
import { SymbolHeaderComponent } from './symbol-details/symbol-header/symbol-header.component';
import { SymbolLeftTableComponent } from './symbol-details/symbol-left-table/symbol-left-table.component';
import { SymbolRightTableComponent } from './symbol-details/symbol-right-table/symbol-right-table.component';
import { SymbolTableContentComponent } from './symbol-details/symbol-table-content/symbol-table-content.component';
import { SymbolCompanyProfileComponent } from './symbol-details/symbol-company-profile/symbol-company-profile.component';
import { SymbolRealtimeNewsComponent } from './symbol-details/symbol-realtime-news/symbol-realtime-news.component';
import { DatePipe } from '@angular/common';
import { BuySymbolComponent } from './symbol-details/buy-symbol/buy-symbol.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { YoutubeComponent } from './home/youtube/youtube.component';
import { SubscriptComponent } from './subscript/subscript.component';
import { SubscriptChangeComponent } from './subscript-change/subscript-change.component';
import { CustomerCardsComponent } from './customer-card-list/customer-card-list.component';
// for screener
import { ScreenerModule } from './screener/screener.module';
import { TraderComponent } from './symbol-details/trader/trader.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { GainlossComponent } from './symbol-details/trader/trader-details/gainloss/gainloss.component';
import { OrdersDetailsComponent } from './symbol-details/trader/trader-details/orders-details/orders-details.component';
import { TraderComboComponent } from './symbol-details/trader/trader-details/trader-combo/trader-combo.component';
import { TraderDetailsComponent } from './symbol-details/trader/trader-details/trader-details.component';
import { TraderEquityComponent } from './symbol-details/trader/trader-details/trader-equity/trader-equity.component';
import { TraderMultilegComponent } from './symbol-details/trader/trader-details/trader-multileg/trader-multileg.component';
import { TraderOcoComponent } from './symbol-details/trader/trader-details/trader-oco/trader-oco.component';
import { TraderOptionComponent } from './symbol-details/trader/trader-details/trader-option/trader-option.component';
import { TraderOtoComponent } from './symbol-details/trader/trader-details/trader-oto/trader-oto.component';
import { TraderOtocoComponent } from './symbol-details/trader/trader-details/trader-otoco/trader-otoco.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PositionsComponent } from './symbol-details/trader/trader-details/positions/positions.component';
import { RouterModule } from '@angular/router';
import { OptionsChainsComponent } from './symbol-details/trader/trader-details/options-chains/options-chains.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng';
import { MarketReportComponent } from './reports/market-report/market-report.component';
import { MarketReportDetailsComponent } from './reports/market-report-details/market-report-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { BackTestComponent } from './symbol-details/back-test/back-test.component';
import { ChartsListComponent } from './charts-list/charts-list.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { NewsComponent } from './news/news.component';
import { LandingComponent } from './home/landing/landing.component';
import { CarouselModule as OwlCarouselModule } from 'ngx-owl-carousel-o';
import { PaymentPageComponent } from './payment-page/payment-page.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeBannerComponent,
    Home2Component,
    HomeTablesContentComponent,
    TableContentComponent,
    HomeTechnicalScannerComponent,
    HomeChartComponent,
    ChartComponent,
    HomeTopGainersComponent,
    TopGainerTableComponent,
    SymbolDetailsComponent,
    RightContentComponent,
    VideosComponent,
    RightNewsComponent,
    RightRecentlyViewedComponent,
    RightTrendingStocksComponent,
    RightBannerComponent,
    RighBlogsComponent,
    SymbolHeaderComponent,
    SymbolLeftTableComponent,
    SymbolRightTableComponent,
    SymbolTableContentComponent,
    SymbolCompanyProfileComponent,
    SymbolRealtimeNewsComponent,
    BuySymbolComponent,
    YoutubeComponent,
    SubscriptComponent,
    SubscriptChangeComponent,
    CustomerCardsComponent,
    TraderComponent,
    TraderDetailsComponent,
    TraderEquityComponent,
    TraderOptionComponent,
    TraderMultilegComponent,
    TraderComboComponent,
    TraderOtoComponent,
    TraderOcoComponent,
    TraderOtocoComponent,
    OrdersDetailsComponent,
    GainlossComponent,
    PositionsComponent,
    OptionsChainsComponent,
    MarketReportComponent,
    MarketReportDetailsComponent,
    HeatmapComponent,
    BackTestComponent,
    ChartsListComponent,
    NewsComponent,
    LandingComponent,
    PaymentPageComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTweetModule,
    NgxTwitterTimelineModule,
    YouTubePlayerModule,
    ScreenerModule,
    RouterModule,
    BrowserAnimationsModule,
    CardModule,
    TabViewModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    CarouselModule,
    MultiSelectModule,
    ChipsModule,
    OwlCarouselModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe]
})
export class FeaturesModule { }
