import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
  }

  login(credentials: any) {
    return this.http.post('/api/authenticate',
      JSON.stringify(credentials))
      .pipe(map((response: any) => {
        let result = response;
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService;
    let token = localStorage.getItem('token');

    if (!token)
      return false;

    let experiationDate = jwtHelper.getTokenExpirationDate(token as string);
    let isExpired = jwtHelper.isTokenExpired(token);
    
    return !isExpired;
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;

    return new JwtHelperService().decodeToken(token);
  }

}
