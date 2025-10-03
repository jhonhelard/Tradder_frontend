import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Injectable,
} from "@angular/core";
import Swal from "sweetalert2";
import { Subscription } from "rxjs";
import { AlertsData } from "../alerts-data/alertsData";
import { StockAlert, StockAlertItem } from "src/app/core/models/stockalert";
import { StockAlertService } from "src/app/core/services/stock-alert.service";
import { SymbolAlertService } from "src/app/core/services/symbol-alert.service";

@Component({
  selector: "app-symbol-alert",
  templateUrl: "./symbol-alert.component.html",
  styleUrls: ["./symbol-alert.component.css"],
})
@Injectable({ providedIn: "root" })
export class SymbolAlertComponent implements OnInit {
  @Output() closeAlertEmitter = new EventEmitter<any>();

  private alertSubscription: Subscription;

  smaAlerts = AlertsData.TechnicalAlert.SMA;
  smaAlertsData = this.smaAlerts.data;
  emaAlerts = AlertsData.TechnicalAlert.EMA;
  emaAlertsData = this.emaAlerts.data;
  priceAlertsData = AlertsData.PriceAlert.data;

  smaAlertsCheckedState: boolean[] = [];
  emaAlertsCheckedState: boolean[] = [];
  priceAlertsCheckedState: boolean[] = [];

  selectedAlert: any = null;
  selectedAlertIndex: number = -1;
  appliedAlerts: StockAlertItem[] = [];

  isShowModal: boolean = false;
  isTechnicalAlertModal: boolean = false;
  isPriceAlertModal: boolean = false;
  isDeselecting: boolean = false;

  stockalert_id: string = '';
  stockalerts: StockAlert[] = [];
  alertType: string = 'Once';
  isSaved: boolean = false;

  connectorOperators = [
    { label: 'AND', value: 'AND' },
    { label: 'OR', value: 'OR' }
  ];

  constructor(
    private stockAlertService: StockAlertService,
    private symbolAlertService: SymbolAlertService
  ) {}

  ngOnInit(): void {
    this.clearAlert();
    this.alertSubscription = this.symbolAlertService.showAlertForm$.subscribe(() => {
      this.loadStockAlerts();
    });
  }

  // Modal open methods
  selectSmaItem(index: number): void {
    this.selectedAlert = this.smaAlertsData[index];
    this.selectedAlertIndex = index;
    this.selectedAlert.kind = 'sma';
    this.isDeselecting = this.smaAlertsCheckedState[index];
    this.showModal();
  }

  selectEmaItem(index: number): void {
    this.selectedAlert = this.emaAlertsData[index];
    this.selectedAlertIndex = index;
    this.selectedAlert.kind = 'ema';
    this.isDeselecting = this.emaAlertsCheckedState[index];
    this.showModal();
  }

  selectPriceAlertItem(index: number): void {
    this.selectedAlert = this.priceAlertsData[index];
    this.selectedAlertIndex = index;
    this.selectedAlert.kind = 'price';
    this.isDeselecting = this.priceAlertsCheckedState[index];
    this.showModal();
  }

  showModal(): void {
    this.isShowModal = true;
    document.body.style.overflow = 'hidden';
  }

  // Modal action buttons
  saveAlertItem(): void {
    if (this.selectedAlertIndex !== -1) {
      if (this.selectedAlert.kind === "sma") {
        this.smaAlertsCheckedState[this.selectedAlertIndex] = true;
      } else if (this.selectedAlert.kind === "ema") {
        this.emaAlertsCheckedState[this.selectedAlertIndex] = true;
      } else if (this.selectedAlert.kind === "price") {
        this.priceAlertsCheckedState[this.selectedAlertIndex] = true;
      }

      const replacedScript = this.replaceScript(this.selectedAlert.script, this.selectedAlert.param);
      const replacedDescription = this.replaceScript(this.selectedAlert.description, this.selectedAlert.param);
      this.selectedAlert.script = replacedScript;
      this.selectedAlert.description = replacedDescription;

      if (!this.appliedAlerts.some(alert => alert.script === this.selectedAlert.script)) {
        this.appliedAlerts.push(this.selectedAlert);
      }
    }

    this.closeModal();
  }

  keepAlert(): void {
    this.isShowModal = false;
    this.isDeselecting = false;
    this.selectedAlertIndex = -1;
    document.body.style.overflow = 'auto';
  }

  removeSelectedAlert(): void {
    const index = this.appliedAlerts.findIndex(alert => alert.script === this.selectedAlert.script);
    if (index !== -1) {
      this.removeAlerts(index, this.selectedAlert);
    }
    this.closeModal();
  }

  closeModal(): void {
    if (this.selectedAlertIndex !== -1) {
      if (this.selectedAlert.kind === "sma") {
        this.smaAlertsCheckedState[this.selectedAlertIndex] = false;
      } else if (this.selectedAlert.kind === "ema") {
        this.emaAlertsCheckedState[this.selectedAlertIndex] = false;
      } else if (this.selectedAlert.kind === "price") {
        this.priceAlertsCheckedState[this.selectedAlertIndex] = false;
      }
    }

    this.selectedAlertIndex = -1;
    this.selectedAlert = null;
    this.isShowModal = false;
    this.isDeselecting = false;
    document.body.style.overflow = 'auto';
  }

  removeAlerts(index: number, alert: any): void {
    if (alert.kind === "sma") {
      const idx = this.smaAlertsData.findIndex(x => x.script === alert.script && x.title === alert.title);
      if (idx >= 0) this.smaAlertsCheckedState[idx] = false;
    } else if (alert.kind === "ema") {
      const idx = this.emaAlertsData.findIndex(x => x.script === alert.script && x.title === alert.title);
      if (idx >= 0) this.emaAlertsCheckedState[idx] = false;
    } else if (alert.kind === "price") {
      const idx = this.priceAlertsData.findIndex(x => x.script === alert.script && x.title === alert.title);
      if (idx >= 0) this.priceAlertsCheckedState[idx] = false;
    }

    this.appliedAlerts.splice(index, 1);
  }

  replaceScript(script: string, param: { name: string; value: number }[]): string {
    param.forEach(({ name, value }) => {
      script = script.replace(new RegExp(name, "g"), value.toString());
    });
    return script;
  }

  SetRecurring() {
    this.alertType = "Recurring";
  }

  SetOnce() {
    this.alertType = "Once";
  }

  CreateNew(): void {
    this.appliedAlerts = [];
    this.stockalert_id = this.generateUUID();
    this.smaAlertsCheckedState.fill(false);
    this.emaAlertsCheckedState.fill(false);
    this.priceAlertsCheckedState.fill(false);

    const alert: StockAlert = {
      stockalert_id: this.stockalert_id,
      name: "New Alert",
      description: "New Alert",
      alert_type: this.alertType,
      stockalertitems: [],
    };

    this.stockalerts.push(alert);
    this.bindSelectedStockAlert(this.stockalert_id);
  }

  bindSelectedStockAlert(stockalert_id: string): void {
    const alert = this.stockalerts.find(x => x.stockalert_id === stockalert_id);
    if (!alert) return;

    this.stockalert_id = stockalert_id;
    this.appliedAlerts = alert.stockalertitems;

    this.appliedAlerts.forEach(element => {
      const { kind, script, title } = element;

      if (kind === "price") {
        const index = this.priceAlertsData.findIndex(x => x.script === script && x.title === title);
        if (index >= 0) this.priceAlertsCheckedState[index] = true;
      } else if (kind === "ema") {
        const index = this.emaAlertsData.findIndex(x => x.script === script && x.title === title);
        if (index >= 0) this.emaAlertsCheckedState[index] = true;
      } else if (kind === "sma") {
        const index = this.smaAlertsData.findIndex(x => x.script === script && x.title === title);
        if (index >= 0) this.smaAlertsCheckedState[index] = true;
      }
    });
  }

  SaveData(): void {
    if (!this.stockalert_id || this.appliedAlerts.length === 0) {
      Swal.fire("Warning", "No alerts selected!", "warning");
      return;
    }

    const alert = this.stockalerts.find(x => x.stockalert_id === this.stockalert_id);
    if (!alert) return;

    this.stockAlertService.createStockAlert(alert).subscribe({
      next: () => {
        this.isSaved = true;
        Swal.fire("Success", "Saved Alerts Data Successfully!", "success");
        this.clearAlert();
        this.loadStockAlerts();
      },
      error: () => {
        Swal.fire("Error", "Failed to save alerts. Please try again.", "error");
      },
    });
  }

 clearAlert(): void {
  this.stockalert_id = '';
  this.appliedAlerts = [];
  this.smaAlertsCheckedState = new Array(this.smaAlertsData.length).fill(false);
  this.emaAlertsCheckedState = new Array(this.emaAlertsData.length).fill(false);
  this.priceAlertsCheckedState = new Array(this.priceAlertsData.length).fill(false);
}

hideAlertSettingModal(): void {
  this.clearAlert();
  this.closeAlertEmitter.emit();
}


  loadStockAlerts(): void {
    this.appliedAlerts = [];
    this.stockAlertService.getAllStockAlerts().subscribe({
      next: data => this.stockalerts = data,
      error: error => console.error('Error fetching stock alerts', error)
    });
  }

  private generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  ngOnDestroy(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }
}
