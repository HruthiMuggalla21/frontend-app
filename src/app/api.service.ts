import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost:3000/api/getData';

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createEntry(data: any): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.apiUrl, data)
  }

  // getPostById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}`);
  // }

  // Add methods for other types of requests (e.g., POST, PUT, DELETE)



  // Daddy(): any {
  //   return this.http.get(`http://localhost:3000/api/getData`);
  // }
  
}
