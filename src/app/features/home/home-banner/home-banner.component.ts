import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/core/services/general.service';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ITruchartsCompanyModel } from 'src/app/core/models/trucharts-company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {
  text: string;
  results: Observable<ITruchartsCompanyModel[]>;
  //results: ITruchartsCompanyModel[];

  constructor(private _generalService: GeneralService, private _router: Router) { }
  showPopup: boolean = false;
  ngOnInit(): void {
    // setTimeout(() => {
    //   this.showPopup = true;
    //  }, 45000);
  }
  closePopup() {
    this.showPopup = false;
  }


  search(event) {
    // this.results = this._generalService.getSearchCompanies(event.query).pipe(switchMap(data => {
    //   return of(data);
    // }));
    this.results = this._generalService.getSearchCompanies(event.query);
  }

  onSelect(event){
    this._router.navigate(['/stockchart/' + event.ticker]);
  }

  onKeyUp(event) {
    if (event.key === 'Enter')
      this._router.navigate(['/stockchart/' + this.text]);
  }

  analyze() {
    this._router.navigate(['/stockchart/' + this.text]);
  }
}
