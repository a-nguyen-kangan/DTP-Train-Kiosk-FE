import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboundTrainsComponent } from './outbound-trains.component';

describe('OutboundTrainsComponent', () => {
  let component: OutboundTrainsComponent;
  let fixture: ComponentFixture<OutboundTrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutboundTrainsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutboundTrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
