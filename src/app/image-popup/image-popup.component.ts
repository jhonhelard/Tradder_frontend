import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.css']
})
export class ImagePopupComponent implements OnInit {
  showPopup: boolean = false;
  constructor() { }

  ngOnInit(): void {
     setTimeout(() => {
      this.showPopup = true;
     }, 5000);
  }
  closePopup() {
    this.showPopup = false;
  }}
