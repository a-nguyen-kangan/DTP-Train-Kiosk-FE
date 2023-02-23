import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { directionIDRichmond } from '../exports';

@Component({
  selector: 'app-inbound-trains',
  templateUrl: './inbound-trains.component.html',
  styleUrls: ['./inbound-trains.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboundTrainsComponent {
  constructor(private api: ApiService, private changeDetectorRef: ChangeDetectorRef) { }
  directionID: any[] = directionIDRichmond;
  nextDepartures: any[];
  @Input() filteredDepartures: any[];
  inboundLines: any[] = [
    'Flinders',
    'Southern Cross',
    'Parliament'
  ]

  async ngOnInit() {
    await this.api.getDepartures();
    this.nextDepartures = this.api.nextDepartures;
    this.filterDepartures();

    setInterval(async () => {
      await this.api.getDepartures();
      this.nextDepartures = this.api.nextDepartures;
      this.filterDepartures();
    }, 25000);
  }

  filterDepartures() {
    this.filteredDepartures = [];
    for (let i in this.nextDepartures) {
      if (this.nextDepartures[i].direction_id === 1) {
        this.filteredDepartures.push(this.nextDepartures[i]);
      } else continue;
    }
    this.changeDetectorRef.markForCheck();
  }
}
