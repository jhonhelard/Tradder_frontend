import { IWatchListStockItemModel } from './watch-list-stock-item.model';

export interface IWatchListModel {
    name: string,
    stocks: IWatchListStockItemModel[]
}