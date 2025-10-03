import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { Fundamental } from '../../../core/models/fundamental.model';
import { FundamentalData } from '../data/fundamental.data';

@Component({
    selector: 'app-fundamental-panel',
    templateUrl: './fundamental-panel.component.html',
    styleUrls: ['./fundamental-panel.component.css']
})
export class FundamentalPanelComponent implements OnInit, OnChanges {
    @Input() fundamental: Fundamental;
    @Input() customData: any;
    @Output() handleData: EventEmitter<any> = new EventEmitter<any>();
    @Output() handleCustomDelete: EventEmitter<any> = new EventEmitter<string>();
    viewMode: string;

    exchangeRefs = FundamentalData.exchange;
    priceRefs = FundamentalData.price;
    volumeRefs = FundamentalData.volume;
    marketCapRefs = FundamentalData.marketCap;
    peRatioRefs = FundamentalData.peRatio;
    forwardPERefs = FundamentalData.forwardPE;
    pegRatioRefs = FundamentalData.pegRatio;
    priceToSalesRefs = FundamentalData.priceToSales;
    priceToBookRefs = FundamentalData.priceToBook;
    priceToCashRefs = FundamentalData.priceToCash;
    priceToCashflowRefs = FundamentalData.priceToCashflow;
    epsGrowthRefs = FundamentalData.epsGrowth;
    returnOnAssetsRefs = FundamentalData.returnOnAssets;
    returnOnEquityRefs = FundamentalData.returnOnEquity;
    returnOnInvestmentRefs = FundamentalData.returnOnInvestment;
    currentRatioRefs = FundamentalData.currentRatio;
    quickRatioRefs = FundamentalData.quickRatio;
    debtToEquityRatioRefs = FundamentalData.debtToEquityRatio;
    debtToEquityRatioLongTermRefs = FundamentalData.debtToEquityRatioLongTerm;
    grossMarginRefs = FundamentalData.grossMargin;
    operatingMarginRefs = FundamentalData.operatingMargin;
    netProfitMarginRefs = FundamentalData.netProfitMargin;
    payoutRatioRefs = FundamentalData.payoutRatio;
earningDate = FundamentalData.earningDate;
dividendYield = FundamentalData.dividendYield;

    EXCHANGE = 'Exchange';
    PRICE = 'Price';
    VOLUME = 'Current Volume';
    CUSTOM_PRICE_START = 'START_PRICE';
    CUSTOM_PRCIE_END = 'END_PRICE';
    CUSTOM_VOLUME_START = 'START_VOLUME';
    CUSTOM_VOLUME_END = 'END_VOLUME';
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


    priceStart: any;
    priceEnd: any;
    volumeStart: any;
    volumeEnd: any;

    constructor() {}

    ngOnInit() {
        this.priceStart = this.customData.price.start === 0 ? '' : this.customData.price.start;
        this.priceEnd = this.customData.price.end === 0 ? '' : this.customData.price.end;
        this.volumeStart = this.customData.volume.start === 0 ? '' : this.customData.volume.start / 1000;
        this.volumeEnd = this.customData.volume.end === 0 ? '' : this.customData.volume.end / 1000;
    }

    ngOnChanges() {
        this.priceStart = this.customData.price.start === 0 ? '' : this.customData.price.start;
        this.priceEnd = this.customData.price.end === 0 ? '' : this.customData.price.end;
        this.volumeStart = this.customData.volume.start === 0 ? '' : this.customData.volume.start / 1000;
        this.volumeEnd = this.customData.volume.end === 0 ? '' : this.customData.volume.end / 1000;
    }

    onChangedFundamental(label: string) {
        let selectedVal;
        switch (label) {
            case this.PRICE:
                selectedVal = this.fundamental.price;
                break;
            case this.VOLUME:
                selectedVal = this.fundamental.volume;
                break;
                case this.MARKETCAP:
                    selectedVal = this.fundamental.marketCap;
                    break;
                    case this.EXCHANGE:
                        selectedVal = this.fundamental.exchange;
                        break;
                        case this.PERATIO:
                            selectedVal = this.fundamental.peRatio;
                            break;
                        case this.FORWARDPE:
                            selectedVal = this.fundamental.forwardPE;
                            break;
                            case this.PEGRATIO:
                                selectedVal = this.fundamental.pegRatio;
                                break;
                                case this.PRICETOSALES:
                                    selectedVal = this.fundamental.priceToSales;
                                    break;

                                    case this.PRICETOBOOK:
                                        selectedVal = this.fundamental.priceToBook;
                                        break;
                                    case this.PRICETOCASH:
                                        selectedVal = this.fundamental.priceToCash;
                                        break;
                                        case this.PRICETOCASHFLOW:
                                            selectedVal = this.fundamental.priceToCashflow;
                                            break;
                                            case this.EPSGROWTH:
                                                selectedVal = this.fundamental.epsGrowth;
                                                break;

                                                case this.RETURNONASSETS:
                                                    selectedVal = this.fundamental.returnOnAssets;
                                                    break;
                                                case this.RETURNONEQUITY:
                                                    selectedVal = this.fundamental.returnOnEquity;
                                                    break;
                                                    case this.RETURNONINVESTMENT:
                                                        selectedVal = this.fundamental.returnOnInvestment;
                                                        break;
                                                        case this.CURRENTRATIO:
                                                            selectedVal = this.fundamental.currentRatio;
                                                            break;

                                                            case this.QUICKRATIO:
                                                                selectedVal = this.fundamental.quickRatio;
                                                                break;
                                                            case this.DEBTTOEQUITYRATIO:
                                                                selectedVal = this.fundamental.debtToEquityRatio;
                                                                break;
                                                                case this.DEBTTOEQUITYRATIOLONGTERM:
                                                                    selectedVal = this.fundamental.debtToEquityRatioLongTerm;
                                                                    break;
                                                                    case this.GROSSMARGIN:
                                                                        selectedVal = this.fundamental.grossMargin;
                                                                        break;

                                                                        case this.OPERATINGMARGIN:
                                                                            selectedVal = this.fundamental.operatingMargin;
                                                                            break;
                                                                        case this.NETPROFITMARGIN:
                                                                            selectedVal = this.fundamental.netProfitMargin;
                                                                            break;
                                                                            case this.PAYOUTRATIO:
                                                                                selectedVal = this.fundamental.payoutRatio;
                                                                                break;
                                                                                case this.EARNINGDATE:
                                                                                    selectedVal = this.fundamental.earningDate;
                                                                                    break;

                                                                                    case this.DIVIDENDYIELD:
                                                                                        selectedVal = this.fundamental.dividendYield;
                                                                                        break;
                                                                                
            // default:
            //     selectedVal = this.fundamental.exchange;
        }
        if (selectedVal !== 'Custom') {
            const filterData = {index: 'fundamental', id: label, value: selectedVal};
            this.handleData.emit({
                filter: filterData,
                data: this.fundamental,
                customData: this.customData
            });
        }
    }

    onChangeCustomField(index: string) {
        let selectedVal;
        switch (index) {
            case this.CUSTOM_PRICE_START:
                if (this.priceStart !== null) {
                    if (this.priceEnd !== null && this.priceEnd !== undefined && this.priceEnd !== '') {
                        if (this.priceStart > this.priceEnd) {
                            this.priceStart = null;
                        }
                    }
                }
                selectedVal = this.handleCustomPrice(this.PRICE);
                break;
            case this.CUSTOM_PRCIE_END:
                if (this.priceStart !== null) {
                    if (this.priceEnd !== null && this.priceEnd !== undefined && this.priceEnd !== '') {
                        if (this.priceStart > this.priceEnd) {
                            this.priceEnd = null;
                        }
                    }
                }
                selectedVal = this.handleCustomPrice(this.PRICE);
                break;
            case this.CUSTOM_VOLUME_START:
                if (this.volumeStart !== null) {
                    if (this.volumeEnd !== null && this.volumeEnd !== undefined && this.volumeEnd !== '') {
                        if (this.volumeStart > this.volumeEnd) {
                            this.volumeStart = null;
                        }
                    }
                }
                selectedVal = this.handleCustomPrice(this.VOLUME);
                break;
            case this.CUSTOM_VOLUME_END:
                if (this.volumeStart !== null) {
                    if (this.volumeEnd !== null && this.volumeEnd !== undefined && this.volumeEnd !== '') {
                        if (this.volumeStart > this.volumeEnd) {
                            this.volumeEnd = null;
                        }
                    }
                }
                selectedVal = this.handleCustomPrice(this.VOLUME);
                break;
        }

        this.submitCustomData(index, selectedVal);
    }

    handleCustomPrice(index: string) {
        let symbol = '$';
        let customStart = this.priceStart;
        let customEnd = this.priceEnd;
        if (index === this.VOLUME) {
            symbol = 'K';
            customStart = this.volumeStart;
            customEnd = this.volumeEnd;
        }

        let tempStart = '';
        let tempEnd = '';
        if (customStart !==  null && customStart !== undefined && customStart !== '') {
            tempStart = `${symbol}${customStart}`;
            if (symbol === 'K') {
                tempStart = `${customStart}${symbol}`;
            }
        }
        if (customEnd !== null && customEnd !== undefined && customEnd !== '') {
            tempEnd = `${symbol}${customEnd}`;
            if (symbol === 'K') {
                tempEnd = `${customEnd}${symbol}`;
            }
        }
        this.customData.price.start = this.priceStart === null || this.priceStart === '' ? 0 : this.priceStart;
        this.customData.price.end = this.priceEnd === null || this.priceEnd === '' ? 0 : this.priceEnd;
        this.customData.volume.start = this.volumeStart == null || this.volumeStart === '' ? 0 : this.volumeStart * 1000;
        this.customData.volume.end = this.volumeEnd == null || this.volumeEnd === '' ? 0 : this.volumeEnd * 1000;
        return `${tempStart}-${tempEnd}`;
    }

    submitCustomData(index: string, val: string) {
        let label;
        if (index === this.CUSTOM_PRICE_START || index === this.CUSTOM_PRCIE_END) {
            label = this.PRICE;
        } else {
            label = this.VOLUME;
        }
        if (val !== '-') {
            const filterData = {index: 'fundamental', id: label, value: val};
            this.handleData.emit({
                    filter: filterData,
                    data: this.fundamental,
                    customData: this.customData
                });
        }

    }

    deleteCustomPrice() {
        this.fundamental.price = 'Any';
        this.priceStart = '';
        this.priceEnd = '';
        this.customData.price.start = 0;
        this.customData.price.end = 0;
        this.handleCustomDelete.emit({id: this.PRICE, customData: this.customData});
    }

    deleteCustomVolume() {
        this.fundamental.volume = 'Any';
        this.volumeStart = '';
        this.volumeEnd = '';
        this.customData.volume.start = 0;
        this.customData.volume.end = 0;
        this.handleCustomDelete.emit({id: this.VOLUME, customData: this.customData});
    }
}
