import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderOptionComponent } from './trader-option.component';

describe('TraderOptionComponent', () => {
  let component: TraderOptionComponent;
  let fixture: ComponentFixture<TraderOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
