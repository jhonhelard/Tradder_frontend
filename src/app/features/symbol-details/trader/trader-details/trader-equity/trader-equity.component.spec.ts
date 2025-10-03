import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderEquityComponent } from './trader-equity.component';

describe('TraderEquityComponent', () => {
  let component: TraderEquityComponent;
  let fixture: ComponentFixture<TraderEquityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderEquityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderEquityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
