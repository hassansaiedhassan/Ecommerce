import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false;
  errMsg: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/)
    ])
  });

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  handelForm(): void {
    this.isLoading = true;
    const userData = this.loginForm.value;
    if (this.loginForm.valid) {
      this._AuthService.login(userData).subscribe({
        next: (response) => {
          if (response.message === 'success') {
           localStorage.setItem('_token',response.token);
           this._AuthService.decodeUserData();
         
            this._Router.navigate(['/home']);
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.errMsg = err.error.message;
          this.isLoading = false;
        }
      });
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
}
