export interface MarketReportResponse {
    ConditionId: string;
    Condition: string;
    ConditionDesc: string;
    Exchange: string;
    Total?: number;
    Scaned?: number;
    ResultCount?: number;
    StartTime?: Date;
    EndTime?: Date;
    ScanType: number;
}

export interface MarketReportDetailsRequest {
    conditionId: string[];
    sortBy: string;
    sortDirection: string;
    exchange: string;
    key: string;
    pageIndex: number;
    pageSize: number;
}

export interface MarketReportDetailsResponse {
    TotalRecord: number;
    Data: any[];
    FilterData: any[];
}

export interface AddFavoriteRequest {
    userName: string;
    tickesNames: string[];
    watchlistId: string;
}