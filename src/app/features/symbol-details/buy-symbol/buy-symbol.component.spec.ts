import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySymbolComponent } from './buy-symbol.component';

describe('BuySymbolComponent', () => {
  let component: BuySymbolComponent;
  let fixture: ComponentFixture<BuySymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuySymbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
