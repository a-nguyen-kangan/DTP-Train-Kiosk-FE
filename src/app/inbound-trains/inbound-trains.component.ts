import { Component } from '@angular/core';
import { ApiService } from '../api-service/api.service';

@Component({
  selector: 'app-inbound-trains',
  templateUrl: './inbound-trains.component.html',
  styleUrls: ['./inbound-trains.component.css']
})
export class InboundTrainsComponent {
  constructor(private api: ApiService) { }

  ngOnInit() {
    console.log(this.api.getData());

    let html: string;
    let htmlSegment: string = `City Loop`;

    document.getElementById("line-1").innerHTML = htmlSegment;
  }
}
