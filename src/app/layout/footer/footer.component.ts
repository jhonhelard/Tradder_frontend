import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year = new Date().getFullYear();
  public youtube: SafeResourceUrl;
  public twitter: SafeResourceUrl;
  public truchartscom: SafeResourceUrl;
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.youtube = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/c/Trucharts`);
    this.twitter = this.sanitizer.bypassSecurityTrustResourceUrl(`https://twitter.com/trucharts`);
    this.truchartscom = this.sanitizer.bypassSecurityTrustResourceUrl(`https://truchartscom.blogspot.com/`);
  }

}
