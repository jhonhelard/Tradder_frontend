import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderComponent } from './trader.component';

describe('TraderComponent', () => {
  let component: TraderComponent;
  let fixture: ComponentFixture<TraderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
