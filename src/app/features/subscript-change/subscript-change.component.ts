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
import { PriceTag } from "src/app/core/constants/app.const";
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
import { error } from "console";

@Component({
  selector: "app-subscript-change",
  templateUrl: "./subscript-change.component.html",
  styleUrls: ["./subscript-change.component.css"],
})
export class SubscriptChangeComponent implements OnInit, OnDestroy, AfterViewInit {
  public destroyed = new Subject<any>();
  showTrialSub: boolean = true;
  tiers_mode: string = "";
  popup = true; 
  radio_btn_mobile = "Free";
  email: string = "";
  trialStartDate: string = "Trial taken";
  public isLoading: boolean = false;
  public itemsPerSlide = 3;
  public priceTag = PriceTag;
  public disabled: boolean = true;

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

  invoiceData = [];

  // Column headers
  invoiceColumns = ['Invoice#', 'Date', 'Time', 'Quantity', 'Price'];

  constructor(
    private _router: Router,
    public authService: AuthService,
    private loginService: LoginService,
    private stripeAPIService: StripeAPIService,
    private route: ActivatedRoute
  ) {
    this.email = authService.userName;
    this.GetTrialSubscription();
    this.GetSubscription();
    this.GetAllInvoices();
  }
  freeSubscribe = 0;
  standard_monthly = 29;
  premium_monthly = 49;
  standard_yearly = this.standard_monthly * 12 - 0.2 * this.standard_monthly * 12;
  premium_yearly = this.premium_monthly * 12 - 0.2 * this.premium_monthly * 12;
  selectedPriceId: string = "";
  CurrentPrice_id: string ="";

  ngOnInit(): void {
    this.invokeStripe();
    // put the code from `ngOnInit` here
    let plan = localStorage.getItem(
      LocalStorageConstants.SelectedSubscriptionPlan
    );    
  }

  ngAfterViewInit(): void {
    this.route.params.subscribe((params) => {
      if (params["section"]) {
        document.getElementById(params["section"]).scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });        
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
    console.log(paymentHandler);
    paymentHandler.open({
      name: "Trucharts.com",
      email: this.email,
      description: "Payment",
      amount: amount * 100,
      allowRememberMe : false,
      billingAddress: false,
      paymentMethods:['card', 'eps'],
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
    if(!this.authService.isLoggedIn)
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

  GetAllInvoices() {
    this.stripeAPIService.GetAllInvoices().subscribe((res) => {
      if (res ) {
        res.invoices.data.forEach(item=>{
          const date = new Date(item.created * 1000);
          const month = ('0' + (date.getMonth() + 1)).slice(-2);
          const day = ('0' + date.getDate()).slice(-2);
          const hours = ('0' + date.getHours()).slice(-2);
          const minutes = ('0' + date.getMinutes()).slice(-2);
          const seconds = ('0' + date.getSeconds()).slice(-2);
          this.invoiceData.push({
            id : item.number,date:`${day}/${month}/${date.getFullYear()}`, 
            time: `${hours}:${minutes}:${seconds}`,
            price: item.total,
            quantity:item.lines.data[0].quantity,
            invoice_pdf:item.invoice_pdf
          });
        });       
      }
    }, (error)=>{});
  }

  GetSubscription() {
    this.stripeAPIService.GetSubscription().subscribe((res) => {
      //console.log("resssss", res);
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
  downloadFile(item: any): void {
    // Create a URL for the Blob
    const url = item.invoice_pdf;

    // Create an anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json'; // Set the file name
    document.body.appendChild(a);

    // Trigger the download
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  
}
