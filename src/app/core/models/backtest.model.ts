
export interface IndicatorModel {
    GroupName: string;
    Name: string;
    FullName: string;
    Description: string;
    Params: ParamsModel[];
}

export interface ParamsModel {
    Name: string;
    DefaultValue: string;
    MinValue: string;
    MaxValue: string;
    ParamType: any;
    Description: string;
}

export class BackTestReposonseModel {
    ticker: string;
    numberOfDays: number | null;
    signalType: string;
    totalGain: number;
    avgGain: number;
    totalLoosingTrades: number;
    totalProfitableTrades: number;
    formulaName: string;
    BuySell: BackTestResult[];
    ShortCover: BackTestResult[];
    ChartURL: string;
}

export class BackTestResult {
    entryDate: string;
    entryPrice: number;
    exitDate: string;
    exitPrice: number;
    daysInTrade: number;
    profitPercent: number;
}

export class BackTestRequestModel {
    EnterLong: string;
    ExitLong: string;
    EnterShort: string;
    CoverShort: string;
}


export class BackTestFilter {
    FromIndicator: any;
    FromParameter: string;
    operator: string;
    ToIndicator: any;
    ToParameter: string;
}

export class BackTestSummary {
    EnterLong: string;
    ExitLong: string;
    EnterShort: string;
    CoverShort: string;
};


export class BasicBackTestRequestModel {
    ticker: string;
    name: string;
    numberOfDays: number;
    signalType: string;
    strategy: strategyModel;
}

export class strategyModel{
    name: string;
    shortName: string;
    values: any = [];
}
