import { Injectable } from '@angular/core';
import * as CryptoJs from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ApiSignatureGenService {
  constructor() { }

  baseUrl: string = "https://timetableapi.ptv.vic.gov.au";

  createPtvSignature(request: string): string {
    let key = "9cb90ddd-4516-44a9-98f0-54498a42bf0a";
    const ref_sig = "D2A548AFEE1C708366BC7CE82D5859A1FACEBA6E";
    let dev_id = "3002282";
    let URL: string = request + dev_id;
    let cryptoSig = CryptoJs.HmacSHA1(URL, key);
    cryptoSig = CryptoJs.enc.Hex.stringify(cryptoSig);
    // console.log(this.baseUrl + URL + "&signature=" + cryptoSig)
    return this.baseUrl + URL + "&signature=" + cryptoSig;
  }

  // createPtvSignatureR() {
  //   let key = "9cb90ddd-4516-44a9-98f0-54498a42bf0a";
  //   const ref_sig = "9188291A286937BCF95C8599AB137528A1419716";
  //   let dev_id = "3002282";
  //   let request = `/v3/departures/route_type/0/stop/1162?max_results=100&look_backwards=false&devid=${dev_id}`;
  //   console.log(request);
  //   let cryptoSig = CryptoJs.HmacSHA1(request, key);
  //   cryptoSig = CryptoJs.enc.Hex.stringify(cryptoSig);
  //   return request + "&signature=" + cryptoSig;
  // }
}
