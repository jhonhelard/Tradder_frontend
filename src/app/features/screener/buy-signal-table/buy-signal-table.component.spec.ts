import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySignalTableComponent } from './buy-signal-table.component';

describe('DynamicPanelComponent', () => {
  let component: BuySignalTableComponent;
  let fixture: ComponentFixture<BuySignalTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuySignalTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySignalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
