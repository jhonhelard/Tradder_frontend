export class Signal {
    public tcFast: string;
    public tcPositional: string;
    public goldenSpike: string;
    public turtalTrading: string;
    public trade4All: string;
    constructor(data) {
        this.tcFast = data.tcFast ? data.tcFast : 'Any';
        this.tcPositional = data.tcPositional ? data.tcPositional : 'Any';
        this.goldenSpike = data.goldenSpike ? data.goldenSpike : 'Any';
        this.turtalTrading = data.turtalTrading ? data.turtalTrading : 'Any';
        this.trade4All = data.trade4All ? data.trade4All : 'Any';
    }
    toJson() {
        return {
            tcFast: this.tcFast,
            tcPositional: this.tcPositional,
            goldenSpike: this.goldenSpike,
            turtalTrading: this.turtalTrading,
            trade4All: this.trade4All
        };
    }
}
