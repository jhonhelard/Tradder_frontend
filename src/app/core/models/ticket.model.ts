export interface ITicketModel {
    symbol: string,
    ticker: string, //  webxtor: duplicate for left-table
    companyName: string,
    change: number,
    volume: number,
    latestPrice: number,
    close: number, //  webxtor: duplicate for left-table
    changePercent: number,
    percentChange: number //  webxtor: duplicate for left-table
}