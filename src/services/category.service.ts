import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Category } from 'src/models/Category';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = "http://localhost:3000";

  constructor(private httpClient: HttpClient, private auth: AuthService){

  }

  getAll(){
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken()}
    return this.httpClient.get(`${this.url}/categories`, { headers });
  }


  getById(id: string): Observable<Category>{
    return this.httpClient.get<Category>(`${this.url}/categories`+ '/' + id)
  }

  save(category: Category){
    return this.httpClient.post(`${this.url}/categories`, category);
  }

  update(id: string, category: Category){
    return this.httpClient.put(`${this.url}/categories`+ '/' + id, category)
  }

  delete(id: string){
    return this.httpClient.delete(`${this.url}/categories`+ '/' + id)
  }

}
