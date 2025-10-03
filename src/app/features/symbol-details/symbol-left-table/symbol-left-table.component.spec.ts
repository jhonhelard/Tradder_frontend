import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolLeftTableComponent } from './symbol-left-table.component';

describe('SymbolLeftTableComponent', () => {
  let component: SymbolLeftTableComponent;
  let fixture: ComponentFixture<SymbolLeftTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolLeftTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolLeftTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
