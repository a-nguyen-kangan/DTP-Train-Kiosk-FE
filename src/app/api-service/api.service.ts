import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor() { }

  async getDeparture(stationID: number, directionID: number) {
    try {
      const response = await fetch(`http://67.219.107.113/v1/departures/${stationID}/${directionID}`);
      let res: any[] = await response.json();
      return res;
    } catch (error) {
      console.log(`No trains running to directionID ${directionID}.\n${error}`);
      return { run_id: 'N/A', directionID: directionID, estimated_departure_utc: 'N/A', express: 'N/A', platform_number: 'N/A'}
    }
  }
}