import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { HelperService } from '../helper/helper.service';
import { catchError, filter, map } from 'rxjs';
import { Departure } from '../departure';


@Component({
  selector: 'app-inbound-trains',
  templateUrl: './inbound-trains.component.html',
  styleUrls: ['./inbound-trains.component.css']
})
export class InboundTrainsComponent implements OnInit {
  constructor(private api: ApiService, public helper: HelperService) { }
  data: string;
  cityLoopDepartures: Array<string> = [];
  nextTrainFlinders: any;
  nextTrainCityLoop: any;

  async ngOnInit() {
    try {
      this.nextTrainFlinders = await this.api.getDestinationNameInbound(`"Flinders Street "`);
    } catch (error) {
      console.log(error);
    }

    let date = new Date();
    let time: string = date.toLocaleTimeString();
    console.log(time);

    let currentTime: any = new Date().toLocaleTimeString
    let timeToArrival = this.nextTrainFlinders[0].estimated_departure_utc - currentTime;
    console.log(currentTime);

    // let currentTime = new Date();
    // let estimatedDeparture = new Date(this.nextTrainFlinders[0].estimated_departure_utc);
    // let timeToArrival = estimatedDeparture.getTime() - currentTime.getTime();


    //this.nextTrainCityLoop = await this.api.getDestinationNameInbound(`"Parliament "`) || await this.api.getDestinationNameInbound(`"Southern Cross "`);
  }
}
