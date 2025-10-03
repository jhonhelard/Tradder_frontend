export class Fundamental {
    public exchange: string;
    public price: string;
    public volume: string;
    public marketCap: string;
    public earningDate: string;
    public industry: string;
    public dividendYield: string;
    public sector: string;

    public peRatio: string;
    public forwardPE: string;
    public pegRatio: string;
    public priceToSales: string;
    public priceToBook: string;
    public priceToCash: string;
    public priceToCashflow: string;
    public epsGrowth: string;
    public returnOnAssets: string;
    public returnOnEquity: string;
    public returnOnInvestment: string;
    public currentRatio: string;
    public quickRatio: string;
    public debtToEquityRatio: string;
    public debtToEquityRatioLongTerm: string;
    public grossMargin: string;
    public operatingMargin: string;
    public netProfitMargin: string;
    public payoutRatio: string;
    constructor(data: any) {
        this.exchange = data.exchange ? data.exchange : 'Any';
        this.price = data.price ? data.price : 'Any';
        this.volume = data.volume ? data.volume : 'Any';
        this.marketCap = data.marketCap ? data.marketCap : 'Any';
        this.earningDate = data.earningDate ? data.earningDate : 'Any';
        this.industry = data.industry ? data.industry : 'Any';
        this.dividendYield = data.dividendYield ? data.dividendYield : 'Any';
        this.sector = data.sector ? data.sector : 'Any';

        this.peRatio = data.peRatio ? data.peRatio : 'Any';
        this.forwardPE = data.forwardPE ? data.forwardPE : 'Any';
        this.pegRatio = data.pegRatio ? data.pegRatio : 'Any';
        this.priceToSales = data.priceToSales ? data.priceToSales : 'Any';
        this.priceToBook = data.priceToBook ? data.priceToBook : 'Any';
        this.priceToCash = data.priceToCash ? data.priceToCash : 'Any';
        this.priceToCashflow = data.priceToCashflow ? data.priceToCashflow : 'Any';
        this.epsGrowth = data.epsGrowth ? data.epsGrowth : 'Any';  
        this.returnOnAssets = data.returnOnAssets ? data.returnOnAssets : 'Any';
        this.returnOnEquity = data.returnOnEquity ? data.returnOnEquity : 'Any';
        this.returnOnInvestment = data.returnOnInvestment ? data.returnOnInvestment : 'Any';
        this.currentRatio = data.currentRatio ? data.currentRatio : 'Any';
        this.quickRatio = data.quickRatio ? data.quickRatio : 'Any';
        this.debtToEquityRatio = data.debtToEquityRatio ? data.debtToEquityRatio : 'Any';
        this.debtToEquityRatioLongTerm = data.debtToEquityRatioLongTerm ? data.debtToEquityRatioLongTerm : 'Any';
        this.grossMargin = data.grossMargin ? data.grossMargin : 'Any';
        this.operatingMargin = data.operatingMargin ? data.operatingMargin : 'Any';
        this.netProfitMargin = data.netProfitMargin ? data.netProfitMargin : 'Any';
        this.payoutRatio = data.payoutRatio ? data.payoutRatio : 'Any';
    }
    toJson() {
        return {
            exchange: this.exchange,
            price: this.price,
            volume: this.volume,
            marketCap: this.marketCap,
            earningDate: this.earningDate,
            industry: this.industry,
            dividendYield: this.dividendYield,
            sector: this.sector,

            peRatio: this.peRatio,
            forwardPE: this.forwardPE, //this.forwardPE : 'Any';
            pegRatio: this.pegRatio, //this.pegRatio : 'Any';
            priceToSales: this.priceToSales, //this.priceToSales : 'Any';
            priceToBook: this.priceToBook, //this.priceToBook : 'Any';
            priceToCash: this.priceToCash, //this.priceToCash : 'Any';
            priceToCashflow: this.priceToCashflow, //this.priceToCashflow : 'Any';
            epsGrowth: this.epsGrowth, //this.epsGrowth : 'Any';  
            returnOnAssets: this.returnOnAssets, //this.returnOnAssets : 'Any';
            returnOnEquity: this.returnOnEquity, //this.returnOnEquity : 'Any';
            returnOnInvestment: this.returnOnInvestment, //this.returnOnInvestment : 'Any';
            currentRatio: this.currentRatio, //this.currentRatio : 'Any';
            quickRatio: this.quickRatio, //this.quickRatio : 'Any';
            debtToEquityRatio: this.debtToEquityRatio, //this.debtToEquityRatio : 'Any';
            debtToEquityRatioLongTerm: this.debtToEquityRatioLongTerm, //this.debtToEquityRatioLongTerm : 'Any';
            grossMargin: this.grossMargin, //this.grossMargin : 'Any';
            operatingMargin: this.operatingMargin, //this.operatingMargin : 'Any';
            netProfitMargin: this.netProfitMargin, //this.netProfitMargin : 'Any';
            payoutRatio: this.payoutRatio 


        };
    }
}
