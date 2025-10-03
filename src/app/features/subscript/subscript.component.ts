import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
// import {MatTooltipModule} from '@angular/material/tooltip';
import { AuthService } from "src/app/core/services/auth.service";
import { LoginService } from "src/app/core/services/login.service";
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
  RouterEvent,
} from "@angular/router";
import {
  PaymentRequestModel,
  SelectedSubscriptionPlan,
} from "src/app/core/models/stripe.model";
import { StripeAPIService } from "src/app/core/services/stripe-api.service";
import { environment } from "src/environments/environment";
import { LocalStorageConstants } from "src/app/core/constants/app.const";
import { Subject } from "rxjs";
import { userInfo } from "os";

@Component({
  selector: "app-subscript",
  templateUrl: "./subscript.component.html",
  styleUrls: ["./subscript.component.css"],
})
export class SubscriptComponent implements OnInit, OnDestroy, AfterViewInit {
  public destroyed = new Subject<any>();
  showTrialSub: boolean = true;
  tiers_mode: string = "";
  popup = true;
  radio_btn = "Month";
  radio_btn_mobile = "Free";
  email: string = "";
  trialStartDate: string = "Trial taken";
  public isLoading: boolean = false;
  itemsPerSlide = 3;

  first: boolean = true;
  second: boolean = false;
  third: boolean = false;
  fourth: boolean = true;
  fifth: boolean = true;
  disabled: boolean = true;
  activeAccordian = { id: 1, img: "/assets/dist/img/chart-1.png" };

  responsiveOptions = [
    {
      breakpoint: "1199",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "1024px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  testimonials = [
    {
      title: "Jane T.",
      subtitle: "California",
      content:
        "I've used TruCharts for over a year. Its real-time data transformed my trading strategy. The customizable indicators give me a competitive edge. Highly recommended!",
    },
    {
      title: "David S.",
      subtitle: "Ohio",
      content:
        "TruCharts advanced features, including backtesting and predictive analytics, have shaped my investment strategies. Invaluable for my investment funds. ",
    },
    {
      title: "Emily H.",
      subtitle: "Texas",
      content:
        "TruCharts is essential for my day trading. The real-time market data and unlimited indicators ensures I never miss an opportunity. It's a competitive advantage in the fast-paced trading world.",
    },
    {
      title: "Alex B.",
      subtitle: "New York",
      content:
        "Trucharts features for analyzing trends and historical data have been a game-changer for me. They have boosted my confidence in my trades resulting in noticeable improvements in my portfolio.",
    },
  ];

  constructor(
    private _router: Router,
    public authService: AuthService,
    private loginService: LoginService,
    private stripeAPIService: StripeAPIService,
    private route: ActivatedRoute
  ) {
    this.email = authService.userName;
    this.GetTrialSubscription();
  }
  freeSubscribe = 0;
  standard_monthly = 29;
  premium_monthly = 49;
  standard_yearly =
    this.standard_monthly * 12 - 0.2 * this.standard_monthly * 12;
  premium_yearly = this.premium_monthly * 12 - 0.2 * this.premium_monthly * 12;
  selectedPriceId: string = "";
  CurrentPrice_id: string = "";

  ngOnInit(): void {
    this.invokeStripe();
    // put the code from `ngOnInit` here
    let plan = localStorage.getItem(
      LocalStorageConstants.SelectedSubscriptionPlan
    );
    // important commented for subscribe page loading login popup appear
    /* if (plan && plan != null && plan != undefined) {
       localStorage.removeItem(LocalStorageConstants.SelectedSubscriptionPlan);
       let selectedPlan: SelectedSubscriptionPlan = JSON.parse(plan);
       if (selectedPlan) {
         setTimeout(() => {
           this.makePayment(selectedPlan.amount, selectedPlan.priceId);
         }, 700);
       }
     } */
  }

  ngAfterViewInit(): void {
    this.route.params.subscribe((params) => {
      if (params["section"]) {
        document.getElementById(params["section"]).scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        // document.getElementById("pricing").scrollIntoView({ behavior: "smooth" });
        // this.scrollToSubscription();
      }
    });
  }

  paymentHandler: any = null;

  log(isOpened: boolean) {
    console.log(isOpened);
  }

  makePayment(amount: any, priceId: string) {
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

  invokeStripe() {
    if (!window.document.getElementById("stripe-script")) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: environment.StripePublishableKey,
          locale: "auto",
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert("Payment has been successfull!");
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }

  confirmCardPayment(stripeToken: any, amount: number) {
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

  doRegister(amount: any, priceId: string) {
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

  routeToHome() {
    this._router.navigate(["/"]);
  }

  GetTrialSubscription() {
    this.stripeAPIService.GetTrialSubscription().subscribe((res) => {
      if (res && res.SubscriptionId) {
        console.log("Check", res);
        this.showTrialSub = false;
        this.trialStartDate =
          "Trial taken on " +
          this.toFormattedDate(new Date(res.current_period_start));
        this.GetSubscription();
      }
    });
  }

  GetSubscription() {
    this.stripeAPIService.GetSubscription().subscribe((res) => {
      console.log("resssss", res);
      if (res && res.SubscriptionId) {
        this.CurrentPrice_id = res.price_id;
        // this.tiers_mode = res.tiers_mode;
      }
    });
  }

  toFormattedDate(date: Date) {
    const day =
      date.getDate() < 10 ? "0" + date.getDate() : "" + date.getDate();
    const tMonth = date.getMonth() + 1;

    const month = tMonth ? "0" + tMonth : "" + tMonth;

    return day + "-" + month + "-" + date.getFullYear();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  scrollToSubscription() {
    document.getElementById("pricing").scrollIntoView({ behavior: "smooth" });
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
}
