import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedSerService {

  constructor(
    private _HttpClient: HttpClient,
  ) { }


  onChangePassword(data: any): Observable<any> {
    return this._HttpClient.put(`Users/ChangePassword`, data);
  }


  getCurrentUser(): Observable<any> {
    return this._HttpClient.get(`Users/currentUser`)
  }


  updateUserProfile(myParams: any): Observable<any> {
    return this._HttpClient.put(`Users`, myParams)
  }

}
