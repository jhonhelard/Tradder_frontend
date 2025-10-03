import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderOcoComponent } from './trader-oco.component';

describe('TraderOcoComponent', () => {
  let component: TraderOcoComponent;
  let fixture: ComponentFixture<TraderOcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderOcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderOcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
