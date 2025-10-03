export class Technical {
    public movingAverage20day: string;
    public movingAverage50day: string;
    public movingAverage120day: string;
    public exponentialMovingaverage20day: string;
    public exponentialMovingaverage50day: string;
    public exponentialMovingaverage120day: string;
    public priceAction: string;
    public newHighlowprice: string;
    public newHighlowvol: string;
    public maVspricecrosses: string;
    public emaCrossovers: string;
    public volume: string;
    public avgVolumeaction: string;
    public macd: string;
    public adx10Days: string;
    public adx14Days: string;
    public diCrossover10d: string;
    public diCrossover14d: string;
    public rsi: string;
    public priceChange: string;
    public bollBand: string;
    public volumeAction: string;
    public weeksTrigger: string;
    public forceIndex: string;
    public bullishCandlestick: string;
    public bearishCandlestick: string;
    public Candlestick: string;
    constructor(data: any) {
        this.movingAverage20day = data.movingAverage20day ? data.movingAverage20day : 'Any';
        this.movingAverage50day = data.movingAverage50day ? data.movingAverage50day : 'Any';
        this.movingAverage120day = data.movingAverage120day ? data.movingAverage120day : 'Any';
        this.exponentialMovingaverage20day = data.exponentialMovingaverage20day ? data.exponentialMovingaverage20day : 'Any';
        this.exponentialMovingaverage50day = data.exponentialMovingaverage50day ? data.exponentialMovingaverage50day : 'Any';
        this.exponentialMovingaverage120day = data.exponentialMovingaverage120day ? data.exponentialMovingaverage120day : 'Any';
        this.priceAction = data.priceAction ? data.priceAction : 'Any';
        this.newHighlowprice = data.newHighlowprice ? data.newHighlowprice : 'Any';
        this.newHighlowvol = data.newHighlowvol ? data.newHighlowvol : 'Any';
        this.maVspricecrosses = data.maVspricecrosses ? data.maVspricecrosses : 'Any';
        this.emaCrossovers = data.emaCrossovers ? data.emaCrossovers : 'Any';
        this.volume = data.volume ? data.volume : 'Any';
        this.avgVolumeaction = data.avgVolumeaction ? data.avgVolumeaction : 'Any';
        this.macd = data.macd ? data.macd : 'Any';
        this.adx10Days = data.adx10Days ? data.adx10Days : 'Any';
        this.adx14Days = data.adx14Days ? data.adx14Days : 'Any';
        this.diCrossover10d = data.diCrossover10d ? data.diCrossover10d : 'Any';
        this.diCrossover14d = data.diCrossover14d ? data.diCrossover14d : 'Any';
        this.rsi = data.rsi ? data.rsi : 'Any';
        this.priceChange = data.priceChange ? data.priceChange : 'Any';
        this.bollBand = data.bollBand ? data.bollBand : 'Any';
        this.volumeAction = data.volumeAction ? data.volumeAction : 'Any';
        this.weeksTrigger = data.weeksTrigger ? data.weeksTrigger : 'Any';
        this.forceIndex = data.forceIndex ? data.forceIndex : 'Any';
        this.bullishCandlestick = data.bullishCandlestick ? data.bullishCandlestick : 'Any';
        this.bearishCandlestick = data.bearishCandlestick ? data.bearishCandlestick : 'Any';
    }
    toJson() {
        return {
            movingAverage20day: this.movingAverage20day,
            movingAverage50day: this.movingAverage50day,
            movingAverage120day: this.movingAverage120day,
            exponentialMovingaverage20day: this.exponentialMovingaverage20day,
            exponentialMovingaverage50day: this.exponentialMovingaverage50day,
            exponentialMovingaverage120day: this.exponentialMovingaverage120day,
            priceAction: this.priceAction,
            newHighlowprice: this.newHighlowprice,
            newHighlowvol: this.newHighlowvol,
            maVspricecrosses: this.maVspricecrosses,
            emaCrossovers: this.emaCrossovers,
            volume: this.volume,
            avgVolumeaction: this.avgVolumeaction,
            macd: this.macd,
            adx10Days: this.adx10Days,
            adx14Days: this.adx14Days,
            diCrossover10d: this.diCrossover10d,
            diCrossover14d: this.diCrossover14d,
            rsi: this.rsi,
            priceChange: this.priceChange,
            bollBand: this.bollBand,
            volumeAction: this.volumeAction,
            weeksTrigger: this.weeksTrigger,
            forceIndex: this.forceIndex,
            bullishCandlestick: this.bullishCandlestick,
            bearishCandlestick: this.bearishCandlestick
        };
    }
}
