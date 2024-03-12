import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const TOKEN = '7454ba0a-cbf4-4282-aee6-56e6125718b2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getHeaders(){
    return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + TOKEN,
        })
      };
  }

}
