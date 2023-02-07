import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { HelperService } from '../helper/helper.service';

@Component({
  selector: 'app-outbound-trains',
  templateUrl: './outbound-trains.component.html',
  styleUrls: ['./outbound-trains.component.css']
})
export class OutboundTrainsComponent {
  constructor(private api: ApiService, public helper: HelperService) { }


}
