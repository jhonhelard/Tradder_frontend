import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
