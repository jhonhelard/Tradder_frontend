import {Fundamental} from './fundamental.model';
import {Technical} from './technical.model';
import {Signal} from './signal.model';
import {Dynamic} from './dynamic.model';

export class Screener {
    public name: string;
    public fundamental: Fundamental;
    public technical: Technical;
    public signal: Signal;
    public dynamic: Dynamic[];
    public sorting: string;
    public filterBy: string;
    public pageIndex: number;
    public pageSize: number;
    constructor() {
        this.name = '';
        this.fundamental = new Fundamental({});
        this.technical = new Technical({});
        this.signal = new Signal({});
        this.dynamic = [];
        this.sorting = 'volume';
        this.filterBy = 'Any';
        this.pageIndex = 1;
        this.pageSize = 10;
    }

    toJson() {
        return {
            name: this.name,
            fundamental: this.fundamental.toJson(),
            technical: this.technical.toJson(),
            signal: this.signal.toJson(),
            dynamic: this.toDynamicJsonArray(),
            sorting: 'volume',
            filterBy: 'Any',
            pageIndex: 1,
            pageSize: 10
        };
    }

    toDynamicJsonArray() {
        const temp = [];
        this.dynamic.forEach(item => {
            let vals = [];
            item.values.forEach( val => {
                vals.push( { name: val.name, value: val.value });
            });
            temp.push({ name: item.name, values: vals});
        });
        return temp;
    }
}
