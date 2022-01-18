import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string;
  private tokenKey: string;

  constructor(private http: HttpClient) {
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
}
