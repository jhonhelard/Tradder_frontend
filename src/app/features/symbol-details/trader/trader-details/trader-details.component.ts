import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { ClassOption, ClassOptions, DurationOption, SideOption, TypeOption } from 'src/app/core/constants/app.const';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { ITruchartsCompanyModel } from 'src/app/core/models/trucharts-company.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { GeneralService } from 'src/app/core/services/general.service';

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit, OnDestroy {
  @Input() symbol: string;
  @Input() quantity: any;
  @Input() side: any;
  @Input() type: any;
  @Input() duration: any;

  public isLoggedIn: boolean;
  public subscribtion: Subscription;
  public tickets: any[]=[];
  results: Observable<ITruchartsCompanyModel[]>;

  submitted = false;
  classOptions: any[] = ClassOptions;
  classOption: any = ClassOption;
  typeOption: any = TypeOption;
  durationOption: any = DurationOption;
  sideOption: any = SideOption;
  activeIndex: number = 0;

  traderDetailsBuySellForm = new FormGroup({
    class: new FormControl('', Validators.required),
    symbol: new FormControl('')
  });
  autocomplete: any;

  constructor(private _generalService: GeneralService, private _router: Router, private modalService: BsModalService, private toastr: ToastrService, public bsModalRef: BsModalRef, private localstorageHelper: LocalstorageHelper, private authService: AuthService) {
    this.traderDetailsBuySellForm.get('symbol').valueChanges.subscribe(symbol => {
      console.log(symbol)
    })
    console.log(this.symbol)

  }

  ngOnInit(): void {
    this.traderDetailsBuySellForm.get("symbol").setValue({ ticker: this.symbol });
    this.traderDetailsBuySellForm.get("class").setValue(this.classOption.EquityOrder);
    this.subscribtion = this.modalService.onShown.subscribe((data: any) => {
      if (this.authService.isLoggedIn) {
        const cred = this.localstorageHelper.getloginToTradier();
        if (!cred.TradierAccountNo) {
          this.authService.doAuthorization(false, "rendone1234", (data) => {
            this.isLoggedIn = true;
          });
        }
        else {
          this.isLoggedIn = true;
        }
      } else {
        this.toastr.warning('Please login first', 'Login');
        setTimeout(() => {
          this.bsModalRef.hide();
        }, 100)
      }
    })
  }

  orderSubmittedCb = (selectTab?: any) => {
    if (selectTab > -1) {
      this.activeIndex = selectTab;
    }
  }

  sendToTickets = (tickets) => {
    this.activeIndex = 0;
    this.traderDetailsBuySellForm.get("class").setValue(this.classOption.MultilegOrder);
    this.tickets=tickets;
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
  }

  search(event) {
    if (event.type === 'keyup') return;
    this.results = this._generalService.getSearchCompanies(event.query);
  }

  analyze() {
  }

  onKeyUp(event) {
    if (event.key === 'Enter') {
      this.clearSuggestions();
      this.clearInput();
      this.autocomplete.hide();
      this._router.navigate(['/stockchart/' + event.target.value]);
    }
  }

  clearSuggestions() {
  }

  clearInput() {
  }

  onSelect(event) {
    console.log(event)
  }
}
