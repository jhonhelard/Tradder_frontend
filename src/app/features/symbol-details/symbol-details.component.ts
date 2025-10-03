import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { ITradierSymbol } from 'src/app/core/models/tradier-symbol.model';
import { ITruchartsCompanyModel } from 'src/app/core/models/trucharts-company.model';
import { GeneralService } from 'src/app/core/services/general.service';
import { SymbolHeaderComponent } from './symbol-header/symbol-header.component';
import { SymbolRealtimeNewsComponent } from './symbol-realtime-news/symbol-realtime-news.component';
import { SymbolTableContentComponent } from './symbol-table-content/symbol-table-content.component';

@Component({
  selector: 'app-symbol-details',
  templateUrl: './symbol-details.component.html',
  styleUrls: ['./symbol-details.component.css']
})
export class SymbolDetailsComponent implements OnInit, AfterViewInit {
  symbol: ITradierSymbol;
  selectedSymbol: string = 'TSLA'; // Initialize selectedSymbol here
  isshow = true;
  wait500MS: boolean = false;
  searchCompanyResults: Observable<ITruchartsCompanyModel[]>;

  @ViewChild(SymbolRealtimeNewsComponent) symbolNews: SymbolRealtimeNewsComponent;
  @ViewChild(SymbolHeaderComponent) symbolHeader: SymbolHeaderComponent;
  @ViewChild(SymbolTableContentComponent) symbolTableContent: SymbolTableContentComponent;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _generalService: GeneralService,
    private _localstorageHelper: LocalstorageHelper,
    private _router: Router
  ) {}

  ngOnInit(): void {
    $('html, body').animate({ scrollTop: 0 }, 500);

    this._activatedRoute.paramMap.subscribe(params => {
      const parmId = params.get('id');
      this.changeSymbol(parmId);

      this._generalService.getQuotes(parmId).subscribe((data: any) => {
        this._generalService.getSearchCompanies(parmId).subscribe(res => {
          if (res && res.length > 0) {
            this._localstorageHelper.setLatestViewedSymbol(parmId);
          } else {
            const s = this._localstorageHelper.getLatestViewedSymbol();
            this._router.navigate(['/stockchart/' + s]);
          }
        });

        this.symbol = <ITradierSymbol>data.quotes?.quote;
        if (this.symbol.open == 0 || this.symbol.high == 0 || this.symbol.low == 0 || this.symbol.close == 0 || this.symbol.volume == 0 || this.symbol.change == 0) {
          this._generalService.getReplaceQuotes(params.get('id')).subscribe((res: ITradierSymbol) => {
            this.symbol = {
              ...this.symbol,
              open: res.open,
              high: res.high,
              low: res.low,
              close: res.close,
              volume: res.volume,
              change: res.change
            };
          });
        }
        this.symbolNews?.loadNews(this.selectedSymbol || this.symbol.symbol);

        this.symbolHeader?.reloadPrice();
        this.symbolTableContent?.reloadTable(this.symbol);
      });
    });
  }

  ngAfterViewInit(): void {
    // Any logic needed after view initialization
  }

  changeSymbol(newSymbol: string) {
    this.selectedSymbol = newSymbol;
  }
}
