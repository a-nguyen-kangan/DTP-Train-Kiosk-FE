import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InboundTrainsComponent } from './inbound-trains/inbound-trains.component';
import { OutboundTrainsComponent } from './outbound-trains/outbound-trains.component';
import { ClockComponent } from './clock/clock.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';

import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    InboundTrainsComponent,
    OutboundTrainsComponent,
    ClockComponent,
    BannerComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
