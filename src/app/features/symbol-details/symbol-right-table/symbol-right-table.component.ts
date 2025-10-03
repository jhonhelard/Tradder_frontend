import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  OnChanges, 
  SimpleChanges
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LocalstorageHelper } from "src/app/core/helpers/localstorage.helper";
import { DatePipe, DecimalPipe, formatDate } from "@angular/common";
import { SelectItem } from "primeng/api";
import { TruchartsService } from "src/app/core/services/trucharts.service";
import { OverlayPanel } from "primeng/public_api";
import { ThrowStmt } from "@angular/compiler";
import { GeneralService } from "src/app/core/services/general.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser"; //webxtor.tradingview
import { StockService } from "src/app/core/services/stock.service";
import { catchError } from "rxjs/operators";
import { ChartSettingsService } from "src/app/core/services/chartsettings.service";
import { LoginService } from "src/app/core/services/login.service";
import { SymbolAlertService } from "src/app/core/services/symbol-alert.service";
import { AuthService } from "src/app/core/services/auth.service";
import { PermissionsService } from "src/app/core/services/permissions.service";
import { RoleConst } from "src/app/core/constants/app.const";

import { environment } from "src/environments/environment";
import { Console, error } from "console";
import { EarningsService } from "../../../core/services/earnings.service";


declare var $: any;

@Component({
  selector: "app-symbol-right-table",
  templateUrl: "./symbol-right-table.component.html",
  styleUrls: ["./symbol-right-table.component.css"],
})  
export class SymbolRightTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() symbol: string; // Accept symbol dynamically
  reportDate: string;
  wait1000MS: boolean = false;
  oldwebsiteUrl: string = environment.oldwebsiteUrl;
  @ViewChild("chartcontent", { read: ElementRef })
  public widgetsContent: ElementRef<any>;
  cols: any[];
  dividendHistoryData: any;
  dividendHistory24Months: any;
  dividendHistoryFirstRow: any;
  stableStock: any;
  chartTimeFrame: any = "all";
  quote: any;

 
  nextEarningsDate = "";
  weeklyOptionable: string;

  cycle: string = "Day1";
  cycleText: string = "Daily";
  strategies: SelectItem[] = [];
  strategySelected: string = "";
  overlays: SelectItem[] = [];
  overlayModels: any[] = [];
  overlayValues: string = "";
  overlay1: string;
  overlayParam1: string;
  overlay2: string;
  overlayParam2: string;
  overlay3: string;
  overlayParam3: string;
  overlay4: string;
  overlayParam4: string;
  overlay5: string;
  overlayParam5: string;
  overlay6: string;
  overlayParam6: string;

  indicators: SelectItem[] = [];
  indicatorModels: any[] = [];
  indicatorValues: string;
  indicatorOperators: SelectItem[] = [];
  indicator1: string;
  indicatorParam1: string;
  indicatorOperator1: string = "";
  indicator2: string;
  indicatorParam2: string;
  indicatorOperator2: string = "";
  indicator3: string;
  indicatorParam3: string;
  indicatorOperator3: string = "";
  indicator4: string;
  indicatorParam4: string;
  indicatorOperator4: string = "";
  indicator5: string;
  indicatorParam5: string;
  indicatorOperator5: string = "";
  indicator6: string;
  indicatorParam6: string;
  indicatorOperator6: string = "";

  viewMode: string;
  startDate: Date;
  endDate: Date;
  dateType: string = "6M";
  dateRangeChecked: string = "false";
  chartType: number = 3;
  chartSettingsList: any;
  chartSettingsName: string = "";
  chartSettingsError: string = "";
  isChartSettingsUpdate: boolean = false;

  chartWidth = 1860;
  chartHeight = 1320;

  public safeURL: SafeResourceUrl; //webxtor.tradingview

  autoRefreshEnabled: boolean = false;

  ctl00_ContentPlaceHolder1_ol0: any[];
  constructor(
    private _localstorageHelper: LocalstorageHelper,
    private _activatedRoute: ActivatedRoute,
    private _datepipe: DatePipe,
    private _truchartsService: TruchartsService,
    private _generalService: GeneralService,
    private _sanitizer: DomSanitizer,
    private _stockService: StockService,
    private numberPipe: DecimalPipe,
    private _chartSettingsService: ChartSettingsService,
    private _loginService: LoginService,
    private _symbolAlertService: SymbolAlertService,
    private _authService: AuthService,
    private permissionsService: PermissionsService,
    private earningsService: EarningsService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {} //webxtor.tradingview: _sanitizer

  ngAfterViewInit() {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft + 600,
      behavior: "smooth",
    });
  }

  @HostListener("window:resize")
  onResize() {
    this.detectScreenSize();
  }

  detectScreenSize() {
    if (window.innerWidth < 767) {
      this.chartWidth = 600;
      this.chartHeight = 400;
    }

    if (window.innerWidth > 767 && window.innerWidth < 1200) {
      this.chartWidth = 800;
      this.chartHeight = 600;
    }

    if (window.innerWidth > 1200 && window.innerWidth < 1979.99) {
      this.chartWidth = 900;
      this.chartHeight = 700;
    }

    if (window.innerWidth > 1980) {
      this.chartWidth = 1860;
      this.chartHeight = 1320;
    }
  }

  get isLoggedIn() {
    return this._authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.detectScreenSize();
      // Get the symbol from the URL
   
        
    
        setTimeout(() => {
      this.wait1000MS = true;
    }, 1000);

    this.fetchEarningsData(this.symbol);
    this.fetchEarnings(); // Fetch earnings whenever symbol changes
    
    // this.indicator1 = 'AreaRSI(14)';
    // this.indicatorParam1 = '14';
    // this.indicatorOperator1 = '{U}'

    // this.indicator2 = 'VOLMA(60)';
    // this.indicatorParam2 = '60'; 

    // this.indicator3 = 'MACD(12,26,9)';
    // this.indicatorParam3 = '12,26,9';

    // this.overlay1 = 'MA(12)';
    // this.overlayParam1 = '13';

    // this.overlay2 = 'MA(12)';
    // this.overlayParam2 = '50';

    if (!localStorage.getItem("app_email")) {
      this.indicatorModels.push({
        indicator: "AreaRSI(14)",
        indicatorParam: "14",
        indicatorOperator: "{U}",
      });
      this.indicatorModels.push({
        indicator: "VOLMA(60)",
        indicatorParam: "60",
        indicatorOperator: "",
      });
      this.indicatorModels.push({
        indicator: "MACD(12,26,9)",
        indicatorParam: "12,26,9",
        indicatorOperator: "",
      });
      this.indicatorModels.push({
        indicator: "",
        indicatorParam: "",
        indicatorOperator: "",
      });

      this.overlayModels.push({ overlay: "MA(12)", overlayParam: "13" });
      this.overlayModels.push({ overlay: "MA(12)", overlayParam: "50" });
      this.overlayModels.push({ overlay: "", overlayParam: "" });
      this.overlayModels.push({ overlay: "", overlayParam: "" });
    }

    this._activatedRoute.paramMap.subscribe((params) => {
      console.log('this._activatedRoute.paramMap', params);
      this.symbol = params.get("id");

      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(
        "https://trucharts.co.in/?symbol=" +
          this.symbol +
          "#theme_" +
          (this.viewMode === "light-mode" ? "Light" : "Dark")
      ); //webxtor.tradingview

      this._generalService.getEarningsDate(this.symbol).subscribe(
        (data: any) => {
          if (!!data) {
            this.nextEarningsDate = data.nextEarningsDate;
          }
        },
        (error) => {
          console.error('Error fetching earnings data:', error);
          // Optionally, show a user-friendly message
          this.nextEarningsDate = null; // Or set a default value/error state
        }
      );
      
        this.earningsService.getEarnings(this.symbol);
        this.nextEarningsDate=this.reportDate;
      this._stockService.isOptionable(this.symbol).subscribe((data: any) => {
        this.weeklyOptionable = data === "True" ? "Yes" : "No";
      });
      this.loadDividentHistory();
    });

    this.viewMode = this._localstorageHelper.getViewModelInitial();
    this._localstorageHelper.getViewMode().subscribe((mode) => {
      this.viewMode = mode;
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(
        "https://trucharts.co.in/?symbol=" +
          this.symbol +
          "#theme_" +
          (mode === "light-mode" ? "Light" : "Dark")
      ); //webxtor.tradingview
    });
    this.startDate = new Date();
    this.endDate = new Date();
    this.ctl00_ContentPlaceHolder1_ol0 = [
      {
        Id: 1,
        Name: "123",
      },
    ];

    this.indicatorOperators = [
      { label: "Above", value: "{U}" },
      { label: "Below", value: "" },
    ];

    this._truchartsService.getOverlayOptions().subscribe((data) => {
      if (!data.message) return;
      const options = this.decodeEntities(data.message).split(";");
      const adjustOptions = options.map((x) => {
        if (x !== "") {
          const splitString = x.split(":");
          if (splitString.length >= 2)
            return { label: splitString[1], value: splitString[0] };
        }
        return null;
      });

      this.overlays = [{ label: "-- None --", value: "" }].concat(
        adjustOptions.filter((x) => !!x)
      );
      this._chartSettingsService.available_overlays = this.overlays;
    });

    this._truchartsService.getIndicatorOptions().subscribe((data) => {
      if (!data.message) return;
      const options = this.decodeEntities(data.message).split(";");
      const adjustOptions = options.map((x) => {
        if (x !== "") {
          const splitString = x.split(":");
          if (splitString.length >= 2)
            return { label: splitString[1], value: splitString[0] };
        }
        return null;
      });

      this.indicators = [{ label: "-- None --", value: "" }].concat(
        adjustOptions.filter((x) => !!x)
      );
      this._chartSettingsService.available_indicators = this.indicators;
    });

    this.strategies = [{ label: "TC Strategy", value: 1 }];

    this.updateDateType(this.dateType);

    this.cols = [
      { field: "ex_date", header: "Ex/EFF DATE" },
      { field: "cash_amount", header: "DIVIDEND AMOUNT" },
      { field: "declaration_date", header: "DECLARATION DATE" },
      { field: "record_date", header: "RECORD DATE" },
      { field: "pay_date", header: "PAYMENT DATE" },
    ];

    this._stockService.getMarketQuotes(this.symbol).subscribe((data: any) => {
      this.quote = data.quotes.quote;
    });
    setTimeout(() => {
      this._chartSettingsService.updateChartSettings$.subscribe((e) => {
        console.log(e);
        // this.updateSelectedChartSettings();
      });

      this.getChartSettings();

      this._loginService.loginStatusChanged$.subscribe(() => {
        this.getChartSettings();
      });

      if (!localStorage.getItem("app_email")) {
        this.updateIndicatorChartSettings(false);
        this.updateOverlayChartSettings(false);
      }
    }, 500);

    const refreshTime = localStorage.getItem('refresh_time');
    this.autoRefreshEnabled = refreshTime === 'true' ;
    
    // if (this.autoRefreshEnabled) this.startAutoRefresh();

  }
  ngOnChanges(changes: SimpleChanges): void {
    // Check if 'symbol' has changed
    if (changes['symbol'] && !changes['symbol'].firstChange) {
      this.fetchEarnings(); // Fetch earnings whenever symbol changes
    }
  }
  getChartSettings() {
    this._truchartsService.getChartSettingsList().subscribe((data) => {
      this.chartSettingsList = data;

      const localStorageIndicatorModels =
        localStorage.getItem("IndicatorModels");

      if (
        localStorageIndicatorModels &&
        JSON.parse(localStorageIndicatorModels).length
      ) {
        const indicatorModels = JSON.parse(localStorageIndicatorModels);
        this.indicatorModels = indicatorModels;
        this.updateIndicatorChartSettings(false);
      } else if (data.length > 0) {
        const newData = data[2] || data[1] || data[0];
        this.indicatorModels = (newData as any).chartSetting.indicator;
        this.updateIndicatorChartSettings(true);
      }

      const localStorageOverlaysModels = localStorage.getItem("OverlayModels");

      if (
        localStorageOverlaysModels &&
        JSON.parse(localStorageOverlaysModels).length
      ) {
        this.overlayModels = JSON.parse(localStorageOverlaysModels);
        this.updateOverlayChartSettings(false);
      } else if (data.length > 0) {
        const newData = data[2] || data[1] || data[0];
        this.overlayModels = (newData as any).chartSetting.priceOverlay;
        this.updateOverlayChartSettings(true);
      }
    });
  }

  updateToLocalstorage() {
    localStorage.setItem(
      "IndicatorModels",
      JSON.stringify(this.indicatorModels)
    );
    localStorage.setItem("OverlayModels", JSON.stringify(this.overlayModels));
  }

  get strategyText() {
    switch (this.strategySelected) {
      case "TCFast();":
        return "TC Fast Strategy";
      case "TCPositional();":
        return "TC Positional Strategy ";
      case "GoldenSpike();":
        return "TC Premium Strategy";
      case "Ichimoku();":
        return "Ichimoku Cloud";
      case "TurtleTrading();":
        return "Turtle Trading Strategy";
      default:
        return "Trade Strategy";
    }
  }

  SelectOption(event): void {}

  cycleChange(cy, cyText) {
    this.cycle = cy;
    this.cycleText = cyText;
  }

  getDateString(date) {
    return this._datepipe.transform(date, "yyyyMMdd");
  }

  showOverley(event, overlaypanel: OverlayPanel) {
    if (!!overlaypanel) {
      overlaypanel.bindDocumentResizeListener = () => {};
      overlaypanel.show(event);
    }
  }

  hideOverley(overlaypanel: OverlayPanel) {
    if (!!overlaypanel) overlaypanel.hide();
  }

  decodeEntities(str) {
    // this prevents any overhead from creating the object each time
    const element = document.createElement("div");
    if (str && typeof str === "string") {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = "";
    }
    return str;
  }

  overlaySelected(item, overlaySelectIndex: number) {
    let paramValue = "";
    if (!!item.value && item.value !== "") {
      paramValue = item.value.substring(item.value.indexOf("(") + 1);
      paramValue = paramValue.substring(0, paramValue.indexOf(")"));
    }

    this.overlayModels[overlaySelectIndex].overlayParam = paramValue;
  }

  indicatorSelected(item, index: number) {
    let paramValue = "";
    if (!!item.value && item.value !== "") {
      paramValue = item.value.substring(item.value.indexOf("(") + 1);
      paramValue = paramValue.substring(0, paramValue.indexOf(")"));
    }

    this.indicatorModels[index].indicatorParam = paramValue;
  }

  updateChartByIndicator(opIndicator) {
    if (!this.indicatorModels.length) {
      return;
    }
    this.indicatorValues = "";

    this.indicatorModels.forEach((model, index) => {
      console.log(model);
      if (model.indicatorParam !== "") {
        this.indicatorValues += this.getIndicatorParamValue(
          model.indicator,
          model.indicatorParam,
          model.indicatorOperator
        );
      }
      this._chartSettingsService.updateIndicator(
        index,
        model.indicator,
        model.indicatorParam,
        model.indicatorOperator
      );
    });

    localStorage.setItem(
      "IndicatorModels",
      JSON.stringify(this.indicatorModels)
    );
    this.hideOverley(opIndicator);
  }

  private getIndicatorParamValue(func, param, operator) {
    if (!!param && param !== "") {
      func = func.substr(0, func.indexOf("("));
      return `${func}(${param})${operator};`;
    }
    return "";
  }

  updateChartByOverlay(opOverlay) {
    if (!this.overlayModels.length) {
      return;
    }
    this.overlayValues = "";

    this.overlayModels.forEach((model, index) => {
      if (model.overlayParam !== "") {
        this.overlayValues += this.getOverlayParamValue(
          model.overlay,
          model.overlayParam
        );
      }
      this._chartSettingsService.updateOverlay(
        index,
        model.overlay,
        model.overlayParam
      );
    });
    localStorage.setItem("OverlayModels", JSON.stringify(this.overlayModels));
    this.hideOverley(opOverlay);
  }

  updateChartModal() {
    this.overlayValues = "";

    this.overlayModels.forEach((model, index) => {
      if (model.overlayParam !== "") {
        this.indicatorValues += this.getOverlayParamValue(
          model.overlay,
          model.overlayParam
        );
      }
    });

    // if (this.overlayParam1 !== "")
    //   this.overlayValues += this.getOverlayParamValue(this.overlay1, this.overlayParam1);

    // if (this.overlayParam2 !== "")
    //   this.overlayValues += this.getOverlayParamValue(this.overlay2, this.overlayParam2);

    // if (this.overlayParam3 !== "")
    //   this.overlayValues += this.getOverlayParamValue(this.overlay3, this.overlayParam3);

    // if (this.overlayParam4 !== "")
    //   this.overlayValues += this.getOverlayParamValue(this.overlay4, this.overlayParam4);

    // if (this.overlayParam5 !== "")
    //   this.overlayValues += this.getOverlayParamValue(this.overlay5, this.overlayParam5);

    // if (this.overlayParam6 !== "")
    //   this.overlayValues += this.getOverlayParamValue(this.overlay6, this.overlayParam6);
  }

  updateChartType(type) {
    this.chartType = type;
  }

  updateStrategy(s) {
    this.strategySelected = s;
  }

  updateDateType(type) {
    this.dateType = type;
    switch (type) {
      case "DR":
        this.dateRangeChecked = "true";
        return;
       case "3M":
        this.endDate = new Date();
        this.endDate.setDate(this.endDate.getDate() + 1);
        this.startDate = new Date();
        this.startDate.setMonth(this.startDate.getMonth() - 3);
        break;
      case "6M":
        this.endDate = new Date();
        this.endDate.setDate(this.endDate.getDate() + 1);
        this.startDate = new Date();
        this.startDate.setMonth(this.startDate.getMonth() - 6);
        break;
      case "1y":
        this.endDate = new Date();
        this.endDate.setDate(this.endDate.getDate() + 1);
        this.startDate = new Date();
        this.startDate.setFullYear(this.startDate.getFullYear() - 1);
        break;
         case "3y":
        this.endDate = new Date();
        this.endDate.setDate(this.endDate.getDate() + 1);
        this.startDate = new Date();
        this.startDate.setFullYear(this.startDate.getFullYear() - 3);
        break;
      case "5y":
        this.endDate = new Date();
        this.endDate.setDate(this.endDate.getDate() + 1);
        this.startDate = new Date();
        this.startDate.setFullYear(this.startDate.getFullYear() - 5);
        break;
      default:
        this.endDate = new Date();
        this.endDate.setDate(this.endDate.getDate() + 1);
        this.startDate = new Date(1990, 0, 1);
        break;
    }
    this.dateRangeChecked = "false";
  }

  loadDividentHistory() {
    this._stockService.getDividentHistory(this.symbol).subscribe(
      (data: any) => {
        let i = 0;
  
        // Check if data[0] and necessary nested properties exist and are not null/undefined
        while (
          i < 5 &&
          data?.[0]?.results?.[i]?.tables?.cash_dividends === null
        ) {
          i++;
        }
  
        // Adjust index based on dividend data availability
        if (i > 1) i = i - 1;
  
        // Check if the dividend data exists at the index and is not null/undefined
        if (data?.[0]?.results?.[i]?.tables?.cash_dividends) {
          this.populateDividendResult(data[0].results[i]);
        } else {
          this.dividendHistory24Months = [];
          this.dividendHistoryData = [];
          this.dividendHistoryFirstRow = null;
          // Handle case when dividend data is unavailable
          this.loadChart([]);
        }
      },
      (error) => {
        console.error('Error fetching dividend history:', error);
        // Handle error if the API call fails
      }
    );
  
    // Fetch stable stock data
    this._stockService.getStableStock(this.symbol).subscribe(
      (data) => {
        this.stableStock = data;
      },
      (error) => {
        console.error('Error fetching stable stock:', error);
        // Handle error if the API call fails
      }
    );
  }
  

  populateDividendResult(results) {
    this.dividendHistory24Months = results.tables.cash_dividends.filter(
      (x) =>
        new Date(x.pay_date) >
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 24,
          new Date().getDate()
        )
    );

    this.dividendHistoryData = results.tables.cash_dividends;
    const datafrom2000 = this.dividendHistoryData.filter(
      (x) => new Date(x.pay_date) > new Date(2000, 1, 1)
    );
    this.dividendHistory24Months = datafrom2000;

    if (this.dividendHistory24Months.length > 0) {
      this.dividendHistoryFirstRow = this.dividendHistory24Months[0];
    } else {
      this.dividendHistoryFirstRow = null;
    }
    // alert('populateDividendResult')
    this.loadChart(this.dividendHistory24Months);
  }

  isPaginatorDividentHistoryVisible() {
    return !!this.dividendHistoryData && this.dividendHistoryData.length > 0;
  }

  private getOverlayParamValue(func, param) {
    if (!!param && param !== "") {
      func = func.substr(0, func.indexOf("("));
      return `${func}(${param});`;
    }
    return "";
  }

  /*Chart */
  basicData: any;
  basicOptions = {
    tooltips: {
      mode: "index",
      intersect: false, // all points in chart to show tooltip
      callbacks: {
        // adding labels as title in tooltip
        title: function (tooltipItems, data) {
          return formatDate(
            new Date(tooltipItems[0].xLabel),
            "MMM d, yyyy",
            "en-US"
          );
        },
        label: function (contex) {
          return "";
        },
        afterBody: function (context) {
          var data = JSON.parse(localStorage.getItem("ChartData"));
          var item = data.find((x) => x.pay_date === context[0].xLabel);
          var frequency = "";
          switch (item.frequency) {
            case 4:
              frequency = "Quarterly";
              break;
            case 2:
              frequency = "Half Yearly";
              break;
            default:
              frequency = "Yearly";
              break;
          }
          return [
            "DPS: $" + item.cash_amount.toFixed(2),
            "Frequency: " + frequency,
            "Declared: " + item.declaration_date,
            "Ex Date: " + item.ex_date,
            "Pay Date: " + item.pay_date,
          ];
        },
      },
    },
    title: {
      display: true,
      text: "Dividend History Price",
      fontSize: 16,
    },
    legend: {
      labels: {
        fontColor: "#9b9b9b",
      },
      position: "bottom",
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "#9b9b9b",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: "#9b9b9b",
          },
        },
      ],
    },
  };

  loadChart(datafrom2000) {
    // alert('loadchart')
    const tempData = [...datafrom2000];
    localStorage.setItem("ChartData", JSON.stringify(tempData));
    tempData.sort((a, b) => a.pay_date.localeCompare(b.pay_date));
    this.basicData = {
      labels: tempData.map((x) => x.pay_date),
      datasets: [
        {
          label: "Dividend History Price",
          //data: datafrom2000.map(x => x.cash_amount),
          data: tempData.map((x) => x.cash_amount),
          fill: false,
          borderColor: "#42A5F5",
        } /*,
        {
          label: 'DIVIDEND AMOUNT',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#FFA726'
        }*/,
      ],
    };
  }
  /*End Chart */

  getDisplayValue(value) {
    if (!!value || value === 0) return value;
    return "N/A";
  }

  getRatioValue() {
    if (!!this.dividendHistoryFirstRow) {
      const value =
        (this.dividendHistoryFirstRow?.cash_amount *
          this.dividendHistoryFirstRow?.frequency) /
        this.stableStock?.ttmEPS;
      return this.numberPipe.transform(value, "1.2-2") + "%";
    }
    return "N/A";
  }

  getDividendYield() {
    if (
      !!this.dividendHistoryFirstRow?.cash_amount &&
      this.quote !== undefined
    ) {
      const value =
        ((this.dividendHistoryFirstRow?.cash_amount *
          this.dividendHistoryFirstRow?.frequency) /
          this.quote.last) *
        100;
      return this.numberPipe.transform(value, "1.2-2") + "%";
    }

    return "N/A";
  }

  getDevidendAmountDisplay(dividendHistoryFirstRow) {
    let value = dividendHistoryFirstRow?.cash_amount;
    if (!!value || value === 0) {
      switch (dividendHistoryFirstRow.frequency) {
        case 4:
          return value + " (Quarterly)";
        case 2:
          return value + " (Half Yearly)";
        case 1:
          return value + " (Yearly)";
        default:
          return value;
      }
    }
    return "N/A";
  }

  updateChartTimeFrame(value) {
    this.chartTimeFrame = value;
    //let dateStart: Date = new Date();
    let dateEnd: Date = null;
    switch (value) {
      case "1m":
        dateEnd = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 30
        );
        break;
      case "3m":
        dateEnd = new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 3,
          new Date().getDate()
        );
        break;
      case "6m":
        dateEnd = new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 6,
          new Date().getDate()
        );
        break;
      case "ytd":
        dateEnd = new Date(new Date().getFullYear(), 1, 1);
        break;
      case "1y":
        dateEnd = new Date(
          new Date().getFullYear() - 1,
          new Date().getMonth(),
          new Date().getDate()
        );
        break;
      case "5y":
        dateEnd = new Date(
          new Date().getFullYear() - 5,
          new Date().getMonth(),
          new Date().getDate()
        );
      case "10y":
        dateEnd = new Date(
          new Date().getFullYear() - 10,
          new Date().getMonth(),
          new Date().getDate()
        );
        break;
    }

    let dataChart: any;
    if (!!dateEnd) {
      dataChart = this.dividendHistoryData.filter(
        (x) => new Date(x.pay_date) >= dateEnd
      );
    } else {
      dataChart = this.dividendHistoryData;
    }
    alert('time')
    this.loadChart(dataChart);

  }

  updateIndicatorChartSettings(updateFormValues: boolean) {
    if (updateFormValues) {
      this._chartSettingsService.indicator.forEach(
        (indicator, indicatorIndex) => {
          const ind = this.indicators.findIndex(
            (item) => item.value.indexOf(indicator.shortName) === 0
          );

          const shortName = ind > -1 ? this.indicators[ind].value : "";
          const values = indicator.values.join();
          const level = indicator.level === "above" ? "{U}" : "";

          console.log("Indicator: ", shortName, " => ", values, "=>", level);

          this.indicatorModels.forEach((model, index) => {
            switch (indicatorIndex) {
              case index:
                model.indicator = shortName;
                model.indicatorParam = values;
                model.indicatorOperator = level;
                break;
            }
          });
        }
      );
    }

    this.updateChartByIndicator(null);
  }

  updateOverlayChartSettings(updateFormValues: boolean) {
    if (updateFormValues) {
      this._chartSettingsService.priceOverlay.forEach(
        (priceOverlay, overlayIndex) => {
          const ind = this.overlays.findIndex(
            (item) => item.value.indexOf(priceOverlay.shortName) === 0
          );

          const shortName = ind > -1 ? this.overlays[ind].value : "";
          const values = priceOverlay.values.join();
          console.log("Overlay: ", shortName, " => ", values);
          // switch (overlayIndex) {
          //   case 0:
          //     this.overlay1 = shortName;
          //     this.overlayParam1 = values;
          //     break;
          //   case 1:
          //     this.overlay2 = shortName;
          //     this.overlayParam2 = values;
          //     break;
          //   case 2:
          //     this.overlay3 = shortName;
          //     this.overlayParam3 = values;
          //     break;
          //   case 3:
          //     this.overlay4 = shortName;
          //     this.overlayParam4 = values;
          //     break;
          //   case 4:
          //     this.overlay5 = shortName;
          //     this.overlayParam5 = values;
          //     break;
          //   case 5:
          //     this.overlay6 = shortName;
          //     this.overlayParam6 = values;
          //     break;
          // }
          this.overlayModels.forEach((model, index) => {
            switch (overlayIndex) {
              case index:
                model.overlay = shortName;
                model.overlayParam = values;
                break;
            }
          });
        }
      );
    }

    this.updateChartByOverlay(null);
  }

  onCreateNewChartSettings() {
    this.chartSettingsError = "";
    if (this.chartSettingsName === "") {
      this.chartSettingsError = "Please enter name for the watchlist";
      return;
    }

    this._truchartsService
      .createChartSettingsTemplate(
        this.chartSettingsName,
        this._chartSettingsService.duration,
        this._chartSettingsService.cycle,
        this._chartSettingsService.type,
        this._chartSettingsService.tcStrategy,
        this._chartSettingsService.priceOverlay,
        this._chartSettingsService.indicator
      )
      .subscribe((data) => {
        $("#chartsettings-modal").modal("hide");

        if (this.isChartSettingsUpdate) {
          const index = this.chartSettingsList.findIndex(
            (settings) => settings.name === this.chartSettingsName
          );

          if (index > -1) {
            this.chartSettingsList[index] = {
              name: this.chartSettingsName,
              chartSetting: {
                duration: this._chartSettingsService.duration,
                cycle: this._chartSettingsService.cycle,
                type: this._chartSettingsService.type,
                tcStrategy: this._chartSettingsService.tcStrategy,
                priceOverlay: this._chartSettingsService.priceOverlay,
                indicator: this._chartSettingsService.indicator,
              },
            };
          }
        } else {
          this.chartSettingsList.push({
            name: this.chartSettingsName,
            chartSetting: {
              duration: this._chartSettingsService.duration,
              cycle: this._chartSettingsService.cycle,
              type: this._chartSettingsService.type,
              tcStrategy: this._chartSettingsService.tcStrategy,
              priceOverlay: this._chartSettingsService.priceOverlay,
              indicator: this._chartSettingsService.indicator,
            },
          });
        }

        this.chartSettingsName = "";
        this.isChartSettingsUpdate = false;
      });
  }

  updateChartSettings(name: string) {
    this.chartSettingsName = name;
    this.isChartSettingsUpdate = true;

    this.onCreateNewChartSettings();
  }

  changeChartSettings(name: string) {
    const setting = this.chartSettingsList.find(
      (settings) => settings.name === name
    );
    if (setting) {
      if (setting.chartSetting.priceOverlay) {
        this._chartSettingsService.priceOverlay =
          setting.chartSetting.priceOverlay;
        this.overlayModels = setting.chartSetting.priceOverlay;
        this.updateOverlayChartSettings(true);
      }
      if (setting.chartSetting.indicator) {
        this._chartSettingsService.indicator = setting.chartSetting.indicator;
        this.indicatorModels = setting.chartSetting.indicator;
        this.updateIndicatorChartSettings(true);
      }
    }
  }

  gotoLogin() {
    this._loginService.showLoginForm();
  }
  gotoSymbolAlert() {
    this._symbolAlertService.showAlertForm();
  }
  hasPermission() {
    this.permissionsService.hasPermission([
      RoleConst.Administrators,
      RoleConst.Silver,
      RoleConst.Gold,
      RoleConst.Platinum,
    ]);
  }
  addNewIndicator() {
    this.indicatorModels.push({
      indicator: "",
      indicatorParam: "",
      indicatorOperator: "",
    });
  }
  removeIndicator(i) {
    this.indicatorModels.splice(i, 1);
  }
  addNewOverley() {
    this.overlayModels.push({ overlay: "", overlayParam: "" });
  }
  removeOverley(i) {
    this.overlayModels.splice(i, 1);
  }
 

 // Method to fetch the report date based on the symbol
 fetchEarningsData(symbol: string) {
  if (symbol) {
    this._generalService.getEarnings(symbol).subscribe((data: any) => {
      if (data && data.earnings && data.earnings.length > 0) {
        this.reportDate = data.earnings[0].report_date; // Extract the 1st report date
      }
    }, error => {
      console.error('Failed to fetch earnings data:', error);
    });
  }
}
fetchEarnings() {
  if (this.symbol) {
    this._generalService.getEarnings(this.symbol).subscribe(
      (response) => {
        if (response && response.earnings && response.earnings.length > 0) {
          this.reportDate = response.earnings[0].report_date;
        }
      },
      (error) => {
        console.error('Error fetching earnings:', error);
      }
    );
  }
}
////////////////////////////////////////////////

intervalId: any;
toggleAutoRefresh(event: any) {
  localStorage.setItem('refresh_time', String(event.target.checked));

  if (event.target.checked) {
    this.startAutoRefresh();
  } else {
    this.stopAutoRefresh();
  }
}

OneMinFunc(): void {
  if (!localStorage.getItem("app_email")) {
    this.indicatorModels.push({
      indicator: "AreaRSI(14)",
      indicatorParam: "14",
      indicatorOperator: "{U}",
    });
    this.indicatorModels.push({
      indicator: "VOLMA(60)",
      indicatorParam: "60",
      indicatorOperator: "",
    });
    this.indicatorModels.push({
      indicator: "MACD(12,26,9)",
      indicatorParam: "12,26,9",
      indicatorOperator: "",
    });
    this.indicatorModels.push({
      indicator: "",
      indicatorParam: "",
      indicatorOperator: "",
    });

    this.overlayModels.push({ overlay: "MA(12)", overlayParam: "13" });
    this.overlayModels.push({ overlay: "MA(12)", overlayParam: "50" });
    // this.overlayModels.push({ overlay: "", overlayParam: "" });
    // this.overlayModels.push({ overlay: "", overlayParam: "" });
  }

  setTimeout(() => {
    this._loginService.loginStatusChanged$.subscribe(() => {
      this.getChartSettings();
    });

    if (!localStorage.getItem("app_email")) {
      // this.updateIndicatorChartSettings(false);
      this.updateOverlayChartSettings(false);
    }
  }, 100);
}

startAutoRefresh() {
  // alert("ff");
  console.log("updated ...")
  this.OneMinFunc();
  
  this.intervalId = setInterval(() => {
    console.log("updated ...")
    // alert("ff");
    // this.loadChart(this.dividendHistoryData);
    this.OneMinFunc();
  }, 5000); // 5 second interval // 60k for 1 minute interval
}

stopAutoRefresh() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

}
