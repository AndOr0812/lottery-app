import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { BroadcasterService } from '../services/broadcaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  login: boolean = true;
  dirty: boolean = false;
  name: string;
  email: string;
  password: string;
  forgotPass: boolean = false;
  loginError;
  loading: boolean = false;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private broadcast: BroadcasterService
  ) {}

  submit() {
    this.dirty = true;
    if (this.login) {
      if (this.email && this.password) {
        this.auth.login(this.email, this.password)
        .then(res => {
          this.auth.setAuth(res.user.email);
          this.broadcast.fire('closeModal');
        }, err => {
          this.loginError = err;
        });
      }
    } else {
      if (this.email && this.password && this.name) {
        this.auth.emailRegister(this.email, this.password)
        .then(res => {
          this.loading = true;
          this.api.postNewUser({
            name: this.name,
            email: res.user.email
          }).subscribe(() => {
            this.auth.setAuth(res.user.email);
            this.loading = false;
            this.broadcast.fire('closeModal');
          });
        }, err => {
          this.loading = false;
          this.loginError = err;
        });
      }
    }
  }

  googleLogin() {
    this.auth.googleLogin().then(res => {
      if (res.additionalUserInfo.isNewUser) {
        this.loading = true;
        this.api.postNewUser({
          name: res.user.displayName,
          email: res.user.email
        }).subscribe(() => {
          this.auth.setAuth(res.user.email);
          this.loading = false;
          this.broadcast.fire('closeModal');
        });
      } else {
        this.auth.setAuth(res.user.email);
        this.loading = false;
        this.broadcast.fire('closeModal');
      }
    }, err => {
      this.loading = false;
      this.loginError = err;
    });
  }

  submitForgotPassword() {
    this.dirty = true;
    if (this.email) {
      this.auth.sendPasswordReset(this.email).then((res) => {
        this.broadcast.fire('closeModal'); // added to ensure modal is closed if logged in through modal
      }, err => {
        this.loginError = err;
      });
    }
  }

  removeError() {
    this.loginError = null;
  }
}
