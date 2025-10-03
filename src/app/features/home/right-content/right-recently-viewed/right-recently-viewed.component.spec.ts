import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightRecentlyViewedComponent } from './right-recently-viewed.component';

describe('RightRecentlyViewedComponent', () => {
  let component: RightRecentlyViewedComponent;
  let fixture: ComponentFixture<RightRecentlyViewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightRecentlyViewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightRecentlyViewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
