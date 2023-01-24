import { Component } from '@angular/core';
import { ClockComponent } from './clock/clock.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    <div>
      <app-clock></app-clock>
    </div>
  `,
})

export class AppComponent {
  title = 'Train Kiosk';
}
