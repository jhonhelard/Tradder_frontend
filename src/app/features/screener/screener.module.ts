import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTweetModule } from "ngx-tweet";
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { SharedModule } from '../../shared/shared.module';
import { ScreenerComponent } from './screener.component';
import { DynamicPanelComponent } from './dynamic-panel/dynamic-panel.component';
import { FundamentalPanelComponent } from './fundamental-panel/fundamental-panel.component';
import { SavedFilterPanelComponent } from './saved-filter-panel/saved-filter-panel.component';
import { SignalPanelComponent } from './signal-panel/signal-panel.component';
import { TechnicalPanelComponent } from './technical-panel/technical-panel.component';
import { ScanResultComponent } from './scan-result/scan-result.component';

@NgModule({
    declarations: [
        ScreenerComponent,
        DynamicPanelComponent,
        FundamentalPanelComponent,
        SavedFilterPanelComponent,
        SignalPanelComponent,
        TechnicalPanelComponent,
        ScanResultComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxTweetModule,
        NgxTwitterTimelineModule,
        SharedModule
    ],
    entryComponents: [],
    providers: []
})
export class ScreenerModule { }
