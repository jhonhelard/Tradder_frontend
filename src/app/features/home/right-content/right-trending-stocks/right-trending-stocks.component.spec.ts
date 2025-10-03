import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightTrendingStocksComponent } from './right-trending-stocks.component';

describe('RightTrendingStocksComponent', () => {
  let component: RightTrendingStocksComponent;
  let fixture: ComponentFixture<RightTrendingStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightTrendingStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightTrendingStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
