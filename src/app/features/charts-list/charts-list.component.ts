import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
} from "@angular/core";
import { UserService } from "src/app/core/services/user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DatePipe, DecimalPipe, formatDate } from "@angular/common";
import { SelectItem } from "primeng/api";
import { LocalstorageHelper } from "src/app/core/helpers/localstorage.helper";
import { PermissionsService } from "src/app/core/services/permissions.service";
import { RoleConst } from "src/app/core/constants/app.const";
import { LoginService } from "src/app/core/services/login.service";
import { ChartSettingsService } from "src/app/core/services/chartsettings.service";
import { TruchartsService } from "src/app/core/services/trucharts.service";
import { OverlayPanel } from "primeng/public_api";
import { AuthService } from "src/app/core/services/auth.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

interface TextObject {
  name: string;
  tickers: string;
}
interface newTickerObj {
  tickers: string;
}
@Component({
  selector: "app-charts-list",
  templateUrl: "./charts-list.component.html",
  styleUrls: ["./charts-list.component.css"],
})
export class ChartsListComponent implements OnInit {
  [x: string]: any;
  watchList = [];
  // selectedWatchList = null;
  availableChips = [];
  selectedOption: string = "off";
  selectedOptions: string = "day1";
  selectedWatchlistIndex: number = 0;
  addedTag: any[] = [];
  removeChips: string[] = [];
  getSelectedId: any;
  parameterValues: any = [];
  overlays: SelectItem[] = [];
  typesofCharts: SelectItem[];
  selectedTags: string[] = [];
  chartURLs = [];
  selectedtemsTags: string[] = [];
  indicators: SelectItem[] = [];
  pushPrimaryWatchList = [];
  getWatchList: any;
  getUpdateTickers: any;
  selectedWatchItem: any;
  selectedWatchList: any;
  display: boolean = false;
  getName: any;
  getTicker: any;
  getTickerList: any;
  values2: string[];
  allTagsTickers: any;
  // indVal = 'AreaRSI(14){U};VOLMA(60);MACD(12,26,9);';
  // overVal = 'MA(13);MA(50);';
  indVal = "";
  overVal = "";
  strategySelected = "";
  getIndexName: any;
  showInput = false;
  latestText: string;
  newText: string;
  isModalOpen = false;
  getValType: any = 3;
  createWatchList: any;
  cycleVal: any = "";
  chipData: string[];
  dropdownChips: string[];
  getNameList: any;
  overlayValues: string = "";
  getEventName: any;
  showAlternateContent = false;
  selectedSize: string = "small";
  chartWidth: number = 2000;
  chartHeight: number = 1100;
  showGraphContainer = false;
  tickersArray: any = [];
  tickersArrays: any = [];
  isLoading: boolean = false;
  isAddButtonDisabled: boolean = true;
  listItems: any = [];
  hasSymbolsCopied = false;

  isChartsLoading = false;

  selectedChartItem = null;
  selectedChartType = null;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private _localstorageHelper: LocalstorageHelper,
    private _datepipe: DatePipe,
    private permissionsService: PermissionsService,
    private _loginService: LoginService,
    private _chartSettingsService: ChartSettingsService,
    private _truchartsService: TruchartsService,
    private _authService: AuthService,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef
  ) {
    this.typesofCharts = [
      { label: "Candle", value: { type: 3, name: "Candle" } },
      { label: "Bar", value: { type: 1, name: "Bar" } },
      { label: "Line", value: { type: 2, name: "Line" } },
    ];
    // this.selectedChartType = this.typesofChart[1]?.label
  }

  URL = `https://trucharts.in/Chart.aspx?Provider=DB&Code=${"AAPL"}&Type=${
    this.getValType
  }&Scale=0&IND=${this.indVal};&OVER=${
    this.overVal + this.overlayValues + this.strategySelected
  };&Skin=${this.viewMode === "light-mode" ? "GreenRed" : "Black"}&Size=${
    this.chartWidth
  }*${this.chartHeight}&RT=1&Start=${this.getDateString(
    this.startDate
  )}&End=${this.getDateString(this.endDate)}&Layout=${
    this.viewMode === "light-mode" ? "2Line" : "2LineBlack"
  };${
    this.viewMode === "light-mode" ? "Default;Price;HisDate" : "DefaultBlack"
  }&Cycle=${this.cycleVal}&HIS=0`;

  getChartURL(tag) {
    const timestamp = new Date().getTime();

    return `https://trucharts.in/Chart.aspx?timestamp=${timestamp}&Provider=DB&Code=${tag}&Type=${
      this.getValType
    }&Scale=0&IND=${this.indVal};&OVER=${
      this.overVal + this.overlayValues + this.strategySelected
    };&Skin=${this.viewMode === "light-mode" ? "GreenRed" : "Black"}&Size=${
      this.chartWidth
    }*${this.chartHeight}&RT=1&Start=${this.getDateString(
      this.startDate
    )}&End=${this.getDateString(this.endDate)}&Layout=${
      this.viewMode === "light-mode" ? "2Line" : "2LineBlack"
    };${
      this.viewMode === "light-mode" ? "Default;Price;HisDate" : "DefaultBlack"
    }&Cycle=${this.cycleVal}&HIS=0`;
  }

  onReloadChart(chart) {
    this.chartURLs[chart?.id].url = this.getChartURL(chart?.tag);
    this.selectedChartItem = chart;
    // this.chartUrl = tag;

    const timer = setTimeout(() => {
      this.selectedChartItem = null;
      clearTimeout(timer);
    }, 1000);
  }

  ngOnInit(): void {
    const storedSize = localStorage.getItem("selectedSize");
    if (storedSize) {
      this.selectedSize = storedSize;
      this.selectSize(storedSize);
    } else {
      this.selectSize("small");
    }
    // this.watchList = JSON.parse(localStorage.getItem("app_watchlist"));
    // this.watchList = this.watchList.map((item, i) => ({
    //   label: item?.Ticker,
    //   value: { id: i, ...item },
    // }));

    // this._authService.userO.subscribe((user) => {
    //   this.primaryList();
    // });

    this.viewMode = this._localstorageHelper.getViewModelInitial();
    this._localstorageHelper.getViewMode().subscribe((mode) => {
      this.isChartsLoading = true;
      const timer = setTimeout(() => {
        this.isChartsLoading = false;
        clearTimeout(timer);
      }, 1000);

      this.viewMode = mode;
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(
        "https://trucharts.co.in/?symbol=" + 
        this.symbol + 
        "&forceHttps=true" +  // Hypothetical parameter to force HTTPS
        "#theme_" + 
        (mode === "light-mode" ? "Light" : "Dark")
      );
      
    });
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
    this.getChartList();
    setTimeout(() => {
      this._chartSettingsService.updateChartSettings$.subscribe((e) => {});
      this.primaryList();
      this.getChartSettings();

      this._loginService.loginStatusChanged$.subscribe(() => {
        this.getChartSettings();
        this.primaryList();
        this.getChartList();
      });

      if (!localStorage.getItem("app_email")) {
        this.updateIndicatorChartSettings(false);
        this.updateOverlayChartSettings(false);
      }
    }, 500);
  }

  updateDateType(type) {
    this.dateType = type;
    switch (type) {
      case "DR":
        this.dateRangeChecked = "true";
        return;
      case "3M":
        this.endDate = new Date();
        this.endDate.setDate(this.endDate.getDate() + 3);
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
      case "2y":
        this.endDate = new Date();
        this.endDate.setDate(this.endDate.getDate() + 1);
        this.startDate = new Date();
        this.startDate.setFullYear(this.startDate.getFullYear() - 2);
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
    this.reRenderCharts();
  }

  primaryList() {
    if (!localStorage.getItem("app_email")) {
      this.selectedTags = [
        "TSLA",
        "MSFT",
        "AAPL",
        "XOM",
        "NVDA",
        "DIA",
        "BAC",
        "AMD",
      ];
      this.reRenderCharts();
      return;
    }

    this.userService.getPrimaryWatchList().subscribe((res) => {
      this.pushPrimaryWatchList = res.map((item) => item.WatchListName);
      this.pushPrimaryWatchList.forEach((element) => {
        this.getTicker = this.getWatchList
          ?.filter((getItems) => getItems.name == element)
          .flatMap((getList, i) => getList.stocks)
          .map((t) => t.ticker);
        this.selectedTags = [...this.selectedTags, ...this.getTicker];

        this.reRenderCharts();
      });
      this.showGraphContainer = !this.showGraphContainer;
    });
  }

  isItemActive(name: string): boolean {
    return name === this.selectedWatchItem;
  }

  getDefaultWatchList() {
    this.getWatchList.forEach((e) => {
      if (e.name === this.selectedItem) {
        this.getSelectedId = e.WatchlistId;
      } else {
        console.log("not working");
      }
    });

    this.userService
      .makeDefaultWatchList(this.getSelectedId)
      .subscribe((res) => {});
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

  getDateString(date) {
    return this._datepipe.transform(date, "yyyyMMdd");
  }

  isActive(option: string): boolean {
    return this.selectedOption === option;
    this.reRenderCharts();
  }

  isActiveDays(option: string): boolean {
    return this.selectedOptions === option;
  }

  onDropdownItemSelected(event) {
    this.getValType = event.value.type;
    this.reRenderCharts();
    this.isChartsLoading = true;
    const timer = setTimeout(() => {
      this.isChartsLoading = false;
      clearTimeout(timer);
    }, 1000);
  }

  updateChartSettings(name: string) {
    this.chartSettingsName = name;
    this.isChartSettingsUpdate = true;

    this.onCreateNewChartSettings();
  }

  onTagRemove(event) {
    // this.addedTag = event.value;
    let ticker = event.value;
    let name = this.getIndexName.name;

    //  this.chips = this.getIndexName.stocks.filter((c) => c !== this.addedTag);
    this.getWatchList = this.getWatchList.map((watchlistItem) => {
      if (watchlistItem.name === name) {
        const stocks = watchlistItem.stocks.filter(
          (stockItem) => stockItem.ticker !== ticker
        );
        return { name: watchlistItem.name, stocks };
      }
      return watchlistItem;
    });
    // this.newTicker = this.getWatchList.map((item) => item?.name).join(",");
    // console.log("onRemove", this.newTicker);
  }

  onTagAdded(event: any) {
    // this.tickersArray = [];

    // this.addedTag = event.value;
    // this.addedTag.push(event.value);
    //  this.allTagsTickers = this.chipData;

    // let testcode =this.getIndexName.stocks[0];
    // testcode.ticker = this.addedTag;
    // this.getWatchList.stocks.push({ticker :this.addedTag});

    let name = this.getIndexName.name;

    //  this.chips = this.getIndexName.stocks.filter((c) => c !== this.addedTag);
    this.getWatchList = this.getWatchList.map((watchlistItem) => {
      if (watchlistItem.name === name) {
        watchlistItem.stocks.push({ ticker: event.value });
      }
      return watchlistItem;
    });

    // this.newTicker = this.getWatchList.map((item) => item?.name).join(",");
    // console.log("onTagAdded", this.newTicker);
  }

  copySymbols() {
    let symbols = this.chipData.join(",");
    navigator.clipboard.writeText(symbols);
    this.hasSymbolsCopied = true;

    const timer = setTimeout(() => {
      this.hasSymbolsCopied = false;
    }, 3000);
  }

  isButtonDisabled(): boolean {
    return !this.newText;
  }

  isUpdateButtonDisabled(): boolean {
    return !this.chipData;
  }

  getChartList() {
    if (!localStorage.getItem("app_email")) {
      return;
    }

    this.userService.getChartList().subscribe((res) => {
      this.getNameList = [];
      this.getWatchList = res;
      this.getWatchList.forEach((e) => {
        this.selectedWatchItem = e.name[0];

        this.getNameList.push({
          value: e.name,
          label: e.name,
        });
        console.log("this.getNameList", this.getNameList);
      });
      this.getTicker = res.flatMap((getList, i) => getList.stocks);
    });
  }

  saveText() {
    this.tickersArrays.push(...this.newTicker.split(","));

    const newTextObject: TextObject = {
      name: this.newText,
      tickers: this.tickersArrays,
    };

    this.isLoading = true;
    // this.getWatchList.push(newTextObject);
    this.userService.createChartList(newTextObject).subscribe((res) => {
      this.isLoading = false;
      // this.userService.getChartList().subscribe((res) => {
      //   this.getNameList = [];
      //   this.getWatchList = res;
      // });

      this.getChartList();
      if (res.status === 200) {
        this.getWatchList.push(newTextObject);
      } else {
        // Handle other status codes if needed
        this.isLoading = false;
      }
      this.tickersArrays = [];
      this.newText = "";
      this.newTicker = "";
    });
  }

  updateAPI() {
    let name = this.getIndexName.name;

    //  this.chips = this.getIndexName.stocks.filter((c) => c !== this.addedTag);
    this.getWatchList = this.getWatchList.map((watchlistItem) => {
      if (watchlistItem.name === name) {
        watchlistItem.stocks.forEach((e) => {
          this.addedTag.push(e.ticker);
        });
      }
      return watchlistItem;
    });

    const object = {
      name: this.selectedItem,
      tickers: this.addedTag,
    };

    this.isLoading = true;
    this.userService.updateChartList(object).subscribe(
      (res) => {
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  handleRadioClick(value, option: string) {
    this.selectedOptions = option;
    this.cycleVal = value;
    this.reRenderCharts();
    this.isChartsLoading = true;
    const timer = setTimeout(() => {
      this.isChartsLoading = false;
      clearTimeout(timer);
    }, 1000);
  }

  handleonOffClick(value1: string, value2: string, option: string) {
    this.selectedOption = option;
    this.indVal = value1;
    this.overVal = value2;
    this.reRenderCharts();
    this.isChartsLoading = true;
    const timer = setTimeout(() => {
      this.isChartsLoading = false;
      clearTimeout(timer);
    }, 1000);
  }

  overlaySelected(item, overlaySelectIndex: number) {
    let paramValue = "";
    if (!!item.value && item.value !== "") {
      paramValue = item.value.substring(item.value.indexOf("(") + 1);
      paramValue = paramValue.substring(0, paramValue.indexOf(")"));
    }

    this.overlayModels[overlaySelectIndex].overlayParam = paramValue;
    this.reRenderCharts();
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

          this.overlayModels.forEach((model, index) => {
            switch (overlayIndex) {
              case index:
                model.overlay = shortName;
                model.overlayParam = values;
                break;
            }
          });
          this.reRenderCharts();
        }
      );
    }

    this.updateChartByOverlay(null);
  }
  updateChartModal() {
    this.overlayValues = "";

    this.overlayModels.forEach((model, index) => {
      if (model.overlayParam !== "") {
        this.indicatorValues += this.getOverlayParamValue(
          model.overlay,
          model.overlayParam
        );
        this.reRenderCharts();
      }
    });
  }

  private getOverlayParamValue(func, param) {
    if (!!param && param !== "") {
      func = func.substr(0, func.indexOf("("));
      return `${func}(${param});`;
    }
    return "";
  }
  changeChartSettings(name: string) {
    const setting = this.chartSettingsList.find(
      (settings) => settings.name === name
    );

    this.isChartsLoading = true;
    const timer = setTimeout(() => {
      this.isChartsLoading = false;
      clearTimeout(timer);
    }, 1000);

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
    this.reRenderCharts();
  }
  updateChartByOverlay(opOverlay) {
    if (!this.overlayModels) {
      return;
    }

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
    this.reRenderCharts();
  }
  indicatorSelected(item, index: number) {
    let paramValue = "";
    if (!!item.value && item.value !== "") {
      paramValue = item.value.substring(item.value.indexOf("(") + 1);
      paramValue = paramValue.substring(0, paramValue.indexOf(")"));
    }

    this.indicatorModels[index].indicatorParam = paramValue;
    this.reRenderCharts();
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
  get isLoggedIn() {
    return this._authService.isLoggedIn;
  }
  updateChartByIndicator(opIndicator) {
    if (!this.indicatorModels) {
      return;
    }

    if (!this.indicatorModels?.length) {
      return;
    }
    this.indicatorValues = "";

    this.indicatorModels.forEach((model, index) => {
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
  hideOverley(overlaypanel: OverlayPanel) {
    if (!!overlaypanel) overlaypanel.hide();
  }
  private getIndicatorParamValue(func, param, operator) {
    if (!!param && param !== "") {
      func = func.substr(0, func.indexOf("("));
      return `${func}(${param})${operator};`;
    }
    return "";
  }
  gotoLogin() {
    this._loginService.showLoginForm();
  }

  hasPermission() {
    this.permissionsService.hasPermission([
      RoleConst.Administrators,
      RoleConst.Silver,
      RoleConst.Gold,
      RoleConst.Platinum,
    ]);
  }
  deleteAPI(textObject: any) {
    const deleteName = this.selectedItem;
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      body: {
        name: deleteName,
      },
    };
    this.isLoading = true;
    this.userService.deleteChartList(options).subscribe(() => {
      this.itemList = this.getWatchList.findIndex(
        (item) => item.name === deleteName
      );
      if (this.itemList !== -1) {
        this.getWatchList.splice(this.itemList, 1);
        this.getWatchList = [...this.getWatchList];
        this.chipData = [];
        this.isLoading = false;
      }
      (error) => {
        this.isLoading = false;
        console.error("Error deleting item:", error);
      };
    });
  }

  getContainerClass() {
    return {
      "mini-container": this.selectedSize === "mini",
      "small-container": this.selectedSize === "small",
      "medium-container": this.selectedSize === "medium",
      "large-container": this.selectedSize === "large",
    };
  }
  updateStrategy(s) {
    this.strategySelected = s;
    this.reRenderCharts();
    this.isChartsLoading = true;
    const timer = setTimeout(() => {
      this.isChartsLoading = false;
      clearTimeout(timer);
    }, 1000);
  }
  get strategyText() {
    switch (this.strategySelected) {
      case "TCFast();":
        return "TC Fast Strategy";
      case "TCPositional();":
        return "TC Positional Strategy";
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

  selectSize(size: string): void {
    this.selectedSize = size;
    localStorage.setItem("selectedSize", size);
    this.isChartsLoading = true;
    const timer = setTimeout(() => {
      this.isChartsLoading = false;
      clearTimeout(timer);
    }, 1000);
    switch (size) {
      case "mini":
        this.chartWidth = 400;
        this.chartHeight = 300;
        break;
      case "small":
        this.chartWidth = 600;
        this.chartHeight = 400;
        break;
      case "medium":
        this.chartWidth = 800;
        this.chartHeight = 600;
        break;
      case "large":
        this.chartWidth = 1200;
        this.chartHeight = 900;
        break;

      default:
        this.chartWidth = 2000;
        this.chartHeight = 1100;
        break;
    }

    this.reRenderCharts();
  }
  toggleGraphContainer() {
    this.showGraphContainer = !this.showGraphContainer;
  }
  getGraphContainerClass() {
    if (this.selectedSize === "large") {
      return "graph-container large-graph-container";
    } else {
      return "graph-container";
    }
  }
  toggleContainers() {
    this.display = true;
    this.showAlternateContent = !this.showAlternateContent;
  }
  toggletoGraphs() {
    this.showAlternateContent = false;
  }
  getNameIndex(name: any) {
    this.addedTag = [];
    this.selectedItem = name.name;
    this.chipData = [];
    this.getIndexName = name;
    this.selectedStock = name.stocks;
    this.getIndexName.stocks.forEach((e) => {
      const sty = e;
      this.chipData.push(sty.ticker);
    });
  }

  resetAll() {
    this.selectedTags = [];
    this.pushPrimaryWatchList = [];
  }

  onMultiselectChange(event: any) {
    this.selectedTags = [];
    this.selectedWatchList = event.value;

    this.selectedWatchList.forEach((element) => {
      this.getTicker = this.getWatchList
        .filter((getItems) => getItems.name == element)
        .flatMap((getList, i) => getList.stocks)
        .map((t) => t.ticker);
      this.selectedTags = [...this.selectedTags, ...this.getTicker];
    });

    this.selectedTags = this.selectedTags;

    this.reRenderCharts();
  }

  onWatchListClick() {
    if (this._authService.isLoggedIn) return;

    this.permissionsService.hasPermission([
      RoleConst.Administrators,
      RoleConst.Silver,
      RoleConst.Gold,
      RoleConst.Platinum,
    ]);
  }

  onSelectedTagsUpdate() {
    this.reRenderCharts();
  }

  reRenderCharts() {
    this.chartURLs = this.selectedTags.map((tag, i) => ({
      id: i,
      url: this.getChartURL(tag),
      tag,
    }));
  }

  onWatchListChange(values) {
    // console.log(values);
  }

  onChipAdd(e) {
    // console.log("onChipAdd", this.availableChips);
  }
  onChipRemove(e) {
    // console.log("onChipRemove", this.availableChips);
  }

  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>) {
    const hasPermission = this.permissionsService.hasPermission([
      RoleConst.Administrators,
      RoleConst.Silver,
      RoleConst.Gold,
      RoleConst.Platinum,
    ]);

    if (hasPermission) {
      this.modalRef = this.modalService.show(template, {
        class: "modal-dialog-centered modal-xl",
      });
    }
  }

  closeModal() {
    this.modalRef.hide();
  }
}
