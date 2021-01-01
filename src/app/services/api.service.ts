import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

const temperatureHumidityUrl = "https://localhost:5001/api/temperature-humidities";
@Injectable(
  {
    providedIn: 'root'
  }
)
export class APIService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService){}
  login: () => {

  }

  getAllUsers: () => {

  }

  getProfileByUserId: (userId: string | number) => {

  }

  createUser: () => {

  }

  createProfile: () => {

  }

  getTemperatureHumidityDataByDateRange(){
    let headers = new HttpHeaders().set('Authorization',  `Bearer ${localStorage.getItem("jwt")}`);
    return this.http.get(temperatureHumidityUrl, { headers: headers });
  }
}
