import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://localhost:3000";
  loggedIn = false;
  constructor(private httpClient: HttpClient){

  }
  checkLogin(){
    let jsonData = localStorage.getItem('login')
    if (jsonData){
      return JSON.parse(jsonData)
    }else{
      return false
    }
  }

  checkAdmin(){
    let jsonData = localStorage.getItem('login')
    if (jsonData){
      console.log(jsonData);
     if (JSON.parse(jsonData).user.role === true)

      return JSON.parse(jsonData)
    }
  }

  isAuthenticated(){
    const promise = new Promise<boolean>((resolve, reject) => {
      let jsonData = localStorage.getItem('login');
      if(jsonData){
        this.loggedIn = true;
        resolve(this.loggedIn);
      }else{
        resolve(this.loggedIn)
      }

    });
    return promise;
  }

  isAdmin(){
    const promise = new Promise<boolean>((resolve, reject) => {
      let jsonData = localStorage.getItem('login');
      if(jsonData){
        if (JSON.parse(jsonData).user.role === true){
          this.loggedIn = true;
          resolve(this.loggedIn);
        }
      }else{
        resolve(this.loggedIn)
      }

    });
    return promise;
  }

  getToken(){
    let jsonData = localStorage.getItem('login')
    if(jsonData){
      console.log(JSON.parse(jsonData).access_token);
      return JSON.parse(jsonData).access_token;
    }
    return false;
  }

  getRefreshToken(){
    let jsonData = localStorage.getItem('login')
    if(jsonData){
      return JSON.parse(jsonData).refresh_token;
    }
    return false;
  }

  refreshToken(refreshToken: any): any{
    return this.httpClient.post<any>(`${this.url}/users/refresh-token`, refreshToken)

  }

}

