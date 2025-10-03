import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderOtocoComponent } from './trader-otoco.component';

describe('TraderOtocoComponent', () => {
  let component: TraderOtocoComponent;
  let fixture: ComponentFixture<TraderOtocoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderOtocoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderOtocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
