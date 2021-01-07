import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginDto } from '../models/AuthenticationDto';
import { StoreService } from './store.service';

const API_ENDPOINT = 'http://api.sensehome.online/api';
@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  private getRequestConfiguration(authorized?: boolean) {
    let config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    if (authorized) {
      config.headers.append(
        'Authorization',
        `Bearer ${StoreService.getBearerToken()}`
      );
    }
    return config;
  }

  login = (data: LoginDto): Observable<Object> => {
    let endpoint = `${API_ENDPOINT}/auth/login`;
    let body = JSON.stringify(data);
    let config = this.getRequestConfiguration()
    return this.http.post(endpoint, body, config);
  };

  getAllUsers = (): Observable<Object> => {
    let endpoint = `${API_ENDPOINT}/users`;
    return this.http.get(endpoint);
  };

  getProfileByUserId: (userId: string | number) => {};

  createUser = () => { };

  createProfile: () => {};

  getTemperatureHumidityDataByDateRange = (): Observable<Object> => {
    let endpoint = `${API_ENDPOINT}/temperature-humidities`;
    let config = this.getRequestConfiguration(true);
    return this.http.get(endpoint, config);
  };
}
