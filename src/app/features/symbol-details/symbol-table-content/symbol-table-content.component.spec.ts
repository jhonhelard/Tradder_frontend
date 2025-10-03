import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolTableContentComponent } from './symbol-table-content.component';

describe('SymbolTableContentComponent', () => {
  let component: SymbolTableContentComponent;
  let fixture: ComponentFixture<SymbolTableContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolTableContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolTableContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
