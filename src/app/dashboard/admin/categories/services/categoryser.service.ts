import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryserService {

  constructor(private _HttpClient: HttpClient) { }


  getAllCategories(myParams: any): Observable<any> {
    return this._HttpClient.get(`Category`, { params: myParams })
  }


  addCategories(data: string): Observable<any> {
    return this._HttpClient.post(`Category`, { name: data })
  }


  deleteCategory(id: number): Observable<any> {
    return this._HttpClient.delete(`Category/${id}`)
  }


  editCategor(id: number, categoryName: string): Observable<any> {
    return this._HttpClient.put(`Category/${id}`, { name: categoryName })
  }


  viewCategory(id: number): Observable<any> {
    return this._HttpClient.get(`Category/${id}`)
  }

}
