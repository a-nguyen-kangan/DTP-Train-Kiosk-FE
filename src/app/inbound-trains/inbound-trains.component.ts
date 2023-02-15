import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { directionID } from '../departure';

@Component({
  selector: 'app-inbound-trains',
  templateUrl: './inbound-trains.component.html',
  styleUrls: ['./inbound-trains.component.css']
})
export class InboundTrainsComponent implements OnInit {
  constructor(private api: ApiService, private ngZone: NgZone) { }
  directionID: any[] = directionID;
  nextDepartures: any[];

  async ngOnInit() {
    this.getDepartures(1162);
    setInterval(() => {
      this.getDepartures(1162);
    }, 30000);
  }

  async getDepartures(stationID: number) {
    this.nextDepartures = [];
    for (let i in this.directionID) {
      let nextTrain: any;
      try {
        nextTrain = await this.api.getDeparture(stationID, this.directionID[i].id);
        if (this.directionID[i].id === 1) this.nextDepartures.push(nextTrain);
        else continue;
      } catch {
        this.nextDepartures = [nextTrain];
      }
    }
    console.log(this.nextDepartures);
  }
}
