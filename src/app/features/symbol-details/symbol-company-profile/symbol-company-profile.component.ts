import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITradierSymbol } from 'src/app/core/models/tradier-symbol.model';
import { GeneralService } from 'src/app/core/services/general.service';

@Component({
  selector: 'app-symbol-company-profile',
  templateUrl: './symbol-company-profile.component.html',
  styleUrls: ['./symbol-company-profile.component.css']
})
export class SymbolCompanyProfileComponent implements OnInit {
  showPopup: boolean = false;
  companyProfile: string;
  marketCapitalization: string; // Variable to hold market capitalization
eps: string;
peRatio: string;
beta: string;
EBIDTA: string;
  constructor(private _generalService: GeneralService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this._generalService.GetMarketCap(params.get('id')).subscribe(data => {
        // if (!!data && data.length > 0 && !!data[0].results && data[0].results.length > 2)
        //   this.companyProfile = data[0].results[2].tables?.long_descriptions;
        this.companyProfile = data.description;
        // setTimeout(() => {
        //   this.showPopup = true;
        //  }, 45000);
      });
    })
  }
  closePopup() {
    this.showPopup = false;
  }
}
