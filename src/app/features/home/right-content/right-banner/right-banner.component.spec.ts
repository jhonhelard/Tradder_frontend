import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightBannerComponent } from './right-banner.component';

describe('RightBannerComponent', () => {
  let component: RightBannerComponent;
  let fixture: ComponentFixture<RightBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
