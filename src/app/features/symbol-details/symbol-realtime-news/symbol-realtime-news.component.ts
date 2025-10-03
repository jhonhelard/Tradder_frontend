import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GeneralService } from 'src/app/core/services/general.service';

@Component({
  selector: 'app-symbol-realtime-news',
  templateUrl: './symbol-realtime-news.component.html',
  styleUrls: ['./symbol-realtime-news.component.css']
})
export class SymbolRealtimeNewsComponent implements OnChanges {
  @Input() symbol: string = '';
  newsData: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private generalService: GeneralService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.symbol && changes.symbol.currentValue) {
      this.loadNews(this.symbol);
    }
  }

  loadNews(symbol: string) {
    this.loading = true;
    this.newsData = [];  // Clear previous data if any
    this.errorMessage = '';

    this.generalService.getNews(symbol).subscribe(
      (data) => {
        console.log('News data:', data);
        
        // Assuming the response is an array directly
        this.newsData = data.length > 0 ? data : [];
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching news:', error);
        this.errorMessage = 'Could not load news. Please try again later.';
        this.loading = false;
      }
    );
  }
}
