import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverleyPannelComponent } from './overley-pannel.component';

describe('OverleyPannelComponent', () => {
  let component: OverleyPannelComponent;
  let fixture: ComponentFixture<OverleyPannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverleyPannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverleyPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
