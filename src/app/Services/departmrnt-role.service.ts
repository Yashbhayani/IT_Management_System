import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DepartmrntRoleService {
  constructor(private http: HttpClient) {}

  DepartmentRoleDetails(token: any) {
    return this.http.get<any>(
      'https://localhost:44396/GetDepartmentRoles',
      this.headtok(token)
    );
  }

  AddDepartmentRole(body: any, token: any) {
    return this.http.post<any>(
      'https://localhost:44396/PostDepartmentRoles',
      body,
      this.headtok(token)
    );
  }

  UpdateDepartmentRole(body: any, token: any) {
    return this.http.put<any>(
      'https://localhost:44396/PutDepartmentRoles',
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
