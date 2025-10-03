import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import Swal from 'sweetalert2';
import { Screener } from '../../core/models/screener.model';
import { ScreenerData } from '../../core/models/sceenerData.model';
import { DynamicData } from './data/dynamic.data';
import { Dynamic } from '../../core/models/dynamic.model';
import { ScreenerController } from '../../core/services/screener/screener.controller';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginService } from 'src/app/core/services/login.service';
import { SavedFilterPanelComponent } from './saved-filter-panel/saved-filter-panel.component';
import { Router } from '@angular/router';
import { Technical } from 'src/app/core/models/technical.model';
import { Signal } from 'src/app/core/models/signal.model';
import { Fundamental } from 'src/app/core/models/fundamental.model';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { RoleConst } from 'src/app/core/constants/app.const';
declare let $: any;

@Component({
    selector: 'app-screener',
    templateUrl: './screener.component.html',
    styleUrls: ['./screener.component.css']
})

export class ScreenerComponent implements OnInit {
    // start the tab panel
    TABS = [
        { id: 'fundamental', label: 'Fundamental', class: 'fundamental', active_class: 'fundamental-active', href: '#fundamental' },
        { id: 'technical', label: 'Technical', class: 'technical', active_class: 'technical-active', href: '#technical' },
        { id: 'signal', label: 'Signal', class: 'signal', active_class: 'signal-active', href: '#signal' },
        { id: 'dynamic', label: 'Dynamic', class: 'dynamic', active_class: 'dynamic-active', href: '#dynamic' },
        { id: 'saved', label: 'Saved Filters', class: 'saved', active_class: 'saved-active', href: '#saved' }
    ];
    // end the tab panel
    // start the constant
    // technical
    MOVING_AVERAGE_20 = '20 Day Moving Average';
    MOVING_AVERAGE_50 = '50 Day Moving Average';
    MOVING_AVERAGE_120 = '120 Day Moving Average';
    EXPONENTIAL_MOVING_AVERAGE_20 = '20 Day Exponential Moving Average';
    EXPONENTIAL_MOVING_AVERAGE_50 = '50 Day Exponential Moving Average';
    EXPONENTIAL_MOVING_AVERAGE_120 = '120 Day Exponential Moving Average';
    PRICE_ACTION = 'Price Action';
    NEW_HIGH_LOW_PRICE = 'New High/Low Price';
    NEW_HIGH_LOW_VOLUME = 'New High/Low Volume';
    MA_VS_PRICE_CROSSES = 'MA VS Price Crosses';
    EMA_CROSSOVERS = 'EMA Crossover';
    TECH_VOLUME = 'Volume';
    AVG_VOLUME_ACTION_20 = 'Avg Volume Action(20D)';
    MACD = 'MACD(12, 26, 9)';
    ADX_10 = 'ADX(10 Days)';
    ADX_14 = 'ADX(14 Days)';
    DI_CROSSOVER_10 = 'DI Crossover(10 D)';
    DI_CROSSOVER_14 = 'DI Crossover(14 D)';
    RSI_14 = 'RSI(14)';
    PRICE_CHANGE = 'Price Change';
    BOLLINGER_BAND = 'Bollinger Band(20,2)';
    VOLUME_ACTION = 'Volume Action';
    WEEKS_TRIGGER = '6 Weeks Trigger';
    FORCE_INDEX = 'Force Index';
    BULLISH_CANDLESTICK = 'Bullish Candlestick';
    BEARISH_CANDLESTICK = 'Bearish Candlestick';
    // signal
    TC_FAST = 'TC Fast Trade Strategy';
    TC_POSITIONAL = 'TC Positional Trade Strategy';
    GOLDEN_SPIKE_STRATEGY = 'Golden Spike Strategy';
    TURTLE_TRADING_STRATEGY = 'Turtle Trading Strategy';
    TRADER_4_ALL_STRATEGY = 'Trader4All Strategy';
    dynamicRefs = DynamicData.data;
    // fundamental
    EXCHANGE = 'Exchange';
    PRICE = 'Price';
    F_VOLUME = 'Current Volume';
    MARKETCAP = 'MarketCap';

    PERATIO = 'P/E';
    FORWARDPE = 'Forward P/E'
    PEGRATIO = 'PEG';
    PRICETOSALES = 'P/S'
    PRICETOBOOK ='P/B';
    PRICETOCASH = 'Price/Cash';
    PRICETOCASHFLOW = 'Price/Free Cash Flow';
    EPSGROWTH = 'EPS growth this year';
    RETURNONASSETS = 'Return on Assets';
    RETURNONEQUITY = 'Return on Equity';
    RETURNONINVESTMENT = 'Return on Investment';
    CURRENTRATIO = 'Current Ratio';
    QUICKRATIO = 'Quick Ratio';
    DEBTTOEQUITYRATIO = 'Debt/Equity';
    DEBTTOEQUITYRATIOLONGTERM = 'LT Debt/Equity';
    GROSSMARGIN = 'Gross Margin';
    OPERATINGMARGIN = 'Operating Margin';
    NETPROFITMARGIN = 'Net Profit Margin';
    PAYOUTRATIO = 'Payout Ratio	';
    EARNINGDATE = 'Earnings Date';
    DIVIDENDYIELD = 'Dividend Yield';



    // end the constant
    // start the variables for class
    public viewMode: string;
    public activeTab = 'fundamental';
    public screener: Screener;
    public fundamentalCustomData: any;
    public isShowAll: boolean;
    // public isShowDynamicModal: boolean;
    public filters: any[] = [];
    public openedFilterIndex = -1;
    public tableData: ScreenerData[] = [];
    public isLoading: boolean;
    public isSpinner: boolean;
    public isLoadingscrolldata: boolean = true;
    pageIndex: number = 0;
    pageSize: number = 1000;
    totalRecordScan: number = 0;
    totalRecord: number = 0;
    scanContinue: boolean = true;
    @ViewChild(SavedFilterPanelComponent) child: SavedFilterPanelComponent;

    constructor(private authService: AuthService,
        private loginService: LoginService,
        private screenerController: ScreenerController,
        private localstorageHelper: LocalstorageHelper,
        private changeDetector: ChangeDetectorRef,
        private router: Router,
        private permissionsService: PermissionsService
    ) { }

    ngOnInit(): void {
        this.localstorageHelper.getViewMode().subscribe(mode => this.viewMode = mode);
        this.screener = new Screener();
        this.fundamentalCustomData = {
            price: { start: 0, end: 0 },
            volume: { start: 0, end: 0 }
        };
        if (localStorage.getItem('fromScan')) {
            this.getScreenerData(JSON.parse(localStorage.getItem('screenerData')));
            this.tableData = JSON.parse(localStorage.getItem('scanData'));
            this.openedFilterIndex = Number(localStorage.getItem('openedFilterIndex'));
            localStorage.removeItem('fromScan');
            localStorage.removeItem('screenerData');
            localStorage.removeItem('scanData');
            localStorage.removeItem('openedFilterIndex');
        }
    }

    activate(tabId: string) {
        this.activeTab = tabId;
        if (tabId !== 'technical') {
            this.isShowAll = false;
        }
    }

    onChangeFundamentalDropDown(dataFromFundamental) {
        this.screener.fundamental = dataFromFundamental.data;
        this.fundamentalCustomData = dataFromFundamental.customData;
        this.handleFilters(dataFromFundamental.filter);
    }

    onDeleteCustomData(data: any) {
        this.deleteFilter(data.id);
        this.fundamentalCustomData = data.customData;
    }

    onChangeTechnicalDropDown(dataFromTechnicalPanel) {
        this.screener.technical = dataFromTechnicalPanel.data;
        this.handleFilters(dataFromTechnicalPanel.filter);
    }

    handleFilters(filter: any) {
        if (filter.value !== 'Any') {
            // const data = {id: label, value: selectedVal};
            const index = this.filters.findIndex(p => p.id === filter.id);
            if (index === -1) {
                this.filters.push(filter);
            } else {
                this.filters.splice(index, 1, filter);
            }
        } else {
            this.filters.splice(this.filters.findIndex(p => p.id === filter.id), 1);
        }
    }

    onChangeSignalDropDown(dataFromSignal) {
        this.screener.signal = dataFromSignal.data;
        this.handleFilters(dataFromSignal.filter);
    }

    onChangeFromDynamicPanel(dataFromDynamicPanel) {
        this.screener.dynamic = dataFromDynamicPanel.dynamic;
        // this.selectedDynamic = dataFromDynamicPanel.selectedDynamic;
        this.handleFilters(dataFromDynamicPanel.filter);
    }

    handleUnSelectDynamicRefItem(data: any) {
        // this.isShowModal = false;
        const unSelectedDynamicItem = data.unSelectedDynamic;
        this.deleteFilter(unSelectedDynamicItem.title);
    }

    openSavedFilter(data: any) {
        this.openedFilterIndex = data.openedFilterIndex;
        this.screener = data.screener;
        this.fundamentalCustomData = data.fundamentalCustomData;
        this.filters = data.filter;
    }
    deleteFilter(id: string) {
        // this.isShowModal = false;
        const selectedVal = 'Any';
        this.filters.splice(this.filters.findIndex(p => p.id === id), 1);
        switch (id) {
            // for deleting technical
            case this.MOVING_AVERAGE_20:
                this.screener.technical.movingAverage20day = selectedVal;
                break;
            case this.MOVING_AVERAGE_50:
                this.screener.technical.movingAverage50day = selectedVal;
                break;
            case this.MOVING_AVERAGE_120:
                this.screener.technical.movingAverage120day = selectedVal;
                break;
            case this.EXPONENTIAL_MOVING_AVERAGE_20:
                this.screener.technical.exponentialMovingaverage20day = selectedVal;
                break;
            case this.EXPONENTIAL_MOVING_AVERAGE_50:
                this.screener.technical.exponentialMovingaverage50day = selectedVal;
                break;
            case this.EXPONENTIAL_MOVING_AVERAGE_120:
                this.screener.technical.exponentialMovingaverage120day = selectedVal;
                break;
            case this.PRICE_ACTION:
                this.screener.technical.priceAction = selectedVal;
                break;
            case this.NEW_HIGH_LOW_PRICE:
                this.screener.technical.newHighlowprice = selectedVal;
                break;
            case this.NEW_HIGH_LOW_VOLUME:
                this.screener.technical.newHighlowvol = selectedVal;
                break;
            case this.MA_VS_PRICE_CROSSES:
                this.screener.technical.maVspricecrosses = selectedVal;
                break;
            case this.EMA_CROSSOVERS:
                this.screener.technical.emaCrossovers = selectedVal;
                break;
            case this.TECH_VOLUME:
                this.screener.technical.volume = selectedVal;
                break;
            case this.AVG_VOLUME_ACTION_20:
                this.screener.technical.avgVolumeaction = selectedVal;
                break;
            case this.MACD:
                this.screener.technical.macd = selectedVal;
                break;
            case this.ADX_10:
                this.screener.technical.adx10Days = selectedVal;
                break;
            case this.ADX_14:
                this.screener.technical.adx14Days = selectedVal;
                break;
            case this.DI_CROSSOVER_10:
                this.screener.technical.diCrossover10d = selectedVal;
                break;
            case this.DI_CROSSOVER_14:
                this.screener.technical.diCrossover14d = selectedVal;
                break;
            case this.RSI_14:
                this.screener.technical.rsi = selectedVal;
                break;
            case this.PRICE_CHANGE:
                this.screener.technical.priceChange = selectedVal;
                break;
            case this.BOLLINGER_BAND:
                this.screener.technical.bollBand = selectedVal;
                break;
            case this.VOLUME_ACTION:
                this.screener.technical.volumeAction = selectedVal;
                break;
            case this.WEEKS_TRIGGER:
                this.screener.technical.weeksTrigger = selectedVal;
                break;
            case this.FORCE_INDEX:
                this.screener.technical.forceIndex = selectedVal;
                break;
            case this.BULLISH_CANDLESTICK:
                this.screener.technical.bullishCandlestick = selectedVal;
                break;
            case this.BEARISH_CANDLESTICK:
                this.screener.technical.bearishCandlestick = selectedVal;
                break;
            // for deleting signal
            case this.TC_FAST:
                this.screener.signal.tcFast = selectedVal;
                break;
            case this.TC_POSITIONAL:
                this.screener.signal.tcPositional = selectedVal;
                break;
            case this.GOLDEN_SPIKE_STRATEGY:
                this.screener.signal.goldenSpike = selectedVal;
                break;
            case this.TURTLE_TRADING_STRATEGY:
                this.screener.signal.turtalTrading = selectedVal;
                break;
            case this.TRADER_4_ALL_STRATEGY:
                this.screener.signal.trade4All = selectedVal;
                break;
            // for deleting fundamental
            case this.EXCHANGE:
                this.screener.fundamental.exchange = 'Any';
                break;
            case this.PRICE:
                this.screener.fundamental.price = 'Any';
                break;
            case this.F_VOLUME:
                this.screener.fundamental.volume = 'Any';
                break;
            // for deleting dynamic
            default:
                this.screener.dynamic.splice(this.screener.dynamic.findIndex(p => p.title === id), 1);
                break;
        }
    }

    clickedFilteredItem(filter: any) {
        this.activeTab = filter.index;
        // if (filter.index === 'dynamic') {
        //     this.isShowDynamicModal = false;
        // }
    }

    saveFilterData(flag: boolean) {

        if (!this.permissionsService.hasPermission([RoleConst.Administrators, RoleConst.Silver, RoleConst.Gold, RoleConst.Platinum])) {
            return false;
        }

        if (this.filters.length === 0) {
            Swal.fire({
                title: 'Error',
                text: 'No scan filter applied!',
                icon: 'error',
                confirmButtonText: 'Ok',
            }).then();
        } else {
            if (!this.authService.isLoggedIn) {
                this.loginService.showLoginForm();
                return;
            }
            let tempName = this.screener.name;
            if (flag) {
                tempName = '';
            }
            Swal.fire({
                title: 'Please input a name',
                icon: 'info',
                html: '<input id="name" class="swal2-input form-control my-2 mx-auto w-90" required value="' + tempName + '"/>',
                confirmButtonText: 'Save',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                preConfirm: async () => {
                    const name = $('#name').val().trim();
                    if (name) {
                        const isExist = await this.isNameExist(flag, name);
                        if (isExist && flag) {
                            Swal.showValidationMessage('Filter name already used!');
                        } else {
                            this.screener.name = name.trim();
                            this.saveFilterApplied();
                        }
                    } else {
                        Swal.showValidationMessage('Please input name');
                    }
                }
            });
        }
    }

    async isNameExist(flag: boolean, name: string) {
        let isNameExist = false;
        try {
            const savedFilters = await this.screenerController.getSavedFilters(this.authService.userName).toPromise();
            const index = savedFilters.findIndex(p => p.name === name);
            if (flag) {
                if (index !== -1) {
                    isNameExist = true;
                }
            } else {
                if (index !== this.openedFilterIndex) {
                    Swal.showValidationMessage('Filter name already used!');
                    isNameExist = true;
                }
            }
        } catch (error) {
            Swal.showValidationMessage(error.message);
        }
        return isNameExist;
    }

    saveFilterApplied() {
        this.isLoading = true;
        const screenerData = this.customizeScreenerData();
        this.screenerController.saveFilterData(this.authService.userName, screenerData).subscribe(
            () => {
                this.child.updateSavedData();
                this.isLoading = false;
                Swal.fire({
                    title: 'Success',
                    text: 'Successfully saved!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                }).then();
            },
            error => {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                }).then();
                this.isLoading = false;
            }
        );
    }

    updateScanDataWithFundamental(index: string, screenerData: any) {
        let start = this.fundamentalCustomData.price.start;
        let end = this.fundamentalCustomData.price.end;
        if (index === 'FUNDAMENTAL_VOLUME') {
            start = this.fundamentalCustomData.volume.start;
            end = this.fundamentalCustomData.volume.end;
        }

        const real = end === 0 ? `${start}-` : `${start}-${end}`;
        if (index === 'FUNDAMENTAL_PRICE') {
            screenerData.fundamental.price = real;
        } else {
            screenerData.fundamental.volume = real;
        }
        return screenerData;
    }

    customizeScreenerData() {
        let screenerData = this.screener.toJson();
        if (this.screener.fundamental.price === 'Custom') {
            screenerData = this.updateScanDataWithFundamental('FUNDAMENTAL_PRICE', screenerData);
        }
        if (this.screener.fundamental.volume === 'Custom') {
            screenerData = this.updateScanDataWithFundamental('FUNDAMENTAL_VOLUME', screenerData);
        }
        return screenerData;
    }

    scanData() {
        if (!this.permissionsService.hasPermission([RoleConst.Administrators, RoleConst.Silver, RoleConst.Gold, RoleConst.Platinum])) {
            return false;
        }
        if (!this.authService.isLoggedIn) {
            this.loginService.showLoginForm();
            return;
        }
        this.isLoading = true;
        this.isSpinner = true;
        this.pageIndex = 0;
        this.totalRecordScan = 0;
        this.totalRecord = 0;
        this.tableData = [];
        this.scanContinue = true;
        this.getData();
    }

    getData() {

        const screenerData = this.customizeScreenerData();
        this.pageIndex = this.pageIndex + 1;
        screenerData.pageIndex = this.pageIndex;
        screenerData.pageSize = this.pageSize;
        this.screenerController.getScanData(screenerData).subscribe(
            res => {
                this.totalRecordScan = this.totalRecordScan + this.pageSize;
                localStorage.setItem('fromScan', 'true');
                localStorage.setItem('screenerData', JSON.stringify(screenerData));
                localStorage.setItem('scanData', JSON.stringify(res));
                localStorage.setItem('openedFilterIndex', String(this.openedFilterIndex));
                //location.reload();
                //this.tableData = res.data;
                if (this.tableData.length > 0)
                    this.tableData.push.apply(this.tableData, res.data);
                else
                    this.tableData = res.data;

                this.isLoadingscrolldata = false;
                this.totalRecord = res.totalRecord;
                this.isLoading = false;
                if (this.totalRecordScan < this.totalRecord && this.scanContinue) {
                    this.getData();
                }

                if (this.totalRecordScan > this.totalRecord) {
                    this.isSpinner = false;
                }
            },
            error => {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                }).then();
                this.isLoading = false;
            }
        );
    }


    getScreenerData(savedData: any) {
        const generatedFundamentalData = this.handleFundamentalData(savedData.fundamental);
        const generatedDynamicData = this.handleDynamicData(savedData.dynamic);
        const generatedSignalData = this.handleSignalData(savedData.signal);
        const generatedTechnicalData = this.handleTechnicalData(savedData.technical);
        this.screener.name = savedData.name;
        this.screener.fundamental = generatedFundamentalData[0];
        this.screener.dynamic = generatedDynamicData;
        this.screener.signal = generatedSignalData;
        this.screener.technical = generatedTechnicalData;
        this.screener.filterBy = savedData.filterBy;
        this.screener.sorting = savedData.sorting;
        this.fundamentalCustomData = generatedFundamentalData[1];
    }

    handleDynamicData(dynamicData: any[]) {
        const data = [];
        dynamicData.forEach(item => {
            const index = this.dynamicRefs.findIndex(p => p.name === item.name);
            const refData = this.dynamicRefs[index];
            refData.values.forEach(val => {
                const valIndex = refData.values.findIndex(i => val.name === i.name);
                refData.values[valIndex]['value'] = item.values[valIndex].value;
            });
            data.push(new Dynamic(refData));
            // generate the filter data
            let strVal = '';
            const realVal = item.values;
            realVal.forEach(val => {
                const valIndex = realVal.findIndex(i => i.name === val.name);
                if (valIndex === realVal.length - 1) {
                    strVal += val.name + '=' + val.value;
                } else {
                    strVal += val.name + '=' + val.value + ',';
                }
            });
            const temp = { index: 'dynamic', id: refData.title, value: strVal };
            this.filters.push(temp);
        });
        return data;
    }

    handleFundamentalData(fundamental: Fundamental): any[] {
        const customData = {
            price: { start: 0, end: 0 },
            volume: { start: 0, end: 0 }
        };
        if (fundamental.exchange !== 'Any') {
            const exchangeFilter = { index: 'fundamental', id: this.EXCHANGE, value: fundamental.exchange };
            this.filters.push(exchangeFilter);
        }
        if (fundamental.price !== 'Any') {
            let strPrice = fundamental.price;
            const index = strPrice.indexOf('-');
            if (index !== -1) {
                fundamental.price = 'Custom';
                const priceArray = strPrice.split('-');
                let priceStart = priceArray[0];
                let priceEnd = priceArray[1];
                customData.price.start = +priceStart;
                customData.price.end = +priceEnd;
                if (priceStart === '0' || priceStart === '') {
                    priceStart = '';
                } else {
                    priceStart = `$${priceStart}`;
                }
                if (priceEnd === '0' || priceEnd === '') {
                    priceEnd = '';
                } else {
                    priceEnd = `$${priceEnd}`;
                }
                strPrice = `${priceStart}-${priceEnd}`;
            }
            const priceFilter = { index: 'fundamental', id: this.PRICE, value: strPrice };
            this.filters.push(priceFilter);
        }
        if (fundamental.volume !== 'Any') {
            let strVolume = fundamental.volume;
            const index = strVolume.indexOf('-');
            if (index !== -1) {
                fundamental.volume = 'Custom';
                const volumeArray = strVolume.split('-');
                let volumeStart = volumeArray[0];
                let volumeEnd = volumeArray[1];
                customData.volume.start = volumeStart === '' ? 0 : +volumeStart;
                customData.volume.end = volumeStart === '' ? 0 : +volumeEnd;
                if (volumeStart === '0' || volumeStart === '') {
                    volumeStart = '';
                } else {
                    volumeStart = `${+volumeStart / 1000}K`;
                }
                if (volumeEnd === '0' || volumeEnd === '') {
                    volumeEnd = '';
                } else {
                    volumeEnd = `${+volumeEnd / 1000}K`;
                }
                strVolume = `${volumeStart}-${volumeEnd}`;
            }
            const volumeFilter = { index: 'fundamental', id: this.F_VOLUME, value: strVolume };
            this.filters.push(volumeFilter);
        }
        if (fundamental.marketCap !== 'Any') {
            const marketCapFilter = { index: 'fundamental', id: this.MARKETCAP, value: fundamental.marketCap };
            this.filters.push(marketCapFilter);
        }

        if (fundamental.earningDate !== 'Any') {
            const earningDateFilter = { index: 'fundamental', id: this.EARNINGDATE, value: fundamental.earningDate };
            this.filters.push(earningDateFilter);
        }
        if (fundamental.dividendYield !== 'Any') {
            const peRatioFilter = { index: 'fundamental', id: this.DIVIDENDYIELD, value: fundamental.dividendYield };
            this.filters.push(peRatioFilter);
        }
        if (fundamental.peRatio !== 'Any') {
            const peRatioFilter = { index: 'fundamental', id: this.PERATIO, value: fundamental.peRatio };
            this.filters.push(peRatioFilter);
        }
        if (fundamental.forwardPE !== 'Any') {
            const forwardPEFilter = { index: 'fundamental', id: this.FORWARDPE, value: fundamental.forwardPE };
            this.filters.push(forwardPEFilter);
        }
        if (fundamental.pegRatio !== 'Any') {
            const pegRatioFilter = { index: 'fundamental', id: this.PEGRATIO, value: fundamental.pegRatio };
            this.filters.push(pegRatioFilter);
        }
        if (fundamental.priceToSales !== 'Any') {
            const priceToSalesFilter = { index: 'fundamental', id: this.PRICETOSALES, value: fundamental.priceToSales };
            this.filters.push(priceToSalesFilter);
        }
        if (fundamental.priceToBook !== 'Any') {
            const priceToBookFilter = { index: 'fundamental', id: this.PRICETOBOOK, value: fundamental.priceToBook };
            this.filters.push(priceToBookFilter);
        }
        if (fundamental.priceToCash !== 'Any') {
            const priceToCashFilter = { index: 'fundamental', id: this.PRICETOCASH, value: fundamental.priceToCash };
            this.filters.push(priceToCashFilter);
        }
        if (fundamental.priceToCashflow !== 'Any') {
            const priceToCashflowFilter = { index: 'fundamental', id: this.PRICETOCASHFLOW, value: fundamental.priceToCashflow };
            this.filters.push(priceToCashflowFilter);
        }
        if (fundamental.epsGrowth !== 'Any') {
            const epsGrowthFilter = { index: 'fundamental', id: this.EPSGROWTH, value: fundamental.epsGrowth };
            this.filters.push(epsGrowthFilter);
        }
        if (fundamental.returnOnAssets !== 'Any') {
            const returnOnAssetsFilter = { index: 'fundamental', id: this.RETURNONASSETS, value: fundamental.returnOnAssets };
            this.filters.push(returnOnAssetsFilter);
        }
        if (fundamental.returnOnEquity !== 'Any') {
            const returnOnEquityFilter = { index: 'fundamental', id: this.RETURNONEQUITY, value: fundamental.returnOnEquity };
            this.filters.push(returnOnEquityFilter);
        }
        if (fundamental.returnOnInvestment !== 'Any') {
            const returnOnInvestmentFilter = { index: 'fundamental', id: this.RETURNONINVESTMENT, value: fundamental.returnOnInvestment };
            this.filters.push(returnOnInvestmentFilter);
        }
    
        if (fundamental.currentRatio !== 'Any') {
            const currentRatioFilter = { index: 'fundamental', id: this.CURRENTRATIO, value: fundamental.currentRatio };
            this.filters.push(currentRatioFilter);
        }
        if (fundamental.quickRatio !== 'Any') {
            const quickRatioFilter = { index: 'fundamental', id: this.QUICKRATIO, value: fundamental.quickRatio };
            this.filters.push(quickRatioFilter);
        }
        if (fundamental.debtToEquityRatio !== 'Any') {
            const debtToEquityRatioFilter = { index: 'fundamental', id: this.DEBTTOEQUITYRATIO, value: fundamental.debtToEquityRatio };
            this.filters.push(debtToEquityRatioFilter);
        }
        if (fundamental.debtToEquityRatioLongTerm !== 'Any') {
            const debtToEquityRatioLongTermFilter = { index: 'fundamental', id: this.DEBTTOEQUITYRATIOLONGTERM, value: fundamental.debtToEquityRatioLongTerm };
            this.filters.push(debtToEquityRatioLongTermFilter);
        }
        if (fundamental.marketCap !== 'Any') {
            const grossMarginFilter = { index: 'fundamental', id: this.GROSSMARGIN, value: fundamental.grossMargin };
            this.filters.push(grossMarginFilter);
        }
        if (fundamental.operatingMargin !== 'Any') {
            const operatingMarginFilter = { index: 'fundamental', id: this.OPERATINGMARGIN, value: fundamental.operatingMargin };
            this.filters.push(operatingMarginFilter);
        }
       
        if (fundamental.netProfitMargin !== 'Any') {
            const netProfitMarginFilter = { index: 'fundamental', id: this.NETPROFITMARGIN, value: fundamental.netProfitMargin };
            this.filters.push(netProfitMarginFilter);
        }
        if (fundamental.payoutRatio !== 'Any') {
            const payoutRatioFilter = { index: 'fundamental', id: this.PAYOUTRATIO, value: fundamental.payoutRatio };
            this.filters.push(payoutRatioFilter);
        }

        // fundamental.earningDate = 'Any';
        // fundamental.industry = 'Any';
        // fundamental.dividendYield = 'Any';
        // fundamental.sector = 'Any';
        return [new Fundamental(fundamental), customData];
    }

    handleTechnicalData(technical: Technical) {
        if (technical.movingAverage20day !== 'Any') {
            const movingAverage20dayFilter = { index: 'technical', id: this.MOVING_AVERAGE_20, value: technical.movingAverage20day };
            this.filters.push(movingAverage20dayFilter);
        }
        if (technical.movingAverage50day !== 'Any') {
            const movingAverage50dayFilter = { index: 'technical', id: this.MOVING_AVERAGE_50, value: technical.movingAverage50day };
            this.filters.push(movingAverage50dayFilter);
        }
        if (technical.movingAverage120day !== 'Any') {
            const moving120 = { index: 'technical', id: this.MOVING_AVERAGE_120, value: technical.movingAverage120day };
            this.filters.push(moving120);
        }
        if (technical.exponentialMovingaverage20day !== 'Any') {
            const e20day = { index: 'technical', id: this.EXPONENTIAL_MOVING_AVERAGE_20, value: technical.exponentialMovingaverage20day };
            this.filters.push(e20day);
        }
        if (technical.exponentialMovingaverage50day !== 'Any') {
            const e50day = { index: 'technical', id: this.EXPONENTIAL_MOVING_AVERAGE_50, value: technical.exponentialMovingaverage50day };
            this.filters.push(e50day);
        }
        if (technical.exponentialMovingaverage120day !== 'Any') {
            const e120day = { index: 'technical', id: this.EXPONENTIAL_MOVING_AVERAGE_120, value: technical.exponentialMovingaverage120day };
            this.filters.push(e120day);
        }
        if (technical.priceAction !== 'Any') {
            const priceAction = { index: 'technical', id: this.PRICE_ACTION, value: technical.priceAction };
            this.filters.push(priceAction);
        }
        if (technical.newHighlowprice !== 'Any') {
            const newHighlowprice = { index: 'technical', id: this.NEW_HIGH_LOW_PRICE, value: technical.newHighlowprice };
            this.filters.push(newHighlowprice);
        }
        if (technical.newHighlowvol !== 'Any') {
            const newHighlowvol = { index: 'technical', id: this.NEW_HIGH_LOW_VOLUME, value: technical.newHighlowvol };
            this.filters.push(newHighlowvol);
        }
        if (technical.maVspricecrosses !== 'Any') {
            const maVspricecrosses = { index: 'technical', id: this.MA_VS_PRICE_CROSSES, value: technical.maVspricecrosses };
            this.filters.push(maVspricecrosses);
        }
        if (technical.emaCrossovers !== 'Any') {
            const emaCrossovers = { index: 'technical', id: this.EMA_CROSSOVERS, value: technical.emaCrossovers };
            this.filters.push(emaCrossovers);
        }
        if (technical.volume !== 'Any') {
            const volume = { index: 'technical', id: this.TECH_VOLUME, value: technical.volume };
            this.filters.push(volume);
        }
        if (technical.avgVolumeaction !== 'Any') {
            const avgVolumeaction = { index: 'technical', id: this.AVG_VOLUME_ACTION_20, value: technical.avgVolumeaction };
            this.filters.push(avgVolumeaction);
        }
        if (technical.macd !== 'Any') {
            const macd = { index: 'technical', id: this.MACD, value: technical.macd };
            this.filters.push(macd);
        }
        if (technical.adx10Days !== 'Any') {
            const adx10Days = { index: 'technical', id: this.ADX_10, value: technical.adx10Days };
            this.filters.push(adx10Days);
        }
        if (technical.adx14Days !== 'Any') {
            const adx14Days = { index: 'technical', id: this.ADX_14, value: technical.adx14Days };
            this.filters.push(adx14Days);
        }
        if (technical.diCrossover10d !== 'Any') {
            const diCrossover10d = { index: 'technical', id: this.DI_CROSSOVER_10, value: technical.diCrossover10d };
            this.filters.push(diCrossover10d);
        }
        if (technical.diCrossover14d !== 'Any') {
            const diCrossover14d = { index: 'technical', id: this.DI_CROSSOVER_14, value: technical.diCrossover14d };
            this.filters.push(diCrossover14d);
        }
        if (technical.rsi !== 'Any') {
            const rsi = { index: 'technical', id: this.RSI_14, value: technical.rsi };
            this.filters.push(rsi);
        }
        if (technical.priceChange !== 'Any') {
            const priceChange = { index: 'technical', id: this.PRICE_CHANGE, value: technical.priceChange };
            this.filters.push(priceChange);
        }
        if (technical.bollBand !== 'Any') {
            const bollBand = { index: 'technical', id: this.BOLLINGER_BAND, value: technical.bollBand };
            this.filters.push(bollBand);
        }
        if (technical.volumeAction !== 'Any') {
            const volumeAction = { index: 'technical', id: this.VOLUME_ACTION, value: technical.volumeAction };
            this.filters.push(volumeAction);
        }
        if (technical.weeksTrigger !== 'Any') {
            const weeksTrigger = { index: 'technical', id: this.WEEKS_TRIGGER, value: technical.weeksTrigger };
            this.filters.push(weeksTrigger);
        }
        if (technical.forceIndex !== 'Any') {
            const forceIndex = { index: 'technical', id: this.FORCE_INDEX, value: technical.forceIndex };
            this.filters.push(forceIndex);
        }
        if (technical.bullishCandlestick !== 'Any') {
            const bullishCandlestick = { index: 'technical', id: this.BULLISH_CANDLESTICK, value: technical.bullishCandlestick };
            this.filters.push(bullishCandlestick);
        }
        if (technical.bearishCandlestick !== 'Any') {
            const bearishCandlestick = { index: 'technical', id: this.BEARISH_CANDLESTICK, value: technical.bearishCandlestick };
            this.filters.push(bearishCandlestick);
        }
        return new Technical(technical);
    }

    handleSignalData(signal: Signal) {
        if (signal.tcFast !== 'Any') {
            const tcFast = { index: 'signal', id: this.TC_FAST, value: signal.tcFast };
            this.filters.push(tcFast);
        }
        if (signal.tcPositional !== 'Any') {
            const tcPositional = { index: 'signal', id: this.TC_POSITIONAL, value: signal.tcPositional };
            this.filters.push(tcPositional);
        }
        if (signal.goldenSpike !== 'Any') {
            const goldenSpike = { index: 'signal', id: this.GOLDEN_SPIKE_STRATEGY, value: signal.goldenSpike };
            this.filters.push(goldenSpike);
        }
        if (signal.turtalTrading !== 'Any') {
            const turtalTrading = { index: 'signal', id: this.TURTLE_TRADING_STRATEGY, value: signal.turtalTrading };
            this.filters.push(turtalTrading);
        }
        if (signal.trade4All !== 'Any') {
            const trade4All = { index: 'signal', id: this.TRADER_4_ALL_STRATEGY, value: signal.trade4All };
            this.filters.push(trade4All);
        }
        return new Signal(signal);
    }

    stopScan(){
        this.scanContinue = false;
        this.isSpinner = false;
    }
    // private isUserNearBottom(): boolean {
    //     const threshold = 300;
    //     const position = window.scrollY + window.innerHeight; // <- Measure position differently
    //     const height = document.body.scrollHeight; // <- Measure height differently
    //     return position > height - threshold;
    // }

    // @HostListener('window:scroll', ['$event']) // <- Add scroll listener to window
    // scrolled(event: any): void {
    //     if (this.isLoadingscrolldata == false && this.isUserNearBottom()) {
    //         this.isLoadingscrolldata = true;
    //         this.isLoading = true;
    //         this.getData();
    //     }
    // }
}
