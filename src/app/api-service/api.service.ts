import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ApiSignatureGenService } from '../api-signature-gen/api-signature-gen.service';
import { Departure, RunRef } from '../departure';
import { filter } from 'rxjs';
// import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private apiSigGen: ApiSignatureGenService) { }

  mapResultToDepartures(result: any): Departure[] {
    let departureList: Departure[] = [];

    result.forEach((departure: any) => {
      let tempDeparture: Departure = new Departure();

      tempDeparture.stop_id = departure.stop_id;
      tempDeparture.route_id = departure.route_id;
      tempDeparture.run_ref = departure.run_ref;
      tempDeparture.direction_id = departure.direction_id;
      tempDeparture.estimated_departure_utc = departure.estimated_departure_utc
      tempDeparture.platform_number = departure.platform_number;
      // tempDeparture.destination_name = departure.destination_name;
      // tempDeparture.express_stop_count = departure.express_stop_count;
      departureList.push(tempDeparture);
    });

    return departureList;
  }

  async getDepartures(routeType: number, stopID: number) {
    let URL: string = this.apiSigGen.createPtvSignature(`/v3/departures/route_type/${routeType}/stop/${stopID}?max_results=100&look_backwards=false&devid=`);

    const response = await fetch(URL);
    const json = await response.json();
    return this.mapResultToDepartures(json.departures);
  }

  async filterDepartures() {
    let departures = await this.getDepartures(0, 1162);
    let filtered: Departure[] = departures.filter(departure => departure.platform_number != null && departure.estimated_departure_utc != null);
    return filtered;
  }

  async getNextInbound(line: string) {
    let filteredDepartures: Departure[] = await this.filterDepartures();
    let inboundDepartures = filteredDepartures.filter(departure => departure.direction_id === 1);
    console.log(inboundDepartures)
    let destinationName: string;
    let nextTrain: Departure[] = [];

    while (destinationName !== line) {
      for (let i of inboundDepartures) {
        let destination = await this.getDestination(i.run_ref)
        destinationName = JSON.stringify(destination.destination_name);
        if (destinationName == line) {
          nextTrain.push(i);
          break;
        }
      }
    }
    nextTrain[0].run_ref = destinationName;
    nextTrain[0].estimated_departure_utc = new Date(nextTrain[0].estimated_departure_utc).toLocaleTimeString();
    return nextTrain;
  }

  async getDestination(run_ref: string) {
    let URL = this.apiSigGen.createPtvSignature(`/v3/runs/${run_ref}/route_type/0?expand=all&devid=`);

    const response = await fetch(URL);
    const json = await response.json();
    return this.mapResultToRunRef(json.run);
  }

  mapResultToRunRef(runRef: any): RunRef {
    let tempRunRef: RunRef = new RunRef();
    tempRunRef.destination_name = runRef.destination_name;
    return tempRunRef;
  }
}
