import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTechnicalScannerComponent } from './home-technical-scanner.component';

describe('HomeTechnicalScannerComponent', () => {
  let component: HomeTechnicalScannerComponent;
  let fixture: ComponentFixture<HomeTechnicalScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTechnicalScannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTechnicalScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
