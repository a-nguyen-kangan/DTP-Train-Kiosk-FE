import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { directionID } from '../departure';

@Component({
  selector: 'app-outbound-trains',
  templateUrl: './outbound-trains.component.html',
  styleUrls: ['./outbound-trains.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutboundTrainsComponent {
  constructor(private api: ApiService, private changeDetectorRef: ChangeDetectorRef) { }
  directionID: any[] = directionID;
  @Input() nextDepartures: any[];

  ngOnInit() {
    this.getDepartures(1162);
    setInterval(() => {
      this.getDepartures(1162);
      console.log(this.nextDepartures)
    }, 30000);
  }

  async getDepartures(stationID: number) {
    this.nextDepartures = [];
    for (let i in this.directionID) {
      let nextTrain: any;
      try {
        nextTrain = await this.api.getDeparture(stationID, this.directionID[i].id);
        if (this.directionID[i].id !== 1) this.nextDepartures.push(nextTrain);
        else continue;
      } catch {
        this.nextDepartures = [nextTrain];
      }
    }
    this.changeDetectorRef.markForCheck();
  }
}
