import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderOtoComponent } from './trader-oto.component';

describe('TraderOtoComponent', () => {
  let component: TraderOtoComponent;
  let fixture: ComponentFixture<TraderOtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderOtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderOtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
