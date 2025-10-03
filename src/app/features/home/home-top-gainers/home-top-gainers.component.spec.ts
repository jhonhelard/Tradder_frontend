import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTopGainersComponent } from './home-top-gainers.component';

describe('HomeTopGainersComponent', () => {
  let component: HomeTopGainersComponent;
  let fixture: ComponentFixture<HomeTopGainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTopGainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTopGainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
