import { Component, OnInit } from "@angular/core";
import { LocalstorageHelper } from "src/app/core/helpers/localstorage.helper";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-home-chart",
  templateUrl: "./home-chart.component.html",
  styleUrls: ["./home-chart.component.css"],
})
export class HomeChartComponent implements OnInit {
  viewMode: string;
  sStartDate: string;
  sEndDate: string;
  oldwebsiteUrl: string = environment.oldwebsiteUrl;
  constructor(private _localstorageHelper: LocalstorageHelper) {}

  ngOnInit(): void {
    const startDate = new Date();
    const endDate = new Date();

    startDate.setDate(startDate.getDate() - 90);

    this.sStartDate = this.toFormattedDate(startDate);
    this.sEndDate = this.toFormattedDate(endDate);

    this._localstorageHelper
      .getViewMode()
      .subscribe((mode) => (this.viewMode = mode));
  }

  toFormattedDate(date: Date) {
    const day =
      date.getDate() < 10 ? "0" + date.getDate() : "" + date.getDate();
    const tMonth = date.getMonth() + 1;

    const month =
      tMonth ? "0" + tMonth : "" + tMonth;

    return date.getFullYear() + month + day;
  }
}
