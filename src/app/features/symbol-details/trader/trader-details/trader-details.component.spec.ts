import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderDetailsComponent } from './trader-details.component';

describe('TraderDetailsComponent', () => {
  let component: TraderDetailsComponent;
  let fixture: ComponentFixture<TraderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
