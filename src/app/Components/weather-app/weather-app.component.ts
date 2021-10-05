import { Component, ElementRef, OnInit } from '@angular/core';
import { WeatherServices } from 'src/app/services/weather-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss'],
  providers: [WeatherServices]
})
export class WeatherAppComponent implements OnInit {

  public lat: any;
  public long: any;
  public id: any;
  public ciudad!: string;
  public loading: boolean;
  public dataDay: any;
  public dataDiary: any[] = [];
  public fecha: any;
  public progressH!: string;

  constructor(
    private _weatherService: WeatherServices
  ) {
    this.loading = true;
    this.fecha = new Date();
  }

  ngOnInit(): void {
    this.getWeather();
  }

  //* Data de usuario lat y long
  getWeather() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;

        this._weatherService.getWeather(this.lat, this.long).subscribe(
          result => {
            this.id = result[0].woeid;
            this.ciudad = result[0].title;

            this.getLocation();
          }, error => {
            console.log(error);
          });

      });
  }

  //* Data Day rest
  getLocation() {
    this._weatherService.getLocation(this.id).subscribe(
      result => {
        this.dataDay = result.consolidated_weather;
        this.weatherDiary(this.dataDay);
        this.loading = false;
        // humedad de barra
        this.progressH = result.consolidated_weather[0].humidity + '%';
      }, error => {
        console.log(error);
      }
    )
  }

  //* data diary
  weatherDiary(data: any) {
    for (let i = 0; i < data.length; i++) {
      if (i > 0) {
        this.dataDiary.push(data[i]);
      }
    }
  }
}
