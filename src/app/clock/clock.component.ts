import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
  template: `
  <h1>{{time}}<h1>
  `,
})
export class ClockComponent implements OnInit {
  date = new Date();
  time: string = this.date.toLocaleTimeString();

  getTime(): string {
    this.time = this.date.toLocaleTimeString();
    return this.time;
  }

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    const currentTime = new Date();
    this.time = currentTime.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' });
  }
}
