export const ClassOption = {
    EquityOrder: 'equity',
    OptionOrder: 'option',
    MultilegOrder: 'multileg',
    ComboOrder: 'combo',
    // OtoOrder: 'oto',
    // OcoOrder: 'oco',
    // OtocoOrder: 'otoco',
}

export const ClassOptions = [
    { name: 'Equity Order', value: ClassOption.EquityOrder },
    { name: 'Option Order', value: ClassOption.OptionOrder },
    { name: 'Multileg Order', value: ClassOption.MultilegOrder },
    // { name: 'Combo Order', value: ClassOption.ComboOrder },
    // { name: 'Oto Order', value: ClassOption.OtoOrder },
    // { name: 'Oco Order', value: ClassOption.OcoOrder },
    // { name: 'Otoco Order', value: ClassOption.OtocoOrder }
]

export const SideOption = {
    Buy: 'buy',
    Sell: 'sell',
    BuyToCover: 'buy_to_cover',
    SellShort: 'sell_short',
    BuyToOpen: 'buy_to_open',
    BuyToClose: 'buy_to_close',
    SellToOpen: 'sell_to_open',
    SellToClose: 'sell_to_close'
}

export const SideOptions = [
    { name: 'Buy', value: SideOption.Buy },
    { name: 'Sell', value: SideOption.Sell },
    { name: 'Buy To Conver', value: SideOption.BuyToCover },
    { name: 'Sell Short', value: SideOption.SellShort },
]

export const MultilegSideOptions = [
    { name: 'Buy To Open', value: SideOption.BuyToOpen },
    { name: 'Buy To Close', value: SideOption.BuyToClose },
    { name: 'Sell To Open', value: SideOption.SellToOpen },
    { name: 'Sell To Close', value: SideOption.SellToClose },
]

export const TypeOption = {
    Market: 'market',
    Limit: 'limit',
    Stop: 'stop',
    StopLimit: 'stop_limit',
}

export const TypeOptions = [
    { name: 'Market', value: TypeOption.Market },
    { name: 'Limit', value: TypeOption.Limit },
    { name: 'Stop', value: TypeOption.Stop },
    { name: 'Stop Limit', value: TypeOption.StopLimit },
]

export const DurationOption = {
    Day: 'day',
    Gtc: 'gtc',
    Pre: 'pre',
    Post: 'post',
}
export const DurationOptions = [
    { name: 'Day', value: DurationOption.Day },
    { name: 'Gtc', value: DurationOption.Gtc },
    { name: 'Pre', value: DurationOption.Pre },
    { name: 'Post', value: DurationOption.Post },
]
export const OptionTypeOption = {
    Call: 'call',
    Puts: 'put',
}
export const OptionTypeOptions = [
    { name: 'CALL', value: OptionTypeOption.Call },
    { name: 'PUTS', value: OptionTypeOption.Puts },
]

export const LocalStorageConstants = {
    ViewMode: 'VIEW_MODE',
    LatestViewedSymbol: 'LATEST_VIEWED_SYMBOL',
    TradierTokenKey: 'TRADIER_TOKEN',
    TradierAccountNo: 'TRADIER_ACCOUNT_NO',
    SelectedSubscriptionPlan: 'SELECTED_SUBSCRIPTION_PLAN'
}

export const ViewMode = {
    // DARK_MODE: 'DARK_MODE',
    DARK_MODE: 'night-mode',
    LIGHT_MODE: 'light-mode',
    // LIGHT_MODE: 'LIGHT_MODE',
}

export enum CompareOperator {
    Equal = 1,
    NotEqual = 2
}

export const RoleConst = {
    Administrators: "Administrators",
    GeneralUser: "GeneralUser",
    Silver: "Silver",
    Gold: "Gold",
    Platinum: "Platinum"
}
export const PriceTag = {
    Free:'price_1MP8HLCRmDTwTgcmNZxzGjC4',
    StandardMonthly:'price_1MP8T8CRmDTwTgcmxHLZx824',
    StandardAnnually:'price_1MP8T8CRmDTwTgcmlN4Cy7nQ',
    PremiumMonthly:'price_1MP8R4CRmDTwTgcmPv7vT61E',
    PremiumAnnually:'price_1MP8R4CRmDTwTgcmFSIz3VgM',
}