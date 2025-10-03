import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderComboComponent } from './trader-combo.component';

describe('TraderComboComponent', () => {
  let component: TraderComboComponent;
  let fixture: ComponentFixture<TraderComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
