import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GainlossComponent } from './gainloss.component';

describe('GainlossComponent', () => {
  let component: GainlossComponent;
  let fixture: ComponentFixture<GainlossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GainlossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GainlossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
