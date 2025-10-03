import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [],
  imports: [
    DropdownModule,
    TableModule,
    OverlayPanelModule,
    AutoCompleteModule,
    TabViewModule,
    CalendarModule,
    CardModule,
    InputTextModule,
    ChartModule
  ],
  exports: [
    DropdownModule,
    TableModule,
    OverlayPanelModule,
    AutoCompleteModule,
    TabViewModule,
    CalendarModule,
    CardModule,
    InputTextModule,
    ChartModule
  ]
})
export class PrimeNgModule { }
