import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderMultilegComponent } from './trader-multileg.component';

describe('TraderMultilegComponent', () => {
  let component: TraderMultilegComponent;
  let fixture: ComponentFixture<TraderMultilegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderMultilegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderMultilegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
