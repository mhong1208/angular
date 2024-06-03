import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:3000";

  constructor(private httpClient: HttpClient){

  }

  register(userData: any): Observable<any>{
    return this.httpClient.post(`${this.url}/users/register`, userData);
  }

  login(loginData: any): Observable<any>{
    return this.httpClient.post(`${this.url}/users/login`, loginData);
  }


}
