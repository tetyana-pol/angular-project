import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { CommonResponse } from '../types/common-responce';

const API_URL = 'http://127.0.0.1:8000';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public _user$ = new BehaviorSubject<User | null>(null);
  user$ = this._user$.asObservable();

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http
      .post<CommonResponse>(`${API_URL}/auth/login`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this._user$.next(response.user);
          localStorage.setItem('accessToken', response.accessToken);
        })
      );
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http
      .post<CommonResponse>(`${API_URL}/auth/register`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this._user$.next(response.user);
          localStorage.setItem('accessToken', response.accessToken);
        })
      );
  }

  getRefreshToken() {
    return this.http
      .get<CommonResponse>(`${API_URL}/auth/refresh`, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this._user$.next(response.user);
          localStorage.setItem('accessToken', response.accessToken);
        })
      );
  }

  logout() {
    return this.http
      .get(`${API_URL}/auth/logout`, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this._user$.next(null);
          localStorage.removeItem('accessToken');
        })
      );
  }
}
