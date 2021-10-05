import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherServices {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = "https://www.metaweather.com/api/";
  }

  // solicitud de latitud y longitud 
  getWeather(lat: any, long: any): Observable<any> {
    return this._http.get(`${this.url}location/search/?lattlong=${lat},${long}`);
  }
  
  // get de localicacion
  getLocation(id: any): Observable<any> {
    return this._http.get(`https://www.metaweather.com/api/location/${id}`);
  }
}
