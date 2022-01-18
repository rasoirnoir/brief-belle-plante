import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem(environment.tokenKey);
    if (token) {
      const decodedToken = jwt_decode<any>(token);
      if (decodedToken.exp) {
        console.log('Decoded token expiration date : ', decodedToken.exp);
        const dateExp = new Date(decodedToken.exp * 1000);
        if (new Date() >= dateExp) {
          //Le token a expiré, je n'autorise pas l'accès.
          console.log('Tu ne passes pas.');
          this.router.navigate(['account/signin']);
          return false;
        }
        console.log('Tu passes.');
        return true;
      } else {
        return false;
      }
    } else {
      console.log('Tu ne passes pas.');
      this.router.navigate(['account/signin']);
      return false;
    }
  }
}
