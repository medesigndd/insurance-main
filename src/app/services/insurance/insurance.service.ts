import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

const API = 'https://api.fwd.co.th/dev-ecommerce';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
    ) { }


  getProduct(request: object): Observable<[]>{
    const headers = this.authService.getHeaders();
    const params = {...request};
    return this.http.post<[]>(`${API}/getProduct`, params , headers);
  }



}
