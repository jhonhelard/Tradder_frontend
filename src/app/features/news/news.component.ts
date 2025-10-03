import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { IStockNewsModel } from 'src/app/core/models/stock-news.model';
import { ITicketModel } from 'src/app/core/models/ticket.model';
import { GeneralService } from 'src/app/core/services/general.service';
import { StockService } from 'src/app/core/services/stock.service';
import { environment } from 'src/environments/environment';
import { HttpClient  } from '@angular/common/http';
import { data } from 'jquery';

interface NewsItem {
  date: string;
  title: string;
  content: string;
  link: string;
 
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsItems: NewsItem[] = [];

  @ViewChild('.owl-carousel.news--slider') ewsSlider: ElementRef;

  listNews: IStockNewsModel[] = [];
  listTrending: ITicketModel[] = [];
  listTopGainer: ITicketModel[] = [];
  listTopGainerMobile: any = [];
  listTopLoser: ITicketModel[] = [];
  listTopLoserMobile: any = [];
  viewMode: string = '';
  html: any = ``;
  sStartDate: string = '';
  sEndDate: string = '';
  oldwebsiteUrl: string = environment.oldwebsiteUrl;
  sliderNewsOptions: OwlOptions = {
    dots: false,
    loop: true,
    margin: 20,
    nav: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      767: {
        items: 1
      },
      768: {
        items: 2
      },
      1200: {
        items: 3
      },
      1550: {
        items: 4
      }
    }
  };
  sliderTrendingOptions: OwlOptions = {
    dots: false,
    loop: true,
    margin: 20,
    nav: false,
    autoplay: false,
    responsive: {
      0: {
        items: 1
      },
      767: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 4
      },
      1550: {
        items: 5
      }
    }
  };

  sliderTrendingMobileOptions: OwlOptions = {
    dots: false,
    loop: true,
    margin: 20,
    nav: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      767: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 4
      },
      1550: {
        items: 5
      }
    }
  };

  constructor(
    private _generalService: GeneralService,
    private _stockService: StockService,
    private _localstorageHelper: LocalstorageHelper,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getListNews();
    this.getlistTrending();
    this.getlistTopGainer();
    this.getlistTopLoser();
    this.getNews();
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() - 90);
    this.sStartDate = this.toFormattedDate(startDate);
    this.sEndDate = this.toFormattedDate(endDate);
    this._localstorageHelper
      .getViewMode()
      .subscribe((mode) => (this.viewMode = mode));
  }

  getNews(): void {
    const symbol = 'AAPL'; // Example symbol, can be made dynamic    
    this.http.get<NewsItem[]>(`https://trucharts.net/api/proxy/get-news?symbol=${symbol}`).subscribe(
      
      (data) => {
        this.newsItems = data;
        console.log(data[0])
      },
      (error) => {
        console.error('Error fetching news:', error);
      }
    );
  
  }

  getListNews() {
    this._generalService.getStockNews().subscribe(data => {
      this.listNews = data.filter((item, idx) => idx < 5).map(x => {
        if (x.Title.length > 120)
          x.Title = x.Title.substr(0, 120) + "...";
        return x;
      });
      console.log('news =>', this.listNews);
    });
  }

  getlistTrending() {
    this._stockService.getTopActive().subscribe(data => {
      this.listTrending = data.map(x => {
        x.changePercent *= 100
        x.changePercent = Number(x.changePercent.toFixed(2));
        return x;
      });
      console.log('trending =>', this.listTrending);
    });
  }

  getlistTopGainer() {
    this._stockService.getTopGainer().subscribe(data => {
      this.listTopGainer = data.map(x => {
        x.changePercent *= 100
        x.changePercent = Number(x.changePercent.toFixed(2));
        return x;
      });

      this.listTopGainerMobile = this.chunk(data, 5);
      console.log('top gainer mobile =>', this.listTopGainerMobile);
      
    });
  }

  getlistTopLoser() {
    this._stockService.getTopLooser().subscribe(data => {
      this.listTopLoser = data.map(x => {
        x.changePercent *= 100
        x.changePercent = Number(x.changePercent.toFixed(2));
        return x;
      });

      this.listTopLoserMobile = this.loserChunk(data, 5);
      console.log('top loser mobile =>', this.listTopLoserMobile);
    });
  }

  getTooltipHtml(selectedItem: any) {
    console.log(selectedItem);
    
    this.html = `<div class="chart-wapper"><div class="chart-loading"><i class="fas fa-3x fa-sync-alt fa-spin text-muted"></i></div>
    <img class="chart-img" src="${this.oldwebsiteUrl}/Chart.aspx?Provider=DB&Code=${selectedItem?.symbol}&Type=3&Scale=0&IND=AreaRSI(14){U};VOLMA(60);MACD(12,26,9)&OVER=MA(13);MA(50)&Skin=${this.viewMode === 'light-mode' ? 'GreenRed' : 'Black'}&Size=520*400&RT=1&Start=${this.sStartDate}&End=${this.sEndDate}&Layout=2LineBlack;DefaultBlack;HisDate&Cycle=DAY1&HIS=0" width="100%"/></div>`;
  }

  chunk(array, chunk_size){
    if(array.length == 0) return [];
    else return [array.splice(0, chunk_size)].concat(this.chunk(array, chunk_size))
  }

  loserChunk(array, chunk_size){
    if(array.length == 0) return [];
    else return [array.splice(0, chunk_size)].concat(this.loserChunk(array, chunk_size))
  }

  toFormattedDate(date: Date) {
    const day =
      date.getDate() < 10 ? "0" + date.getDate() : "" + date.getDate();
    const tMonth = date.getMonth() + 1;
    const month =
      tMonth ? "0" + tMonth : "" + tMonth;
    return date.getFullYear() + month + day;
  }

}
