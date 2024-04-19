import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { BadInput } from '../common/bad-input';
import { AppError } from '../common/app-error';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getData(path: string) {
    return this.http.get<any[]>(this.url + path);
  }

  getMyData(path: string, input: BigInteger) {
    return this.http.get<any[]>(this.url + path + '/' + input);
  }
  
  createData(input: HTMLInputElement, path: string, id: BigInteger) {
    return this.http.post(this.url + path + '/' + id, input).pipe(
      catchError((error: Response) => {
        if (error.status === 400)
          return throwError(() => new BadInput(error));

        return throwError(() => new AppError(error));
      })
    );
  }

  updateData(input: any, path: string) {
    return this.http.put(this.url + path + '/' + input.productId, input);
  }

  deleteData(input: any, path: string) {
    return this.http.delete(this.url + path + '/' + input.productId).pipe(
      catchError((error: Response) => {
        if (error.status === 400)
          return throwError(() => new BadInput(error));

        return throwError(() => new AppError(error));
      })
    );
  }

  getInputId() {
    let token: any = localStorage.getItem('token');
    let jwtHelper = new JwtHelperService;
    return Number(jwtHelper.decodeToken(token).id);
  }
}
