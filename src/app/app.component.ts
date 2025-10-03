import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalstorageHelper } from './core/helpers/localstorage.helper';

// declare ga as a function to access the JS code in TS
declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Trucharts | Technical Stock charts | Stock Screener | Backtesting | Earnings | Dividend';

  constructor(private _localstorageHelper: LocalstorageHelper, public router: Router) {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    //this._localstorageHelper.loadViewMode();
  }
}
