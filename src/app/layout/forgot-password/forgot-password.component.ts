import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompareOperator } from 'src/app/core/constants/app.const';
import { AuthService } from 'src/app/core/services/auth.service';
import { compareValidator } from 'src/app/shared/directives/compare-validator.directive';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
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
      email: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
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

  // onLogginIn() {
  //   this.onLoginEmitter.emit();
  // }
}
