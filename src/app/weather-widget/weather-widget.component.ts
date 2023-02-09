import { Component } from '@angular/core';
import { WeatherServiceService } from '../weather-widget/weather-service.service';
import { Weather } from '../weather-widget/weather Class/weather';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent {
     // variables 
     temperature: any;
     thisWindSpeed : any;
     currentTime : any;
     isDay : boolean;

    constructor(private weatherService : WeatherServiceService) {
      this.weatherService.getWeather(-37.81, 144.96)
      .subscribe((data) => {
          console.log(data); // what data 
    
          // set temparture
          this.temperature = ((<Weather>data).current_weather.temperature);
          // set windspeed
          this.thisWindSpeed =((<Weather>data).current_weather.windspeed);
    
          // your code to access the temperature data goes here
        });

         // is day
         this.isDay = weatherService.getIsDay();
     



  }

}

