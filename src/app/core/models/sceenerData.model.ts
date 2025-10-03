export interface ScreenerData {
    ticker: string;
    company: string;
    last: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    exchange: string;
    option: string;
    sector: string;
    industry: string;
    stockDate: string;
    change: number;
    percentChange: number;
}

export interface ScreenerResponse {
    data: ScreenerData[];
    totalRecord: number;
}
