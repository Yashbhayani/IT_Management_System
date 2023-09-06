import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  EmployeeDetails(token: any) {
    return this.http.get<any>(
      'https://localhost:44396/GetEmployeeData',
      this.headtok(token)
    );
  }

  AddEmployee(body: any, token: any) {
    return this.http.post<any>(
      'https://localhost:44396/PostEmployeeData',
      body,
      this.headtok(token)
    );
  }

  UpdateEmployee(body: any, token: any) {
    return this.http.put<any>(
      'https://localhost:44396/PutEmployeeData',
      body,
      this.headtok(token)
    );
  }

  DeleteEmployee(id: any, token: any) {
    return this.http.delete<any>(
      `https://localhost:44396/DeleteEmployeeData?id=${id}`,
      this.headtok(token)
    );
  }

  PatchEmployee(body: any, token: any) {
    return this.http.patch<any>(
      'https://localhost:44396/PatchEmployeeData',
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
