import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

headers:any=localStorage.getItem('_token');
  constructor(private _HttpClient:HttpClient) { }
  forgotPassword(userEmail:object):Observable <any>{
return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,userEmail)
  }
  verifyResetCode(code:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,code)
  }

  updatePassword(userDetails:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,userDetails,
    {
      headers:this.headers
    })
  }
}
