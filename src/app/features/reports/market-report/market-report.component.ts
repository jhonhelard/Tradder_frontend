import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ReportService } from 'src/app/core/services/report.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-market-report',
  templateUrl: './market-report.component.html',
  styleUrls: ['./market-report.component.css']
})
export class MarketReportComponent implements OnInit {

  public isLoading: boolean;
  columns: string[] = [];
  columnsStockList: string[] = [];
  data: any[] = [];
  defaultLoadData: boolean = false;
  public viewMode: string = '';
  IsLogin: boolean = false;
  dataMarketReportStockList: any[] = [];
  oldwebsiteUrl: string = environment.oldwebsiteUrl;
  showReport: string = 'MarketReport'
  
  constructor(private service: ReportService,
    private authService: AuthService,
    private loginService: LoginService,
    private localstorageHelper: LocalstorageHelper,) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      this.loginService.showLoginForm();
      return;
    }
    this.IsLogin = true;
    this.viewMode = '';
    this.localstorageHelper.getViewMode().subscribe(mode => this.viewMode = mode);
    this.GetMarketReport();
  }

  GetMarketReport() {
    this.showReport = 'MarketReport';
    this.isLoading = true;
    this.service.GetMarketReport().subscribe(response => {
      this.data = response;
      if (this.data.length > 0)
        this.columns = Object.getOwnPropertyNames(this.data[0]);

      let index = this.columns.indexOf('ConditionId');
      if (index > -1)
        this.columns.splice(index, 1);

      this.isLoading = false;
      this.defaultLoadData = true;
    });
  }

  GetStockList(reportType: string){
    this.showReport = 'MarketStockReport';
    this.service.GetMarketReportStockList(reportType).subscribe(response => {
      this.dataMarketReportStockList = response;
      if (response && response.length > 0) 
        this.columnsStockList = Object.getOwnPropertyNames(this.dataMarketReportStockList[0]);
      this.defaultLoadData = true;
      this.isLoading = false;
    });
  }

  getTooltipHtml(selectedItem) {
   let datePipe = new DatePipe('en-US');
    let today = new Date();
    const end = datePipe.transform(new Date(), 'yyyyMMd');
    const start_date = today.setMonth(today.getMonth() - 6);
    const start = datePipe.transform(start_date, 'yyyyMMd');

    return `<div class="chart-wapper">
              <div class="chart-loading">
                <i class="fas fa-3x fa-sync-alt fa-spin text-muted"></i>
              </div>    
              <img class="chart-img" src="${this.oldwebsiteUrl}/Chart.aspx?Provider=DB&Code=${selectedItem?.QuoteCode}&Type=3&Scale=0&IND=AreaRSI(14){U};VOLMA(60);MACD(12,26,9)&OVER=MA(13);MA(50)&Skin=${this.viewMode === 'light-mode' ? 'GreenRed' : 'Black'}&Size=520*400&RT=1&Start=${start}&End=${end}&Layout=2Line;Default;Price;HisDate&Cycle=DAY1&HIS=0" width="100%"/>
            </div>`;
  }

  reloadData() {
    if (this.authService.isLoggedIn) {
      this.IsLogin = true;
      this.localstorageHelper.getViewMode().subscribe(mode => this.viewMode = mode);
      this.GetMarketReport();
    } else {
      this.loginService.showLoginForm();
      return false;
    }
  }


}
