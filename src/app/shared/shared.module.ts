import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../plugins/prime-ng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { OverleyPannelComponent } from './overley-pannel/overley-pannel.component';
import { TicketVolumePipe } from './pipes/ticket-volume.pipe';
import { CompareValidatorDirective } from './directives/compare-validator.directive';
import { YoutubePlayerComponentComponent } from './components/youtube-player-component/youtube-player-component.component';

@NgModule({
  declarations: [OverleyPannelComponent, TicketVolumePipe, CompareValidatorDirective, YoutubePlayerComponentComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    PrimeNgModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    PrimeNgModule,
    TicketVolumePipe,
    YoutubePlayerComponentComponent
  ]
})
export class SharedModule { }
