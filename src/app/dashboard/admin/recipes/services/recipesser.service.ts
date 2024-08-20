import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesserService {

  constructor(private _HttpClient: HttpClient) { }



  getAllRecipes(myparam: any): Observable<any> {
    return this._HttpClient.get(`Recipe`, { params: myparam });
  }


  getAllTags(): Observable<any> {
    return this._HttpClient.get(`tag`)
  }

  addRecipe(recipForm: FormData): Observable<any> {
    return this._HttpClient.post(`Recipe`, recipForm);
  }


  deleteRecipe(myId: number): Observable<any> {
    return this._HttpClient.delete(`Recipe/${myId}`)
  }

  viewRecipe(myId: number): Observable<any> {
    return this._HttpClient.get(`Recipe/${myId}`)
  }

  getRecipebyId(id: number): Observable<any> {
    return this._HttpClient.get(`Recipe/${id}`);
  }


  editRecipebyId(id: number, data: any): Observable<any> {
    return this._HttpClient.put(`Recipe/${id}`, data);
  }
}
