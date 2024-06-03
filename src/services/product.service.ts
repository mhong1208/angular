import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = "http://localhost:3000";

  constructor(private httpClient: HttpClient){

  }

  getNewPro(){
    return this.httpClient.get(`${this.url}/products/new`);
  }

  getHotPro(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/products/hot`);
  }

  getProById(categoryId: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/products/category/${categoryId}`);
  }

  getAll(){
    return this.httpClient.get(`${this.url}/products`)
  }

  getById(id: string ): Observable<Product>{
    return this.httpClient.get<Product>(`${this.url}/products` + '/' + id)
  }

  save(product: Product){
    return this.httpClient.post(`${this.url}/products`, product);
  }

  update(id: string, product: Product){
    return this.httpClient.put(`${this.url}/products`+ '/' + id, product)
  }

  delete(id: string){
    return this.httpClient.delete(`${this.url}/products`+ '/' + id)
  }

  search(name: string){
    return this.httpClient.get(`${this.url}/products/search`+ '/' + name)
  }

}
