import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSerService {

  constructor(private _HttpClient: HttpClient) { }

  getUserData(myparams: any): Observable<any> {
    return this._HttpClient.get(`Users`, { params: myparams })
  }


  deleteUser(id: number): Observable<any> {
    return this._HttpClient.delete(`Users/${id}`)
  }


  viewUser(id: number): Observable<any> {
    return this._HttpClient.get(`User/${id}`)
  }
}
