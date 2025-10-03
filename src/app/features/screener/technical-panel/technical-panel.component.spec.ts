import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalPanelComponent } from './technical-panel.component';

describe('DynamicPanelComponent', () => {
  let component: TechnicalPanelComponent;
  let fixture: ComponentFixture<TechnicalPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
