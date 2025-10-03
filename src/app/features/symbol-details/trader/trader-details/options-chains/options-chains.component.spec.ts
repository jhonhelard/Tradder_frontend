import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsChainsComponent } from './options-chains.component';

describe('OptionsChainsComponent', () => {
  let component: OptionsChainsComponent;
  let fixture: ComponentFixture<OptionsChainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsChainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsChainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
