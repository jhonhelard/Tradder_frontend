import { Injectable } from "@angular/core";
import { SelectItem } from "primeng/api";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChartSettingsService {
  available_indicators: SelectItem[] = [];
  available_overlays: SelectItem[] = [];
  duration: string;
  cycle: string;
  type: string;
  tcStrategy: string;
  priceOverlay: PriceOverlay[];
  indicator: Indicator[];
  private _updateChartSettings = new Subject();
  updateChartSettings$ = this._updateChartSettings.asObservable();

  constructor() {
    this.priceOverlay = [];
    this.indicator = [];

    this.cycle = "Daily Chart";
    this.duration = "6m";
    this.priceOverlay.push(
      new PriceOverlay("below", "Simple Moving Average", "MA", [13])
    );
    this.priceOverlay.push(
      new PriceOverlay("below", "Simple Moving Average", "MA", [50])
    );
    this.priceOverlay.push(new PriceOverlay("below", "-- None --", "", []));
    this.priceOverlay.push(new PriceOverlay("below", "-- None --", "", []));
    this.priceOverlay.push(new PriceOverlay("below", "-- None --", "", []));
    this.priceOverlay.push(new PriceOverlay("below", "-- None --", "", []));

    this.indicator.push(
      new Indicator("above", "Relative Strength Index(Area)", "AreaRSI", [14])
    );
    this.indicator.push(new Indicator("below", "VOLUME", "VOLMA", [60]));
    this.indicator.push(new Indicator("below", "MACD", "MACD", [12, 26, 9]));
    this.indicator.push(new Indicator("below", "", "-- None --", []));
    this.indicator.push(new Indicator("below", "", "-- None --", []));
    this.indicator.push(new Indicator("below", "", "-- None --", []));
  }

  updateIndicator(
    index: number,
    shortName: string,
    values: string,
    level: string
  ) {
    shortName = shortName ? shortName.substring(0, shortName.indexOf("(")) : "";
    const ind = this.available_indicators.findIndex(
      (item) => item.value.indexOf(shortName) === 0
    );
    if (index < this.indicator.length) {
      this.indicator[index].level = level === "{U}" ? "above" : "below";
      this.indicator[index].name =
        ind > -1 ? this.available_indicators[ind].label : "";
      this.indicator[index].shortName = shortName;
      this.indicator[index].values = values ? values.split(",") : [];
    }
  }

  updateOverlay(index: number, shortName: string, values: string) {
    shortName = shortName ? shortName.substring(0, shortName.indexOf("(")) : "";
    const ind = this.available_overlays.findIndex(
      (item) => item.value.indexOf(shortName) === 0
    );

    if (index < this.priceOverlay.length) {
      this.priceOverlay[index].level = "below";
      this.priceOverlay[index].name =
        ind > -1 ? this.available_overlays[ind].label : "";
      this.priceOverlay[index].shortName = shortName;
      this.priceOverlay[index].values = values ? values.split(",") : [];
    }
  }

  updateSelectedChartSettings() {
    this._updateChartSettings.next();
  }
}

class PriceOverlay {
  constructor(
    public level: string,
    public name: string,
    public shortName: string,
    public values: any
  ) {}
}

class Indicator {
  constructor(
    public level: string,
    public name: string,
    public shortName: string,
    public values: any
  ) {}
}
