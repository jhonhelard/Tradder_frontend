import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TechnicalData } from '../data/technical.data';
import { Technical } from '../../../core/models/technical.model';

@Component({
    selector: 'app-technical-panel',
    templateUrl: './technical-panel.component.html',
    styleUrls: ['./technical-panel.component.css']
})
export class TechnicalPanelComponent implements OnInit {
    @Input()
    technical: Technical;
    viewMode: string;
    @Output()
    handleData: EventEmitter<any> = new EventEmitter<any>();

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
    VOLUME = 'Volume';
    AVG_VOLUME_ACTION_20  = 'Avg Volume Action(20D)';
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

    movingAverage20dayResp = TechnicalData.movingAverage20day;
    movingAverage50dayResp = TechnicalData.movingAverage50day;
    movingAverage120dayResp = TechnicalData.movingAverage120day;
    exponentialMovingaverage20dayResp = TechnicalData.exponentialMovingAverage20day;
    exponentialMovingaverage50dayResp = TechnicalData.exponentialMovingAverage50day;
    exponentialMovingaverage120dayResp = TechnicalData.exponentialMovingAverage120day;
    priceActionResp = TechnicalData.priceAction;
    newHighlowpriceResp = TechnicalData.newHighLowPrice;
    newHighlowvolResp = TechnicalData.newHighLowVol;
    maVspricecrossesResp = TechnicalData.maVspricecrosses;
    emaCrossoversResp = TechnicalData.emaCrossovers;
    volumeResp = TechnicalData.volume;
    avgVolumeactiionResp = TechnicalData.avgVolumeAction;
    macdResp = TechnicalData.macd;
    adx10DaysResp = TechnicalData.adx10Days;
    adx14DaysResp = TechnicalData.adx14Days;
    diCrossover10dResp = TechnicalData.diCrossover10d;
    diCrossover14dResp = TechnicalData.diCrossover14d;
    rsiResp = TechnicalData.rsi;
    priceChangeResp = TechnicalData.priceChange;
    bollBandresp = TechnicalData.bollBand;
    volumeActionResp = TechnicalData.volumeAction;
    weeksTriggerResp = TechnicalData.weeksTrigger;
    forceIndexResp = TechnicalData.forceIndex;
    bullishCandlestickResp = TechnicalData.bullishCandlestick;
    bearishCandlestickResp = TechnicalData.bearishCandlestick;
    // for class
    public isShowAll: boolean;

    constructor(private router: Router) {
    }

    ngOnInit() { }
    clickedShowAll() {
        this.isShowAll = !this.isShowAll;
    }
    onChangeDropDown(label: string) {
        let selectedVal: string;
        switch (label) {
            case this.MOVING_AVERAGE_20:
                selectedVal = this.technical.movingAverage20day;
                break;
            case this.MOVING_AVERAGE_50:
                selectedVal = this.technical.movingAverage50day;
                break;
            case this.MOVING_AVERAGE_120:
                selectedVal = this.technical.movingAverage120day;
                break;
            case this.EXPONENTIAL_MOVING_AVERAGE_20:
                selectedVal = this.technical.exponentialMovingaverage20day;
                break;
            case this.EXPONENTIAL_MOVING_AVERAGE_50:
                selectedVal = this.technical.exponentialMovingaverage50day;
                break;
            case this.EXPONENTIAL_MOVING_AVERAGE_120:
                selectedVal = this.technical.exponentialMovingaverage120day;
                break;
            case this.PRICE_ACTION:
                selectedVal = this.technical.priceAction;
                break;
            case this.NEW_HIGH_LOW_PRICE:
                selectedVal = this.technical.newHighlowprice;
                break;
            case this.NEW_HIGH_LOW_VOLUME:
                selectedVal = this.technical.newHighlowvol;
                break;
            case this.MA_VS_PRICE_CROSSES:
                selectedVal = this.technical.maVspricecrosses;
                break;
            case this.EMA_CROSSOVERS:
                selectedVal = this.technical.emaCrossovers;
                break;
            case this.VOLUME:
                selectedVal = this.technical.volume;
                break;
            case this.AVG_VOLUME_ACTION_20:
                selectedVal = this.technical.avgVolumeaction;
                break;
            case this.MACD:
                selectedVal = this.technical.macd;
                break;
            case this.ADX_10:
                selectedVal = this.technical.adx10Days;
                break;
            case this.ADX_14:
                selectedVal = this.technical.adx14Days;
                break;
            case this.DI_CROSSOVER_10:
                selectedVal = this.technical.diCrossover10d;
                break;
            case this.DI_CROSSOVER_14:
                selectedVal = this.technical.diCrossover14d;
                break;
            case this.RSI_14:
                selectedVal = this.technical.rsi;
                break;
            case this.PRICE_CHANGE:
                selectedVal = this.technical.priceChange;
                break;
            case this.BOLLINGER_BAND:
                selectedVal = this.technical.bollBand;
                break;
            case this.VOLUME_ACTION:
                selectedVal = this.technical.volumeAction;
                break;
            case this.WEEKS_TRIGGER:
                selectedVal = this.technical.weeksTrigger;
                break;
            case this.FORCE_INDEX:
                selectedVal = this.technical.forceIndex;
                break;
            case this.BULLISH_CANDLESTICK:
                selectedVal = this.technical.bullishCandlestick;
                break;
            case this.BEARISH_CANDLESTICK:
                selectedVal = this.technical.bearishCandlestick;
                break;
        }
        console.log(selectedVal);
        const filterData = {index: 'technical', id: label, value: selectedVal};
        this.handleData.emit({ filter: filterData, data: this.technical });
    }
}
