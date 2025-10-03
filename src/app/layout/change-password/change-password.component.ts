import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompareOperator } from 'src/app/core/constants/app.const';
import { AuthService } from 'src/app/core/services/auth.service';
import { compareValidator } from 'src/app/shared/directives/compare-validator.directive';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @Output() closeRegisterEmitter = new EventEmitter<any>();
  @Output() onLoginEmitter = new EventEmitter<any>();
  // @Output()
  // logginSuccessEmitter = new EventEmitter<any>();
  loginForm: FormGroup;
  invalidpasword = false;
  isLogginIn = false;

  constructor(private _authService: AuthService, private _fb: FormBuilder, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      oldpassword: ['', Validators.required],
      password: ['', Validators.required],
      repeatpassword: ['', [Validators.required, compareValidator('password', CompareOperator.NotEqual)]]
    });
  }

  get oldpassword() {
    return this.loginForm.get('oldpassword');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get repeatpassword() {
    return this.loginForm.get('repeatpassword');
  }

  hideLoginModal() {
    this.closeRegisterEmitter.emit();
  }

  onSubmit() {
    if (!this.loginForm.invalid) {
      this.isLogginIn = true;
      this._authService.changePassword(this.loginForm.value)
        .subscribe(
          (data: any) => {
            this.isLogginIn = false;
            if (!!data && !!data.token) {
              this.hideLoginModal();
              this._toastr.info("You have changed your password!");
              //this.logginSuccessEmitter.emit();
              //location.reload();
            } else {
              this.invalidpasword = true;
            }
          }
        );
    }
  }

  onLogginIn() {
    this.onLoginEmitter.emit();
  }
}
