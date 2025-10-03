import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private loginService: LoginService, private _router: Router) { }

  hasPermission(accessby: string[]) {
    let app_userRole = localStorage.getItem('app_userRole');

    if (app_userRole && app_userRole.length > 0) {
      let roles: string[] = app_userRole.split(',');
      let haveRole: boolean = false;
      roles.forEach(element => {
        if (accessby.length > 0 && accessby.find(x => x.toLowerCase() == element.toLowerCase())) {
          haveRole = true;
        }
      });
      if(haveRole == false){
        this.unlockMyAccess();
        return false;
      }
      
      // if (accessby.length > 0 && accessby.find(x => x.toLowerCase() == app_userRole.toLowerCase())) {
      //   return true;
      // } else {
      //   this.unlockMyAccess();
      //   return false;
      // }
    } else {
      this.loginService.showLoginForm();
      return false;
    }
    return true;
  }


  unlockMyAccess() {
    Swal.fire({
      title: 'Access full-fetured website Now',
      text: 'Unlock access to full-featured website',
      icon: 'info',
      confirmButtonText: 'Unlock My Access'
    }).then((result) => {
      if (result && result.isConfirmed)
        this._router.navigate(['/subscript']);
    }
    );
  }

}
