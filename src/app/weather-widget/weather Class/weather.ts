import { Time } from "@angular/common";

class Weather {
    current_weather: Current_Weather;

    constructor() {
        this.current_weather = new Current_Weather();
    }
}

class Current_Weather {
    temperature: number;
    windspeed: number;
   

    constructor() {
        this.temperature = 0;
        this.windspeed = 0;
        
    }
}

export { Current_Weather, Weather }