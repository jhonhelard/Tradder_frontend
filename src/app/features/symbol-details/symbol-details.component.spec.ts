import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolDetailsComponent } from './symbol-details.component';

describe('SymbolDetailsComponent', () => {
  let component: SymbolDetailsComponent;
  let fixture: ComponentFixture<SymbolDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
