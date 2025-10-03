import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundamentalPanelComponent } from './fundamental-panel.component';

describe('DynamicPanelComponent', () => {
  let component: FundamentalPanelComponent;
  let fixture: ComponentFixture<FundamentalPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundamentalPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundamentalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
