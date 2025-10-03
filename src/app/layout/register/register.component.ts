import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompareOperator } from 'src/app/core/constants/app.const';
import { AuthService } from 'src/app/core/services/auth.service';
import { compareValidator } from 'src/app/shared/directives/compare-validator.directive';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
      email: ['', [Validators.required/*, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')*/]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      repeatpassword: ['', [Validators.required, compareValidator('password', CompareOperator.NotEqual)]]
    });
  }

  get emai() {
    return this.loginForm.get('email');
  }

  get name() {
    return this.loginForm.get('name');
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
      this._authService.register(this.loginForm.value)
        .subscribe(
          (data: any) => {
            this.isLogginIn = false;
            if (!!data && !!data.token) {
              this.hideLoginModal();
              this._toastr.info("You have registered!");
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
