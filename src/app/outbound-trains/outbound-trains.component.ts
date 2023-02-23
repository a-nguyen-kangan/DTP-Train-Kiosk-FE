import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { directionIDRichmond } from '../exports';

@Component({
  selector: 'app-outbound-trains',
  templateUrl: './outbound-trains.component.html',
  styleUrls: ['./outbound-trains.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutboundTrainsComponent {
  constructor(private api: ApiService, private changeDetectorRef: ChangeDetectorRef) { }
  directionID: any[] = directionIDRichmond;
  nextDepartures: any[];
  @Input() filteredDepartures: any[];

  async ngOnInit() {
    this.filterDepartures();

    while (this.nextDepartures.length !== this.directionID.length - 1) {      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.filterDepartures();

    setInterval(async () => {
      this.filterDepartures();
    }, 25000);
  }

  filterDepartures() {
    this.nextDepartures = this.api.nextDepartures;
    this.filteredDepartures = [];
    for (let i in this.nextDepartures) {
      if (this.nextDepartures[i].direction_id !== 1) {
        this.filteredDepartures.push(this.nextDepartures[i]);
      } else continue;
    }
    this.changeDetectorRef.markForCheck();
  }
}
