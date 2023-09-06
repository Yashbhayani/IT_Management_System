import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmrntService {

  constructor(private http: HttpClient) {}

  DepartmentDetails(token: any) {
    return this.http.get<any>(
      'https://localhost:44396/GetDepartmentName',
      this.headtok(token)
    );
  }

  AddDepartment(body: any, token: any) {
    return this.http.post<any>(
      'https://localhost:44396/PostDepartmentName',
      body,
      this.headtok(token)
    );
  }

  UpdateDepartment(body: any, token: any) {
    return this.http.put<any>(
      'https://localhost:44396/PutDepartmentName',
      body,
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
