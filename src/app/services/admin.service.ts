// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { ICampus, ITrainStation } from '../models/icampus';
// @Injectable({
//   providedIn: 'root'
// })
// export class AdminService {
//   selectedStation: BehaviorSubject<ICampus> = new BehaviorSubject({} as ICampus)
//   base_url: string = `https://67.219.107.113/admin/api/v1/`;
//   constructor(private _http: HttpClient) { }
//   getSelectedStation(): void
//   {
//     this._http.get<ICampus>(`${this.base_url}Station/getSelected`).subscribe(item => {
//       this._http.get<ITrainStation>(`${this.base_url}Station/getStationToSelected?CampusId=${item.campusId}&CampusName=${item.campusName}&TrainstationId=${item.trainstationId}`).subscribe(_item => {
//         item.trainstation = _item;
//         this.selectedStation.next(item);
//       })
//     })
//   }
// }
