import { Injectable } from '@angular/core';
import { ApiSignatureGenService } from '../api-signature-gen/api-signature-gen.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private apiSigGen: ApiSignatureGenService) { }

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