import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private http: HttpClient) { }
  private apiUrl ='https://api.open-meteo.com/v1/forecast'; // use this api

//
  getWeather(latitude: number, longitude: number) {
    return this.http.get(`${this.apiUrl}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,windspeed_10m&current_weather=true`)
      // .subscribe((data) => {
      // console.log(data);
      //   console.log((<Weather>data).current_weather.temperature);
      //   return <Weather>data;
      //   // your code to access the temperature data goes here
      // });
  }
  //check is day 
  getIsDay() {

    const currentHour = new Date().getHours();

    return currentHour >= 6 && currentHour < 18;

  }
}
