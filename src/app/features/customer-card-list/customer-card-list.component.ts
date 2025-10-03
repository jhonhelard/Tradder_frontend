import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Location } from '@angular/common';
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
import { error } from "console";

@Component({
  selector: "app-customer-card-list",
  templateUrl: "./customer-card-list.component.html",
  styleUrls: ["./customer-card-list.component.css"],
})
export class CustomerCardsComponent implements OnInit, OnDestroy, AfterViewInit {

  public destroyed = new Subject<any>();
  showTrialSub: boolean = true;
  tiers_mode: string = "";
  popup = true; 
  radio_btn_mobile = "Free";
  email: string = "";
  trialStartDate: string = "Trial taken";
  public isLoading: boolean = false;
  public itemsPerSlide = 3;
  public disabled: boolean = true;
  private elements:any;
  public creatingcard:boolean = false;
  public cardCreationVisible:boolean = false;
  private stripejs:any;
  private cardNumberElement:any;

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

  cardsData = [];

  constructor(
    private _router: Router,
    public authService: AuthService,
    private loginService: LoginService,
    private stripeAPIService: StripeAPIService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.email = authService.userName;
    this.GetAllCards();
  }

  ngOnInit(): void {
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

 
  routeToHome() {
    if(!this.authService.isLoggedIn)
      this._router.navigate(["/"]);
  }
  deleteCard(card:any){
    this.stripeAPIService.removeCard(card).subscribe((res) => {
        alert('Card removed successfully!');
        this.reloadPage();
    }, (error)=>{});
  }
  
  GetAllCards() {
    this.stripeAPIService.GetAllCards().subscribe((res) => {
      if (res ) {
        //for(let i=0; i<3; i++)
        res.cards.data.forEach(item=>{
          this.cardsData.push({
            cardId: item.id,
            cardHolder : item.name, 
            brand: `${item.brand.toLowerCase()}`,
            cardNumber: `**** **** **** ${item.last4}`,
            expiryDate: `${item.exp_month}/${item.exp_year}`,
          });
        });       
      }
    }, (error)=>{});
  }
  addCard() {
    //throw new Error('Method not implemented.');
    this.invokeStripe();
  }
  invokeStripe() {
    if (!window.document.getElementById("stripe-script")) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://js.stripe.com/v3";
      script.onload = () => {
        this.stripejs = new (<any>window).Stripe(environment.StripePublishableKey);
        this.elements = this.stripejs.elements();
       
        //var cardElement = this.elements.create('card');
        //cardElement.mount("#card-element");        
        
        this.creatingcard = true;
        this.cardNumberElement = this.createElement('cardNumber');
        var cardExpiryElement = this.createElement('cardExpiry');
        var cardCvcElement = this.createElement('cardCvc');
        setTimeout(() => {this.cardCreationVisible = true;}, 400);
      };

      window.document.body.appendChild(script);
    }
  }
  private createElement(elementName: string): any {
    var style = {
      base: {
          'lineHeight': '2.0',
          'fontSize': '2rem',
          'color': '#495057',
          'fontFamily': 'apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
      }
  };
    const control = this.elements.create(elementName,{'style': style});
    control.mount('#'+elementName);
    //control.addEventListener('change', function() {debugger});
    return control;
  }
  public submitCard() : void{
    let _this = this;
    this.stripejs.createToken(this.cardNumberElement).then(function(result) {
      // Handle result.error or result.token
      if(result.token) {
          console.log(result.token); 
          _this.stripeAPIService.createCard(result.token.id).subscribe((res) => {
            alert('Card created successfully!');
            _this.reloadPage();
          }, (error)=>{
            alert('Card is not created!');
          });
        }
        if(result.error) {
          alert(result.error.message)
        }
    });
  }
  reloadPage(): void {
    this.location.go(this.location.path());
    window.location.reload();
  }
    ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
 
  
}
