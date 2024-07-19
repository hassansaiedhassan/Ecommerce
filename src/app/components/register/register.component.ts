import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  isLoading: boolean = false;
  errMsg: string = '';

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.required,
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/)
    ]),
    rePassword: new FormControl(''
    ),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)
    ])
  },{validators:[this.confirmPassword]} as FormControlOptions);
confirmPassword(group:FormGroup){
  let password=group.get('password');
  let rePassword=group.get('rePassword');
  if(rePassword?.value==""){
    rePassword?.setErrors({required:true});

  }
  else if(password?.value!=rePassword?.value){
    rePassword?.setErrors({mismatch:true})
  }
}

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  handelForm(): void {
    this.isLoading = true;
    const userData = this.registerForm.value;
    if (this.registerForm.valid) {
      this._AuthService.register(userData).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            console.log(response);
            this._Router.navigate(['/login']);
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.errMsg = err.error.message;
          this.isLoading = false;
        }
      });
    }
  }
}
