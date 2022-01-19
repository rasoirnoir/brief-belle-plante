import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { decode } from 'querystring';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string;
  private tokenKey: string;

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
  }

  signup(newUser: User): Observable<any> {
    console.log('Nouvel utilisateur : ', newUser);
    return this.http.post(`${this.apiUrl}/register`, newUser);
  }

  signin(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post(environment.apiUrl + '/signin', body).pipe(
      map((x: any) => {
        localStorage.setItem(this.tokenKey, x.accessToken);
        console.log(x.accessToken);
        return x;
      })
    );
  }

  getConnectedUserInfo(): Observable<User> | void{
    const token = localStorage.getItem(this.tokenKey);
    if(token){
      const decodedToken = jwt_decode<any>(token);
      const userId = decodedToken.sub;
      return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
    }
    else{
      this.router.navigate(['account/signin'])
    }
  }
}
