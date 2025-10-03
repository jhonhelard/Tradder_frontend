import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from "src/environments/environment";
import { LocalStorageConstants } from "src/app/core/constants/app.const";
import { ITruchartsCompanyModel } from 'src/app/core/models/trucharts-company.model';
import { PaymentRequestModel, SelectedSubscriptionPlan } from "src/app/core/models/stripe.model";

import { GeneralService } from 'src/app/core/services/general.service';
import { AuthService } from "src/app/core/services/auth.service";
import { LoginService } from "src/app/core/services/login.service";
import { StripeAPIService } from "src/app/core/services/stripe-api.service";
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  activeAccordian = { id: 1, img: "/assets/dist/img/chart-1.png" };
  first: boolean = true;
  second: boolean = false;
  third: boolean = false;
  fourth: boolean = true;
  fifth: boolean = true;
  disabled: boolean = true;
  text: string;
  results: Observable<ITruchartsCompanyModel[]>;

  // Pricing
  isLoading: boolean = false;
  showTrialSub: boolean = true;
  email: string = "";
  freeSubscribe = 0;
  standard_monthly = 15;
  premium_monthly = 20;
  standard_yearly = this.standard_monthly * 12 - 0.2 * this.standard_monthly * 12;
  premium_yearly = this.premium_monthly * 12 - 0.2 * this.premium_monthly * 12;
  selectedPriceId: string = "";
  CurrentPrice_id: string = "";
  sliderTestiOptions: OwlOptions = {
    dots: false,
    loop: true,
    margin: 20,
    nav: false,
    autoplay: true,
    stagePadding: 120,
    responsive: {
      0: {
        items: 1,
        stagePadding: 0
      },
      375: {
        items: 1,
        stagePadding: 0
      },
      768: {
        items: 2,
        stagePadding: 50
      },
      992: {
        items: 2
      },
      1200: {
        items: 2
      },
      1400: {
        items: 3
      }
    }
  };

  constructor(
    public authService: AuthService,
    private loginService: LoginService,
    private _generalService: GeneralService,
    private stripeAPIService: StripeAPIService,
    private _router: Router
  ) {
    this.email = authService.userName;
  }

  ngOnInit(): void {
    /* window.open("https://trucharts.com/home#lepopup-trading"); */
    document.documentElement.classList.add('new-layout');
  }

  search(event) {
    // this.results = this._generalService.getSearchCompanies(event.query).pipe(switchMap(data => {
    //   return of(data);
    // }));
    this.results = this._generalService.getSearchCompanies(event.query);
  }

  onSelect(event) {
    this._router.navigate(['/stockchart/' + event.ticker]);
  }

  onKeyUp(event) {
    if (event.key === 'Enter')
      this._router.navigate(['/stockchart/' + this.text]);
  }

  onChangeAccordian(value, id) {
    if (!value) return;

    switch (id) {
      case 1:
        this.activeAccordian = { id, img: "/assets/dist/img/chart-1.png" };
        break;
      case 2:
        this.activeAccordian = { id, img: "/assets/dist/img/chart-2.png" };
        break;
      case 3:
        this.activeAccordian = { id, img: "/assets/dist/img/chart-3.png" };
        break;
      case 4:
        this.activeAccordian = { id, img: "/assets/dist/img/chart-4.png" };
        break;
      case 5:
        this.activeAccordian = { id, img: "/assets/dist/img/chart-5.png" };
        break;
      default:
        break;
    }
  }

  public doRegister(amount: any, priceId: string) {
    let selectedPlan: SelectedSubscriptionPlan = {
      amount: amount,
      priceId: priceId,
    };
    localStorage.setItem(
      LocalStorageConstants.SelectedSubscriptionPlan,
      JSON.stringify(selectedPlan)
    );
    this.loginService.showRegisterForm();
  }

  public makePayment(amount: any, priceId: string) {
    this.selectedPriceId = priceId;
    if (!this.authService.isLoggedIn) {
      let selectedPlan: SelectedSubscriptionPlan = {
        amount: amount,
        priceId: priceId,
      };
      localStorage.setItem(
        LocalStorageConstants.SelectedSubscriptionPlan,
        JSON.stringify(selectedPlan)
      );
      this.loginService.showLoginForm();
      return;
    }

    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: environment.StripePublishableKey,
      locale: "auto",
      token: (stripeToken: any) => {
        console.log(stripeToken);
        this.confirmCardPayment(stripeToken, amount);
        // window.location.replace("http://localhost:4200/success");
      },
    });

    paymentHandler.open({
      name: "Trucharts.com",
      email: this.email,
      description: "Payment",
      amount: amount * 100,
      stripeAccount: "price_1MP8T8CRmDTwTgcmxHLZx824",
    });
  }

  public confirmCardPayment(stripeToken: any, amount: number) {
    let param: PaymentRequestModel = {
      priceId: this.selectedPriceId,
      stripeToken: stripeToken.id,
    };
    this.isLoading = true;
    this.stripeAPIService.confirmCardPayment(param).subscribe(
      (response) => {
        this.isLoading = false;
        this.showTrialSub = false;
        this._router.navigate(["/success"]);
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    document.documentElement.classList.remove('new-layout');
  }

}
