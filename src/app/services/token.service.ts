import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonResponse } from '../types/common-responce';

const API_URL = 'http://127.0.0.1:8000';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private http: HttpClient) {}

  getRefreshToken() {
    return this.http.get<CommonResponse>(`${API_URL}/auth/refresh`, {
      withCredentials: true,
    });
  }
}
