import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }


  get(name: string): Observable<any>{
    return this.http.post<any>('http://localhost:3000/customer/get',{ name: name });
  }




  

}
