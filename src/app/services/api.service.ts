import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginDto } from '../models/AuthenticationDto';
import { UsersDto } from '../models/UsersDto';
import { StoreService } from './store.service';

const API_ENDPOINT = 'http://api.sensehome.online/api';
// const API_ENDPOINT = 'http://localhost:5000/api';

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
      config.headers = config.headers.set(
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
    let config = this.getRequestConfiguration(true);
    return this.http.get(endpoint,config);
  };

  getUserById =  (userId: string | number) : Observable<Object> => {
    let endpoint = `${API_ENDPOINT}/users/${userId}`
    let config = this.getRequestConfiguration(true)
    return this.http.get(endpoint, config);
  };


  getSubscriptionsByUserId = (userId: string) : Observable<Object> => {
    let endpoint = `${API_ENDPOINT}/users/${userId}/subscriptions`;
    let config = this.getRequestConfiguration(true);
    return this.http.get(endpoint,config);
  };


  createUser = (data: UsersDto): Observable<Object> => {
    let endpoint = `${API_ENDPOINT}/users`;
    let body = JSON.stringify(data);
    let config = this.getRequestConfiguration(true);
    return this.http.post(endpoint, body, config);
   };

   updateUser = (data: UsersDto, userId: string | number): Observable<Object> => {
    let endpoint = `${API_ENDPOINT}/users/${userId}`;
    let body = JSON.stringify(data);
    let config = this.getRequestConfiguration(true);
    return this.http.put(endpoint, body, config);
   };

  createProfile: () => {};

  getTemperatureHumidityDataByDateRange = (): Observable<Object> => {
    let endpoint = `${API_ENDPOINT}/temperature-humidities`;
    let config = this.getRequestConfiguration(true);
    console.log(config)
    return this.http.get(endpoint, config);
  };
}
