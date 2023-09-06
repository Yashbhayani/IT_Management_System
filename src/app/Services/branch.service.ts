import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) {}

  BranchDetails(token: any) {
    return this.http.get<any>(
      'https://localhost:44396/GetBranch',
      this.headtok(token)
    );
  }

  AddBranch(body: any, token: any) {
    return this.http.post<any>(
      'https://localhost:44396/PostBranch',
      body,
      this.headtok(token)
    );
  }

  UpdateBranch(body: any, token: any) {
    return this.http.put<any>(
      'https://localhost:44396/PutBranch',
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
