import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { number } from 'echarts';
import { SelectItem, SelectItemGroup } from 'primeng';
import { groupBy } from 'rxjs/operators';
import { BackTestFilter, BackTestReposonseModel, BackTestSummary, BasicBackTestRequestModel, IndicatorModel, ParamsModel, strategyModel } from 'src/app/core/models/backtest.model';
import { TruchartsService } from 'src/app/core/services/trucharts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-back-test',
  templateUrl: './back-test.component.html',
  styleUrls: ['./back-test.component.css']
})
export class BackTestComponent implements OnInit {

  @Input('symbol-name') symbol: string;

  oldwebsiteUrl: string = environment.oldwebsiteUrl;
  fromDate: Date = new Date();
  toDate: Date = new Date();

  indicators: SelectItem[] = [];
  operators: SelectItem[] = [];
  volumes: SelectItem[] = [];

  indicatorDynnamicList: IndicatorModel[] = [];
  indicatorDynnamicListForCompare: IndicatorModel[] = [];
  entryConditionList_LongStrategy: BackTestFilter[] = [];
  exitConditionList_LongStrategy: BackTestFilter[] = [];
  IsAddTimeBasedExit_LongStrategy: boolean = false;
  IsAddStopLoss_LongStrategy: boolean = false;
  AddTimeBasedExitValue_LongStrategy: number = 10;
  AddStopLossValue_LongStrategy: number = 5;

  entryConditionList_ShortStrategy: BackTestFilter[] = [];
  exitConditionList_ShortStrategy: BackTestFilter[] = [];
  IsAddTimeBasedExit_ShortStrategy: boolean = false;
  IsAddStopLoss_ShortStrategy: boolean = false;
  AddTimeBasedExitValue_ShortStrategy: number = 10;
  AddStopLossValue_ShortStrategy: number = 5;

  backTestType: string = 'Basic';
  groupedIndicators: SelectItemGroup[];
  LongStrategySummary: BackTestSummary = {
    EnterLong: '',
    ExitLong: '',
    EnterShort: '',
    CoverShort: ''
  };

  summary: any;
  selectedParam: ParamsModel[] = [];
  selectedBasicStrategyName: string = '';
  selectedBasicStrategyShortName: string = '';
  signalType: string = 'Buy & Sell';
  backTestReposonseModel: BackTestReposonseModel[] = [];
  isStartTest: boolean = false;
  page: number = 1;
  count: number = 25;
  tableSize: number = 25;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private _truchartsService: TruchartsService) {

  }

  ngOnInit(): void {
    this.fromDate.setFullYear(this.fromDate.getFullYear() - 1);
    console.log('symbol:', this.symbol);
    this.InitialDefaultEntry();
    this.bindDropdown();
  }

  InitialDefaultEntry() {
    this.entryConditionList_LongStrategy.push({
      FromIndicator: '',
      FromParameter: '',
      operator: '',
      ToIndicator: '',
      ToParameter: ''
    });

    this.exitConditionList_LongStrategy.push({
      FromIndicator: '',
      FromParameter: '',
      operator: '',
      ToIndicator: '',
      ToParameter: ''
    });

    this.entryConditionList_ShortStrategy.push({
      FromIndicator: '',
      FromParameter: '',
      operator: '',
      ToIndicator: '',
      ToParameter: ''
    });

    this.exitConditionList_ShortStrategy.push({
      FromIndicator: '',
      FromParameter: '',
      operator: '',
      ToIndicator: '',
      ToParameter: ''
    });
  }

  bindDropdown() {

    this._truchartsService.getIndicatorOptionsDynamic(this.backTestType).subscribe(data => {
      if (!data)
        return;

      this.indicatorDynnamicList = data;
      this.indicatorDynnamicListForCompare = [...this.indicatorDynnamicList];
      let groupList = data.filter((value, index, self) => self.map(x => x.GroupName).indexOf(value.GroupName) == index);

      groupList.forEach(element => {
        let item = data.filter(x => x.GroupName == element.GroupName);
      });

      if (this.backTestType == 'Advance') {
        this.indicatorDynnamicListForCompare.push({
          GroupName: 'Other',
          Name: 'Open',
          FullName: 'Open',
          Description: 'Open',
          Params: []
        });

        this.indicatorDynnamicListForCompare.push({
          GroupName: 'Other',
          Name: 'High',
          FullName: 'High',
          Description: 'High',
          Params: []
        });

        this.indicatorDynnamicListForCompare.push({
          GroupName: 'Other',
          Name: 'Low',
          FullName: 'Low',
          Description: 'Low',
          Params: []
        });

        this.indicatorDynnamicListForCompare.push({
          GroupName: 'Other',
          Name: 'Close',
          FullName: 'Close',
          Description: 'Close',
          Params: []
        });

        this.indicatorDynnamicListForCompare.push({
          GroupName: 'Other',
          Name: 'Indicator Value',
          FullName: 'Indicator Value',
          Description: 'Indicator Value',
          Params: []
        });
      }
    });

    this.operators = [
      { label: '--Compar.--', value: '' },
      { label: ">", value: ">" },
      { label: "<", value: "<" },
      // { label: ">= (Greater than or equal to)", value: ">=" },
      // { label: "<= (Less than or equal to)", value: "<=" },
      { label: "=", value: "=" },
      { label: "cross>", value: "cross>" },
      { label: "cross<", value: "cross<" },
      // { label: "<> (Not equal to)", value: "<>" },
    ];

    this.volumes = [
      { label: "Open", value: "Open" },
      { label: "High", value: "High" },
      { label: "Low", value: "Low" },
      { label: "Close", value: "Close" },
      { label: "Volume", value: "Volume" },
    ];

  }

  addEntryConditionRow_LongStrategy() {
    this.entryConditionList_LongStrategy.push({
      FromIndicator: '',
      FromParameter: '',
      operator: '',
      ToIndicator: '',
      ToParameter: ''
    });

  }

  addExitConditionRow_LongStrategy() {
    this.exitConditionList_LongStrategy.push({
      FromIndicator: '',
      FromParameter: '',
      operator: '',
      ToIndicator: '',
      ToParameter: ''
    });

  }

  removeEntryCondition_LongStrategy(index) {
    this.entryConditionList_LongStrategy.splice(index, 1);
  }

  removeExitCondition_LongStrategy(index) {
    this.exitConditionList_LongStrategy.splice(index, 1);
  }

  AddTimeBasedExit_LongStrategy() {
    this.IsAddTimeBasedExit_LongStrategy = !this.IsAddTimeBasedExit_LongStrategy;
    this.AddTimeBasedExitValue_LongStrategy = 10;
  }

  AddStopLoss_LongStrategy() {
    this.IsAddStopLoss_LongStrategy = !this.IsAddStopLoss_LongStrategy;
    this.AddStopLossValue_LongStrategy = 5;
  }


  addEntryConditionRow_ShortStrategy() {
    this.entryConditionList_ShortStrategy.push({
      FromIndicator: '',
      FromParameter: '',
      operator: '',
      ToIndicator: '',
      ToParameter: ''
    });

  }

  addExitConditionRow_ShortStrategy() {
    this.exitConditionList_ShortStrategy.push({
      FromIndicator: '',
      FromParameter: '',
      operator: '',
      ToIndicator: '',
      ToParameter: ''
    });

  }

  removeEntryCondition_ShortStrategy(index) {
    this.entryConditionList_ShortStrategy.splice(index, 1);
  }

  removeExitCondition_ShortStrategy(index) {
    this.exitConditionList_ShortStrategy.splice(index, 1);
  }

  AddTimeBasedExit_ShortStrategy() {
    this.IsAddTimeBasedExit_ShortStrategy = !this.IsAddTimeBasedExit_ShortStrategy;
    this.AddTimeBasedExitValue_ShortStrategy = 10;
  }

  AddStopLoss_ShortStrategy() {
    this.IsAddStopLoss_ShortStrategy = !this.IsAddStopLoss_ShortStrategy;
    this.AddStopLossValue_ShortStrategy = 5;
  }

  decodeEntities(str) {
    // this prevents any overhead from creating the object each time
    const element = document.createElement('div');
    if (str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }
    return str;
  }

  indicatorSelectedFrom(item: BackTestFilter, event, index: number) {
    debugger;
    let paramValue = "";
    if (!!event.value && event.value !== "") {
      if (event.value.Params.length > 0) {
        paramValue = event.value.Params.map(x => x.DefaultValue).join(',');
      }
      // paramValue = event.value.substring(event.value.indexOf("(") + 1);
      // paramValue = paramValue.substring(0, paramValue.indexOf(")"));
    }
    item.FromParameter = paramValue;
  }

  indicatorSelectedTo(item: BackTestFilter, event, index: number) {
    debugger;
    let paramValue = "";
    if (!!event.value && event.value !== "") {
      // paramValue = event.value.substring(event.value.indexOf("(") + 1);
      // paramValue = paramValue.substring(0, paramValue.indexOf(")"));
      paramValue = event.value.Params.map(x => x.DefaultValue).join(',');
    }
    item.ToParameter = paramValue;
  }


  onSelecteBasicIndicator(event: any) {
    debugger;
    if (!!event.value && event.value !== "") {
      if (event.value.Params.length > 0) {
        this.selectedBasicStrategyName = event.value.FullName;
        this.selectedBasicStrategyShortName = event.value.Name;
        this.selectedParam = event.value.Params;
      }
    }
  }

  RunBacktest() {
    let lg = this.LongStrategy();
    // let ss = this.ShortStrategy();
    // alert(lg);
    // alert(ss);
  }

  LongStrategy() {
    let entry = '';
    let exit = '';
    let stoploss: any;
    let timebase: any;

    this.entryConditionList_LongStrategy.forEach(element => {
      let query = '';
      if (element.ToIndicator.Name == 'Open' || element.ToIndicator.Name == 'High' || element.ToIndicator.Name == 'Low' || element.ToIndicator.Name == 'Close')
        query = `${element.FromIndicator.Name}(${element.FromParameter})${element.operator}${element.ToIndicator.Name}`;
      else
        query = `${element.FromIndicator.Name} (${element.FromParameter})${element.operator}${element.ToIndicator.Name} (${element.ToParameter})`;

      entry = (entry == '') ? query : (entry + ' AND ' + query);
    });

    this.exitConditionList_LongStrategy.forEach(element => {
      let query = '';
      if (element.ToIndicator.Name == 'Open' || element.ToIndicator.Name == 'High' || element.ToIndicator.Name == 'Low' || element.ToIndicator.Name == 'Close')
        query = `${element.FromIndicator.Name}(${element.FromParameter})${element.operator}${element.ToIndicator.Name}`;
      else
        query = `${element.FromIndicator.Name} (${element.FromParameter})${element.operator}${element.ToIndicator.Name} (${element.ToParameter})`;

      exit = (exit == '') ? query : (exit + ' AND ' + query);
    });

    if (this.IsAddTimeBasedExit_LongStrategy)
      stoploss = this.AddTimeBasedExitValue_LongStrategy;

    if (this.IsAddStopLoss_LongStrategy)
      timebase = this.AddStopLossValue_LongStrategy;

    this.LongStrategySummary = {
      EnterLong: entry,
      ExitLong: exit,
      EnterShort: stoploss,
      CoverShort: timebase
    };

    return ('EnterLong:' + entry + ' ,ExitLong:' + exit + ' ,stoploss:' + stoploss + ' ,timebase:' + timebase);
  }

  ShortStrategy() {
    let entry = '';
    let exit = '';
    let stoploss: any;
    let timebase: any;

    this.entryConditionList_ShortStrategy.forEach(element => {
      let query = '';
      if (element.ToIndicator.Name == 'Open' || element.ToIndicator.Name == 'High' || element.ToIndicator.Name == 'Low' || element.ToIndicator.Name == 'Close')
        query = `${element.FromIndicator.Name}(${element.FromParameter})${element.operator}${element.ToIndicator.Name}`;
      else
        query = `${element.FromIndicator.Name} (${element.FromParameter})${element.operator}${element.ToIndicator.Name} (${element.ToParameter})`;

      entry = (entry == '') ? query : (entry + ' AND ' + query);
    });

    this.exitConditionList_ShortStrategy.forEach(element => {
      let query = '';
      if (element.ToIndicator.Name == 'Open' || element.ToIndicator.Name == 'High' || element.ToIndicator.Name == 'Low' || element.ToIndicator.Name == 'Close')
        query = `${element.FromIndicator.Name}(${element.FromParameter})${element.operator}${element.ToIndicator.Name}`;
      else
        query = `${element.FromIndicator.Name} (${element.FromParameter})${element.operator}${element.ToIndicator.Name} (${element.ToParameter})`;

      exit = (exit == '') ? query : (exit + ' AND ' + query);
    });

    if (this.IsAddTimeBasedExit_ShortStrategy)
      stoploss = this.AddTimeBasedExitValue_ShortStrategy;

    if (this.IsAddStopLoss_ShortStrategy)
      timebase = this.AddStopLossValue_ShortStrategy;

    return ('EnterShort:' + entry + ' ,CoverShort:' + exit + ' ,stoploss:' + stoploss + ' ,timebase:' + timebase);
  }

  onSignalTypeChange(type: string) {
    this.signalType = type;
  }

  StartTesting() {
    var startDate = new Date(this.fromDate);
    var endDate = new Date(this.toDate);

    var Time = endDate.getTime() - startDate.getTime();
    let numberOfDays: number = Time / (1000 * 3600 * 24);

    let values = [];
    this.selectedParam.forEach(element => {
      values.push({
        name: element.Name,
        value: element.DefaultValue,
      });
    });

    let strategy: strategyModel = {
      name: this.selectedBasicStrategyName,
      shortName: this.selectedBasicStrategyShortName,
      values: values
    };

    let model: BasicBackTestRequestModel = {
      ticker: this.symbol,
      name: this.symbol,
      numberOfDays: numberOfDays,
      signalType: this.signalType,
      strategy: strategy
    };
    this.isStartTest = false;
    this._truchartsService.startTesting(model).subscribe(data => {
      this.backTestReposonseModel = data;
      this.isStartTest = true;
    });

  }
  BackTestType(type: string) {
    this.backTestType = type;
    this.selectedParam = [];
    this.bindDropdown();
  }
}

