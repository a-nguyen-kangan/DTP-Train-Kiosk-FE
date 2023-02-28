import { Injectable } from '@angular/core';
import { directionIDRichmond } from '../exports';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor() { }
  selectedStationDetails: any;
  directionID: any[] = directionIDRichmond;
  nextDepartures: any[];

  async getDepartures() {
    this.nextDepartures = [];
    await this.getSelectedStation();
    for (let i in this.directionID) {
      let nextTrain: any;
      try {
        nextTrain = await this.getDeparture(this.directionID[i].id);
        this.nextDepartures.push(nextTrain);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(this.nextDepartures);
  }

  async getDeparture(directionID: number) {
    try {
      const response = await fetch(`https://api.callumhopkins.au/v1/departures/${this.selectedStationDetails.trainstationId}/${directionID}`);
      let res: any[] = await response.json();
      return res;
    } catch (error) {
      console.log(`No trains running to directionID ${directionID}.\n${error}`);
      return { run_id: 'N/A', directionID: directionID, estimated_departure_utc: 'N/A', express: 'N/A', platform_number: 'N/A' }
    }
  }

  async getSelectedStation() {
    try {
      const response: any = await fetch('https://api.callumhopkins.au/admin/api/v1/Station/getSelected');
      const res: any = await response.json();
      this.selectedStationDetails = res;
      return res;
    } catch (error) {
      console.log(`Error getting selected station.\n${error}`);
    }
  }
}