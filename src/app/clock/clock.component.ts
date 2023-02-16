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
  time: string = new Date().toLocaleTimeString();

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    this.time = new Date().toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' });
  }
}
