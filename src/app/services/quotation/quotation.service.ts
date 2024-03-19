import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

constructor(private http: HttpClient) { }

  insert(insurance: object): Observable<object>{
    const { ...params } = insurance;
    return this.http.post<object>('http://localhost:3000/quotation/store', params);
  }
}
