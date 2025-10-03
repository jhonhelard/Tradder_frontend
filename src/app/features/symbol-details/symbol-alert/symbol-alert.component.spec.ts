import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SymbolAlertComponent } from "./symbol-alert.component";

describe("LoginComponent", () => {
  let component: SymbolAlertComponent;
  let fixture: ComponentFixture<SymbolAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SymbolAlertComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

// alert.component.ts

export class AlertComponent {
  appliedAlerts = [
    {
      script: 'Moving Avg Crossover',
      description: 'SMA 20 > SMA 50',
      type: 'Technical',
      connector: 'AND'
    },
    {
      script: 'Price Breakout',
      description: 'Price crosses 52 week high',
      type: 'Price',
      connector: 'OR'
    }
  ];

  connectorOperators = [
    { label: 'AND', value: 'AND' },
    { label: 'OR', value: 'OR' }
  ];

  // Remove alert
  removeAlerts(index: number, alert: any): void {
    this.appliedAlerts.splice(index, 1);
  }

  // Edit alert
  editSelectedAlert(alert: any): void {
    this.selectedAlert = { ...alert };
    this.isShowModal = true;
  }

  selectedAlert: any = null;
  isShowModal = false;

  // Save after editing (inside modal)
  saveAlertItem(): void {
    const index = this.appliedAlerts.findIndex(a => a.script === this.selectedAlert.script);
    if (index > -1) {
      this.appliedAlerts[index] = { ...this.selectedAlert };
    }
    this.isShowModal = false;
  }

  closeModal(): void {
    this.isShowModal = false;
  }
}


