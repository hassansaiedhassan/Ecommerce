import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient,private _Router:Router) { }

  userData:any;
  decodeUserData(){
    let encodeToken= JSON.stringify(localStorage.getItem('_token'));
    let decodeToken:any=jwtDecode(encodeToken);
    this.userData=decodeToken;


  }


  register(userData:Object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,userData)
  }
  login(userData:Object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,userData)
  }

}
 