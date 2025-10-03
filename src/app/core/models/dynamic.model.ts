export class Dynamic {
    public title: string;
    public name: string;
    public values: any[];
    public help: string;
    constructor(data: any) {
        this.title = data.title ? data.title : 'CLOSE is greater than OPEN';
        this.name = data.name ? data.name : 'CLOSE > OPEN';
        this.values = data.values ? data.values : [];
        this.help = data.help ? data.help : 'The stock is going up';
    }
}
