import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-video-player',
  template: `
    <iframe
      width="100%"
      height="200px"
      [src]="videoUrl"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `,
})
export class YoutubePlayerComponentComponent implements OnInit {
  @Input("VideoId") private VideoId: string = '';
  public videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    //this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.VideoId}`);
  }

  ngOnInit(): void {
    let baseurl = this.getBaseUrl();
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.VideoId}?enablejsapi=1&origin=${baseurl}`);
  }

  getBaseUrl(): string {
    return `${window.location.protocol}//${window.location.hostname}${(window.location.port ? ':' + window.location.port : '')}`;
  }


}
