import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component copy.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  activeAccordian = { id: 1, img: "/assets/dist/img/chart-1.png" };
  first: boolean = true;
  second: boolean = false;
  third: boolean = false;
  fourth: boolean = true;
  fifth: boolean = true;
  disabled: boolean = true;

  constructor(
    public _authService: AuthService,
  ) { }

  ngOnInit(): void {
    /* window.open("https://trucharts.com/home#lepopup-trading"); */
    document.documentElement.classList.add('new-layout');
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

  get isLoggedIn() {
    return this._authService.isLoggedIn;
  }

  ngOnDestroy(): void {
    document.documentElement.classList.remove('new-layout');
  }

}
