import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HttptRequestInterceptor } from './interceptors/http-request.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { PermissionsDirective } from './directives/permissions.directive';

@NgModule({
  declarations: [PermissionsDirective],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule
  ]
})
export class CoreModule {
  static forRoot(): any {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttptRequestInterceptor, multi: true },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        },
      ]
    };
  }
}
