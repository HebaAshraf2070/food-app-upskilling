import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsrerecipeserService {

  constructor(private _HttpClient: HttpClient) { }


  addtofav(id: number): Observable<any> {
    return this._HttpClient.post(`userRecipe`, { recipeId: id })
  }


  ongetFav(): Observable<any> {
    return this._HttpClient.get(`userRecipe`)
  }


  onDeleteFav(id: number): Observable<any> {
    return this._HttpClient.delete(`userRecipe/${id}`)
  }

}
