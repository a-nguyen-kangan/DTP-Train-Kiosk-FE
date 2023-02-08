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

  currentTime: Date;
  data: string;
  cityLoopDepartures: Array<string> = [];
  nextTrainFlinders: any;
  nextTrainFlindersPlatform: string;
  nextTrainFlindersMins: number;
  nextTrainCityLoop: any;

  async ngOnInit() {
    // The PTV API returns the destination like: "Flinders Street ", with the quotation marks and space at the end.
    this.nextTrainFlinders = await this.api.getNextInbound(`"Flinders Street "`);
    this.nextTrainFlindersPlatform = this.nextTrainFlinders[0].platform_number;
    this.updateTime();
    this.getArrivingMinutes(this.toDate(this.nextTrainFlinders[0].estimated_departure_utc));
    setInterval(() => {
      this.updateTime();
      this.getArrivingMinutes(this.toDate(this.nextTrainFlinders[0].estimated_departure_utc));
      this.updateDeparture(this.nextTrainFlinders, `"Flinders Street "`);
    }, 10000);

    // this.nextTrainCityLoop = await this.api.getDestinationNameInbound(`"Parliament "`) || await this.api.getDestinationNameInbound(`"Southern Cross "`);
  }

  async updateDeparture(nextTrain: any, linePTVFormat: string) {
    try {
      this.nextTrainFlinders = await this.api.getNextInbound(linePTVFormat);
      this.nextTrainFlindersPlatform = this.nextTrainFlinders[0].platform_number;
    } catch (error) {
      console.log(error);
    }
  }

  getArrivingMinutes(nextTrainTime: Date) {
    let timeDiff: number = nextTrainTime.getTime() - this.currentTime.getTime();
    let seconds: number = timeDiff / 1000;
    console.log(seconds);
    this.nextTrainFlindersMins = Math.round(seconds / 60);
  }

  updateTime() {
    this.currentTime = new Date();
  }

  toDate(estimatedDepartureLocal: string) {
    let date: Date = new Date();
    let parts: string[] = estimatedDepartureLocal.split(/[\s:]+/);
    let hours: number = parseInt(parts[0], 10);
    let minutes: number = parseInt(parts[1], 10);
    let seconds: number = parseInt(parts[2], 10);

    if (parts[3] === "pm" && hours !== 12) {
      hours += 12;
    } else if (parts[3] === "am" && hours === 12) {
      hours = 0;
    }

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    return date;
  }
}
