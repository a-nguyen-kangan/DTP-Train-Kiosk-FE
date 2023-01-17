import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboundTrainsComponent } from './inbound-trains.component';

describe('InboundTrainsComponent', () => {
  let component: InboundTrainsComponent;
  let fixture: ComponentFixture<InboundTrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboundTrainsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InboundTrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
