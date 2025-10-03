import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { SignalData } from '../data/signal.data';
import { Signal } from '../../../core/models/signal.model';

@Component({
    selector: 'app-signal-panel',
    templateUrl: './signal-panel.component.html',
    styleUrls: ['./signal-panel.component.css']
})
export class SignalPanelComponent implements OnInit {
    @Input()
    signal: Signal;
    @Input()
    viewMode: string;
    @Output()
    handleData: EventEmitter<any> = new EventEmitter<any>();

    tcFastResp = SignalData.tcFast;
    tcPositionalResp = SignalData.tcPositional;
    goldenSpikeResp = SignalData.goldenSpike;
    turtalTradingResp = SignalData.turtalTrading;
    trade4AllResp = SignalData.trade4All;
    TC_FAST = 'TC Fast Trade Strategy';
    TC_POSITIONAL = 'TC Positional Trade Strategy';
    GOLDEN_SPIKE_STRATEGY = 'Golden Spike Strategy';
    TURTLE_TRADING_STRATEGY = 'Turtle Trading Strategy';
    TRADER_4_ALL_STRATEGY = 'Trader4All Strategy';

    constructor( private localstorageHelper: LocalstorageHelper ) { }

    ngOnInit() {
        this.localstorageHelper.getViewMode().subscribe(mode => this.viewMode = mode);
    }
    onChangeDropDown(label) {
        let selectedVal: string;
        switch (label) {
            // for signal
            case this.TC_FAST:
                selectedVal = this.signal.tcFast;
                break;
            case this.TC_POSITIONAL:
                selectedVal = this.signal.tcPositional;
                break;
            case this.GOLDEN_SPIKE_STRATEGY:
                selectedVal = this.signal.goldenSpike;
                break;
            case this.TURTLE_TRADING_STRATEGY:
                selectedVal = this.signal.turtalTrading;
                break;
            case this.TRADER_4_ALL_STRATEGY:
                selectedVal = this.signal.trade4All;
                break;
        }
        let filterData = {index: 'signal', id: label, value: selectedVal};
        this.handleData.emit({filter: filterData, data: this.signal});
    }
}
