import { Component, OnInit } from '@angular/core';
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-overley-pannel',
  templateUrl: './overley-pannel.component.html',
  styleUrls: ['./overley-pannel.component.css']
})
export class OverleyPannelComponent implements OnInit {
  selectedItem: any;
  oldwebsiteUrl: string = environment.oldwebsiteUrl;
  constructor() { }

  ngOnInit(): void {
  }

}
