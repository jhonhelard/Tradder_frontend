import { Component, OnInit, Input, ElementRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalService } from "ngx-bootstrap/modal";
import { OverlayPanel } from "primeng/overlaypanel";
import { LocalstorageHelper } from "src/app/core/helpers/localstorage.helper";
import { TraderDetailsComponent } from "src/app/features/symbol-details/trader/trader-details/trader-details.component";
import { environment } from "src/environments/environment";

const oldwebsiteUrl: string = environment.oldwebsiteUrl;

@Component({
  selector: "app-top-gainer-table",
  templateUrl: './top-gainer-table.component.html',
  styleUrls: ["./top-gainer-table.component.css"],
})
export class TopGainerTableComponent implements OnInit, AfterViewInit {
  @Input()
  iconTitle: string;
  @Input()
  status: string;
  @Input()
  title: string;
  cols: any[];
  @Input()
  tableData: any[];
  selectedItem: any;
  viewMode: string;
  sStartDate: string;
  sEndDate: string;
  html = ``;
  isTableRowMouseover = false;

  constructor(
    private _localstorageHelper: LocalstorageHelper,
    private _router: Router,
    private modalService: BsModalService,
    private elementRef: ElementRef
  ) {}

  products = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1001",
      code: "nvklal433",
      name: "Black Watch",
      description: "Product Description",
      image: "black-watch.jpg",
      price: 72,
      category: "Accessories",
      quantity: 61,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "1002",
      code: "zz21cz3c1",
      name: "Blue Band",
      description: "Product Description",
      image: "blue-band.jpg",
      price: 79,
      category: "Fitness",
      quantity: 2,
      inventoryStatus: "LOWSTOCK",
      rating: 3,
    },
  ];

  ngOnInit() {
    const startDate = new Date();
    const endDate = new Date();

    startDate.setDate(startDate.getDate() - 180);

    this.sStartDate = this.toFormattedDate(startDate);
    this.sEndDate = this.toFormattedDate(endDate);

    this._localstorageHelper
      .getViewMode()
      .subscribe((mode) => (this.viewMode = mode));
    this.cols = [
      { field: "ticker", header: "Ticker" },
      { field: "close", header: "Price" },
      { field: "volume", header: "Vol" },
      { field: "percentChange", header: "%Chg" },
    ];
  }

  ngAfterViewInit() {
    // let table = this.elementRef.nativeElement.querySelector('.table-responsive');
    // console.log("Table", table.classList, table.className);
    // table.style.style.overflowX = 'unset';
    // (document.querySelector('table-responsive-wrap')[0] as HTMLElement).style.overflowX = 'unset';
    // (document.querySelector('.table-responsive')[0] as HTMLElement).style.minWidth = 'auto';
    // console.log(document.querySelector('table-responsive-wrap'))
  }

  onSymbolSelected(event, rowData) {
    if (event.target.tagName != "BUTTON") {
      window.location.href = "/stockchart/" + rowData;
    }
  }

  getTooltipHtml(selectedItem) {
    this.isTableRowMouseover = true;
    this.html = `<div class="chart-wapper"><div class="chart-loading"><i class="fas fa-3x fa-sync-alt fa-spin text-muted"></i></div>
    <img class="chart-img" src="${oldwebsiteUrl}/Chart.aspx?Provider=DB&Code=${
      selectedItem?.ticker
    }&Type=3&Scale=0&IND=AreaRSI(14){U};VOLMA(60);MACD(12,26,9)&OVER=MA(13);MA(50)&Skin=${
      this.viewMode === "light-mode" ? "GreenRed" : "Black"
    }&Size=520*400&RT=1&Start=${this.sStartDate}&End=${
      this.sEndDate
    }&Layout=2LineBlack;DefaultBlack;HisDate&Cycle=DAY1&HIS=0" width="100%"/></div>`;
  }

  onMouseLeave() {
    this.isTableRowMouseover = false;
  }

  toFormattedDate(date: Date) {
    const day =
      date.getDate() < 10 ? "0" + date.getDate() : "" + date.getDate();
    const tMonth = date.getMonth() + 1;

    const month = tMonth ? "0" + tMonth : "" + tMonth;

    return date.getFullYear() + month + day;
  }

  onBuyClick(symbol) {
    const initialState = { symbol, side: "buy" };
    this.modalService.show(TraderDetailsComponent, {
      class: "modal-xl",
      initialState,
    });
  }

  onSellClick(symbol) {
    const initialState = { symbol, side: "sell" };
    this.modalService.show(TraderDetailsComponent, {
      class: "modal-xl",
      initialState,
    });
  }
}
