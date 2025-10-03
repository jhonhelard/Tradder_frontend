import { Component, OnInit } from '@angular/core';
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-right-banner',
  templateUrl: './right-banner.component.html',
  styleUrls: ['./right-banner.component.css']
})
export class RightBannerComponent implements OnInit {
  oldwebsiteUrl: string = environment.oldwebsiteUrl;
  constructor() { }

  ngOnInit(): void {
  }

  onHeatImgClick() {
    window.open(
      `${this.oldwebsiteUrl}/heatmap.aspx`, "_blank");
  }

}
