import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { HelperService } from '../helper/helper.service';
import { catchError, filter, map, Observable, of } from 'rxjs';
import { Departure, NextDeparture } from '../departure';


@Component({
  selector: 'app-inbound-trains',
  templateUrl: './inbound-trains.component.html',
  styleUrls: ['./inbound-trains.component.css']
})
export class InboundTrainsComponent implements OnInit {
  constructor(private api: ApiService, public helper: HelperService, private ngZone: NgZone) { }

  currentTime: Date;
  cityLoopDepartures: Array<string> = [];
  nextTrain: any;
  nextDeparture: NextDeparture[] = [];
  nextDeparture$: Observable<NextDeparture[]>;

  async ngOnInit() {
    // The PTV API returns the destination as: Flinders Street , with one space at the end.
    this.updateDepartures().subscribe(nextDeparture => {
      this.nextDeparture$ = of(nextDeparture);
      // this.nextDeparture$ = of(this.nextDeparture);
      // this.updateDepartures();
      this.updateTime();
      console.log(this.getArrivingMinutes(this.toDate(this.nextTrain[0].estimated_departure_utc)));
      this.getArrivingMinutes(this.toDate(this.nextTrain[1].estimated_departure_utc));
      setInterval(() => {
        this.ngZone.run(() => {
          console.log('test');
          this.updateTime();
          this.getArrivingMinutes(this.toDate(this.nextTrain[0].estimated_departure_utc));
          this.getArrivingMinutes(this.toDate(this.nextTrain[1].estimated_departure_utc));
          this.nextDeparture$ = of(this.nextDeparture);
        });
      }, 15000);
    });

  }

  // async updateDepartures() {
  //   let nextTrain: Departure[] = await this.api.getNextInbound();

  //   for (let i in nextTrain) {
  //     let tempNextDeparture: NextDeparture = new NextDeparture();
  //     tempNextDeparture.destination = nextTrain[i].run_ref;
  //     tempNextDeparture.time = this.getArrivingMinutes(this.toDate(nextTrain[i].estimated_departure_utc)).toString();
  //     tempNextDeparture.platformNumber = nextTrain[i].platform_number;

  //     this.nextDeparture.push(tempNextDeparture);
  //   }
  // }

  // updateDepartures(): Observable<NextDeparture[]> {
  //   return new Observable(observer => {
  //     this.api.getNextInbound().then((nextTrain: Departure[]) => {
  //       for (let i in nextTrain) {
  //         let tempNextDeparture: NextDeparture = new NextDeparture();
  //         tempNextDeparture.destination = nextTrain[i].run_ref;
  //         tempNextDeparture.time = this.getArrivingMinutes(this.toDate(nextTrain[i].estimated_departure_utc)).toString();
  //         tempNextDeparture.platformNumber = nextTrain[i].platform_number;

  //         this.nextDeparture.push(tempNextDeparture);
  //         console.log(this.nextDeparture)
  //       }
  //       observer.next(this.nextDeparture);
  //       observer.complete();
  //     });
  //   });
  // }

  updateDepartures(): Observable<NextDeparture[]> {
    let nextDeparture: NextDeparture[] = [];
    return new Observable(observer => {
      this.api.getNextInbound().then((nextTrain: Departure[]) => {
        this.nextDeparture = [];
        for (let i in nextTrain) {
          let tempNextDeparture: NextDeparture = new NextDeparture();
          tempNextDeparture.destination = nextTrain[i].run_ref;
          tempNextDeparture.time = this.getArrivingMinutes(this.toDate(nextTrain[i].estimated_departure_utc)).toString();
          tempNextDeparture.platformNumber = nextTrain[i].platform_number;

          this.nextDeparture.push(tempNextDeparture);
          nextDeparture.push(tempNextDeparture);
        }
        this.nextDeparture.push(nextDeparture[0]);
        this.nextDeparture.push(nextDeparture[1]);
        //console.log(this.nextDeparture)
        observer.next(this.nextDeparture);
        observer.complete();
      });
    });
  }

  getArrivingMinutes(nextTrainTime: Date) {
    let timeDiff: number = nextTrainTime.getTime() - this.currentTime.getTime();
    let seconds: number = timeDiff / 1000;
    return Math.round(seconds / 60);
  }

  updateTime() {
    this.currentTime = new Date();
  }

  toDate(estimatedDepartureLocal: string) {
    let date: Date = new Date();
    let parts: string[] = estimatedDepartureLocal.split(/[\s:]+/);
    let hours: number = parseInt(parts[0], 10);
    let minutes: number = parseInt(parts[1], 10);
    let seconds: number = parseInt(parts[2], 10);

    if (parts[3] === "pm" && hours !== 12) {
      hours += 12;
    } else if (parts[3] === "am" && hours === 12) {
      hours = 0;
    }

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    return date;
  }
}
