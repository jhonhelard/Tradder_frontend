export interface IWatchListStockItemModel {
    ticker: string,
    company: string,
    last: number,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    exchange: string,
    option: string,
    sector: string,
    industry: string,
    stockDate: Date,
    change: number,
    percentChange: number
}