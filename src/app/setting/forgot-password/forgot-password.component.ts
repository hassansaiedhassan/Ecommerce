import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  forgotForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required)
  });
  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', Validators.required)
  });
  resetPassword: FormGroup = new FormGroup({
    newPassword: new FormControl('', Validators.required)
  });

  constructor(private _forgotPasswordService: ForgotPasswordService) {}
   email:string='';
   resetCodeError: string = '';
  forgotPassword(): void {
    let userEmail = this.forgotForm.value;
    this._forgotPasswordService.forgotPassword(userEmail).subscribe({
      next: (res) => {
        console.log(res);
        if(res.statusMsg=="success"){
        this.step1 = false;
         this.step2 = true;
        this.resetCodeError=''
       this.email=userEmail.email
      }
      },
      error:(err)=>{
    this.resetCodeError=err.error.message
      }   });
  }

  resetCode(): void {
    let code=this.resetCodeForm.value;
    this._forgotPasswordService.verifyResetCode(code).subscribe({
      next:(res)=>{


       if(res.status=="Success"){
        this.step2 = false;
         this.step3 = true;
         this.resetCodeError=res.status.massage;
      }

      },
      error:(err)=>{
        console.log(err);
        this.resetCodeError=err.error.massage;
      }
    })

  }

  newPassword(): void {
  let   newPassword=this.resetPassword.value;
newPassword.email=this.email
this._forgotPasswordService.updatePassword(newPassword).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.token){
      localStorage.setItem('_token',res.token);
    }
  },
  error:(err)=>{
    console.log(err);
    this.resetCodeError=err.error.message
  }
})
  }
}
