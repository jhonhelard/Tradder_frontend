import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { PermissionsService } from '../services/permissions.service';

@Directive({
  selector: '[appPermissions]'
})
export class PermissionsDirective implements OnInit {

  @Input() accessPermission: string[];

  constructor(private viewContainerRef: ViewContainerRef,
    private service: PermissionsService
  ) { }

  ngOnInit(): void {

    let access = this.service.hasPermission(this.accessPermission);
    if (!access) {
      //
    }
  }
}
