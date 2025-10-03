import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  template: '<youtube-player videoId="{{videoId}}"></youtube-player>',
  selector: 'app-video',
})
export class YoutubeComponent implements OnInit {
  @Input() idToLoad: string;
  videoId: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // setTimeout(() => {
    //   const tag = document.createElement('script');
    //   tag.src = "https://www.youtube.com/iframe_api";
    //   document.body.appendChild(tag);
    //   this.loadVideo(this.idToLoad);   
    // }, 500);
  }

  loadVideo(idToLoad) {
    const reqURL = "https://api.rss2json.com/v1/api.json?rss_url=" +
      encodeURIComponent("https://www.youtube.com/feeds/videos.xml?channel_id=");
    this.http.get(reqURL + 'UC1H4w-5HnsgTKSYDj6gBo4A').subscribe((data:any) => {
      if (data && data.items) {
        const lastVideoLink = data.items[idToLoad].link;
        this.videoId = lastVideoLink.substring(lastVideoLink.indexOf('?v=') + 3);
      }
    })
  }
}
