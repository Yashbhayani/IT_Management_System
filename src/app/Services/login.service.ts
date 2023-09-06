import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  LoginUserAdmin(body: any) {
    return this.http.post<any>('https://localhost:44396/Login', body);
  }

  UserDetails(token: any) {
    return this.http.get<any>(
      'https://localhost:44396/GetUserData',
      this.headtok(token)
    );
  }

  headtok(token: any) {
    let api_key = token;
    const headerDict = {
      'Content-Type': 'application/json',
      jwtToken: api_key,
    };

    const requestOptionss = {
      headers: new HttpHeaders(headerDict),
    };

    return requestOptionss;
  }
}
