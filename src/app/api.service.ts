import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Elements } from './elements';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost:5000/api/getData';
  postUrl='http://localhost:5000/api/create';

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  
  createEntry(rowData:Elements[]): Observable<Elements[]> {
    return this.http.post<Elements[]>(`${this.postUrl}`,rowData);
  }

  // getPostById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}`);
  // }

  // Add methods for other types of requests (e.g., POST, PUT, DELETE)



  // Daddy(): any {
  //   return this.http.get(`http://localhost:3000/api/getData`);
  // }
  
}
