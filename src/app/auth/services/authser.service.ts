import { Ireset } from './../interfaces/authinter';
import { Injectable } from '@angular/core';
import { IforgetPass, Ilogin, Iregister, Iverify } from '../interfaces/authinter';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthserService {

  constructor(private _HttpClient: HttpClient) {
    if (localStorage.getItem('userToken') !== null) {
      this.getProfile();
    }

  }



  // as we send form that include img in shape of file so we should send registerForm in shape of formData
  onRegister(registerForm: FormData): Observable<any> {
    return this._HttpClient.post(`Users/Register`, registerForm)
  }

  onlogin(loginForm: Ilogin): Observable<any> {
    return this._HttpClient.post(`Users/Login`, loginForm)
  }

  onVerify(data: Iverify): Observable<any> {
    return this._HttpClient.put(`Users/verify`, data)
  }


  onForgetPass(forgetPassForm: IforgetPass): Observable<any> {
    return this._HttpClient.post(`Users/Reset/Request`, forgetPassForm)
  }



  onResetPass(resetPassForm: Ireset): Observable<any> {
    return this._HttpClient.post(`Users/Reset`, resetPassForm)
  }




  getProfile() {
    let encodeToken: any = localStorage.getItem('userToken');
    let decodeToken: any = jwtDecode(encodeToken);
    localStorage.setItem('userEmail', decodeToken.userEmail);
    localStorage.setItem('userName', decodeToken.userName);
    localStorage.setItem('role', decodeToken.userGroup);
    this.getRole();
  }


  role: string | null = ''
  getRole() {
    if (localStorage.getItem('userToken') !== null && localStorage.getItem('role') !== null) {
      this.role = localStorage.getItem('role');
    }
  }




}
