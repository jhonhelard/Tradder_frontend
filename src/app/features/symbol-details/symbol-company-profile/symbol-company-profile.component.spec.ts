import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolCompanyProfileComponent } from './symbol-company-profile.component';

describe('SymbolCompanyProfileComponent', () => {
  let component: SymbolCompanyProfileComponent;
  let fixture: ComponentFixture<SymbolCompanyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolCompanyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
