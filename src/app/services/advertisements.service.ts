import { Injectable } from '@angular/core';
import { Card } from '../types/card';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://127.0.0.1:8000';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementsService {
  constructor(private http: HttpClient) {}

  getAdvertisements() {
    return this.http.get<Card[]>(`${API_URL}/advertisement`);
  }

  createAdvertisement(data: any, accessToken: string) {
    return this.http.post<Card>(`${API_URL}/advertisement/add`, data, {
      withCredentials: true,
    });
  }
}
