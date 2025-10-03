import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalPanelComponent } from './signal-panel.component';

describe('DynamicPanelComponent', () => {
  let component: SignalPanelComponent;
  let fixture: ComponentFixture<SignalPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
