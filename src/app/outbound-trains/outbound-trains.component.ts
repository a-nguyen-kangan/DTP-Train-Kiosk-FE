import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Departure, NextDeparture, Directions } from '../departure';

@Component({
  selector: 'app-outbound-trains',
  templateUrl: './outbound-trains.component.html',
  styleUrls: ['./outbound-trains.component.css']
})
export class OutboundTrainsComponent {
  Directions = Directions;
  constructor(private api: ApiService, private ngZone: NgZone) { }

  currentTime: Date;
  nextTrain: Departure[] = [];
  nextDeparture: NextDeparture[] = [];

  async ngOnInit() {
    // The PTV API returns the destination as: Flinders Street , with one space at the end.
    this.nextTrain = await this.api.getNextOutbound(Directions[1]);
    this.updateDepartures();
    this.getArrivingMinutes(this.toDate(this.nextTrain[0].estimated_departure_utc));
    this.getArrivingMinutes(this.toDate(this.nextTrain[1].estimated_departure_utc));
    this.getArrivingMinutes(this.toDate(this.nextTrain[2].estimated_departure_utc));
    this.getArrivingMinutes(this.toDate(this.nextTrain[3].estimated_departure_utc));
    this.getArrivingMinutes(this.toDate(this.nextTrain[4].estimated_departure_utc));
    this.getArrivingMinutes(this.toDate(this.nextTrain[5].estimated_departure_utc));
    this.getArrivingMinutes(this.toDate(this.nextTrain[6].estimated_departure_utc));
    this.getArrivingMinutes(this.toDate(this.nextTrain[7].estimated_departure_utc));
    setInterval(() => {
      this.updateDepartures();
      this.getArrivingMinutes(this.toDate(this.nextTrain[0].estimated_departure_utc));
      this.getArrivingMinutes(this.toDate(this.nextTrain[1].estimated_departure_utc));
      this.getArrivingMinutes(this.toDate(this.nextTrain[2].estimated_departure_utc));
      this.getArrivingMinutes(this.toDate(this.nextTrain[3].estimated_departure_utc));
      this.getArrivingMinutes(this.toDate(this.nextTrain[4].estimated_departure_utc));
      this.getArrivingMinutes(this.toDate(this.nextTrain[5].estimated_departure_utc));
      this.getArrivingMinutes(this.toDate(this.nextTrain[6].estimated_departure_utc));
      this.getArrivingMinutes(this.toDate(this.nextTrain[7].estimated_departure_utc));
    }, 10000);
  }

  async updateDepartures() {
    let nextDeparture: NextDeparture[] = [];
    for (let i of Object.keys(Directions)) {
      let value = Number(i);
      if (!isNaN(Number(value))) {
        console.log(value + ': ' + Directions[value])
        let nextTrain: Departure[] = await this.api.getNextOutbound(Directions[value]);

        let tempNextDeparture: NextDeparture = new NextDeparture();
        tempNextDeparture.destination = nextTrain[0].run_ref;
        tempNextDeparture.time = this.getArrivingMinutes(this.toDate(nextTrain[0].estimated_departure_utc)).toString();
        tempNextDeparture.platformNumber = nextTrain[0].platform_number;

        nextDeparture.push(tempNextDeparture);

        this.nextDeparture = nextDeparture;
      }
    }
  }

  getArrivingMinutes(nextTrainTime: Date) {
    this.currentTime = new Date();
    let timeDiff: number = nextTrainTime.getTime() - this.currentTime.getTime();
    let seconds: number = timeDiff / 1000;
    return Math.round(seconds / 60);
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
