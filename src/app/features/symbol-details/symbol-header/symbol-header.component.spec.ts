import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolHeaderComponent } from './symbol-header.component';

describe('SymbolHeaderComponent', () => {
  let component: SymbolHeaderComponent;
  let fixture: ComponentFixture<SymbolHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
