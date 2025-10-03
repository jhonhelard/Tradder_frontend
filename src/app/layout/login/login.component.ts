import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output()
  closeLoginEmitter = new EventEmitter<any>();
  @Output()
  logginSuccessEmitter = new EventEmitter<any>();
  @Output()
  onRegistering = new EventEmitter<any>();
  @Output()
  onForgotingPassword = new EventEmitter<any>();

  loginForm: FormGroup;
  invalidpasword = false;
  isLogginIn = false;

  constructor(private _authService: AuthService, private _fb: FormBuilder, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required/*, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')*/]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  hideLoginModal() {
    this.closeLoginEmitter.emit();
  }

  registering() {
    //this.hideLoginModal();
    this.onRegistering.emit();
  }

  forgottingPassword() {
    this.onForgotingPassword.emit();
  }

  onSubmit() {
    if (!this.loginForm.invalid) {
      this.isLogginIn = true;
      this._authService.login(this.loginForm.value)
        .subscribe(
          (data: any) => {
            this.isLogginIn = false;
            if (!!data && !!data.token) {
              this.hideLoginModal();
              this._toastr.info("You have logged in!");
              this.logginSuccessEmitter.emit();
              //location.reload();
            } else {
              this.invalidpasword = true;
            }
          }
        );
    }
  }
}
