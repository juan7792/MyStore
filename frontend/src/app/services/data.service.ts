import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getData(path: string) {
    return this.http.get<any[]>(this.url + path);
  }
  
  createData(input: HTMLInputElement, path: string) {
    return this.http.post(this.url + path, input);
  }

  updateData(input: any, path: string) {
    return this.http.put(this.url + path + '/' + input.productId, input);
  }

  deleteData(input: any, path: string) {
    return this.http.delete(this.url + path + '/' + input.productId);
  }
}
