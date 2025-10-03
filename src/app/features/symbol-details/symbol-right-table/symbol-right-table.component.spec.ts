import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolRightTableComponent } from './symbol-right-table.component';

describe('SymbolRightTableComponent', () => {
  let component: SymbolRightTableComponent;
  let fixture: ComponentFixture<SymbolRightTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolRightTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolRightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
