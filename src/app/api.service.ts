import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Elements } from './elements';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = 'http://localhost:5000/api/getData';
  private postUrl: string='http://localhost:5000/api/create';
  private editUrl: string = 'http://localhost:5000/api/editData';

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  
  createEntry(rowData:Elements): Observable<Elements> {
    // console.log(rowData)
    // const headers = new HttpHeaders({
    //   'Content-Type':'application/json'
    // });
    return this.http.post<Elements>(this.postUrl,rowData);
  }

  editData(data: any[]): Observable<any> {
    return this.http.put<any>(this.editUrl, data);
  }

  updateColumn(arr:any): Observable<any> {
    return this.http.put(this.editUrl, arr);

  }
  
}
