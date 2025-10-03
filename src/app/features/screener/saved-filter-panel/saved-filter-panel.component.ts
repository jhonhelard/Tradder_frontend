import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { Screener } from '../../../core/models/screener.model';
import Swal from 'sweetalert2';
import { Technical } from '../../../core/models/technical.model';
import { Fundamental } from '../../../core/models/fundamental.model';
import { Signal } from '../../../core/models/signal.model';
import { Dynamic } from '../../../core/models/dynamic.model';
import { DynamicData } from '../data/dynamic.data';
import { ScreenerController } from '../../../core/services/screener/screener.controller';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-saved-filter-panel',
    templateUrl: './saved-filter-panel.component.html',
    styleUrls: ['./saved-filter-panel.component.css']
})
export class SavedFilterPanelComponent implements OnInit {
    @Input() savedFilters: any[] = [];
    @Output() handleSelectSavedFilter: EventEmitter<any> = new EventEmitter<any>();
    viewMode: string;
    filters: any[] = [];
    dynamicRefs = DynamicData.data;
    // for fundamental filter
    EXCHANGE = 'Exchange';
    PRICE = 'Price';
    VOLUME = 'Current Volume';
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

    constructor(
        private localstorageHelper: LocalstorageHelper,
        private screenerController: ScreenerController,
        private _authService: AuthService,
    ) { }

    ngOnInit() {
        this.localstorageHelper.getViewMode().subscribe(mode => this.viewMode = mode);
        if (this._authService.isLoggedIn)
            this.updateSavedData();
    }

    updateSavedData() {
        this.screenerController.getSavedFilters(this._authService.userName).subscribe(res => {
            this.savedFilters = res;
        });
    }

    clickSavedFilter(index: number) {
        this.updateSavedData();
        const selectedItem = this.savedFilters[index];
        const question = `Do you want to open ${selectedItem.name} scan filer?`;
        Swal.fire({
            title: 'Are you sure?',
            text: question,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                this.openFilter(index);
                Swal.fire(
                    'Opened!',
                    'Your filter has been opened.',
                    'success'
                ).then();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Swal.fire(
                //     'Cancelled',
                //     'Your operation cancelled!',
                //     'error'
                // ).then();
            }
        });
    }

    openFilter(index: number) {
        const selectedFilter = this.savedFilters[index];
        const generatedData = this.getScreenerData(selectedFilter);
        const data = {
            openedFilterIndex: index,
            screener: generatedData[0],
            filter: this.filters,
            fundamentalCustomData: generatedData[1]
        };
        this.filters = [];
        this.handleSelectSavedFilter.emit(data);
    }

    getScreenerData(selectedItem: any): any[] {
       // const generatedFundamentalData = this.handleFundamentalData(selectedItem.fundamental);
        const generatedDynamicData = this.handleDynamicData(selectedItem.dynamic);
        const generatedSignalData = this.handleSignalData(selectedItem.signal);
        const generatedTechnicalData = this.handleTechnicalData(selectedItem.technical);
        const screener = new Screener();
        screener.name = selectedItem.name;
     //   screener.fundamental = generatedFundamentalData[0];
        screener.dynamic = generatedDynamicData;
        screener.signal = generatedSignalData;
        screener.technical = generatedTechnicalData;
        screener.filterBy = selectedItem.filterBy;
        screener.sorting = selectedItem.sorting;
        return [screener];//, generatedFundamentalData[1]];
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
            const volumeFilter = { index: 'fundamental', id: this.VOLUME, value: strVolume };
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
        if (fundamental.grossMargin !== 'Any') {
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

    clickDeleteFilter(index: number) {
        const selectedItem = this.savedFilters[index];
        const question = `you want to delete ${selectedItem.name} scan filer?`;
        Swal.fire({
            title: 'Are you sure?',
            text: question,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteSavedData(selectedItem);
                this.savedFilters.splice(index, 1);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Swal.fire(
                //     'Cancelled',
                //     'Your operation cancelled!',
                //     'error'
                // ).then();
            }
        });
    }

    deleteSavedData(selectedItem: any) {
        this.screenerController.deleteFilterData(this._authService.userName, selectedItem.name).subscribe(res => {
            this.updateSavedData();
            Swal.fire(
                'Deleted!',
                'Your filter has been deleted successful.',
                'success'
            ).then();
        });
    }

}
