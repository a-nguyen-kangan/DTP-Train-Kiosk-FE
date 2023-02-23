import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api-service/api.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {
  constructor(private api: ApiService, private changeDetectorRef: ChangeDetectorRef) { };
  @Input() campusName: string;
  
  async ngOnInit() { 
    while (this.api.selectedStationDetails === undefined) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.campusName = this.api.selectedStationDetails.campusName;
    this.changeDetectorRef.markForCheck();
  }
}
