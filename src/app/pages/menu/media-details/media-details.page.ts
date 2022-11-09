import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from 'src/app/services/apis/youtube/youtube.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SafeUrlService } from 'src/app/services/sanitize/safe-url.service';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.page.html',
  styleUrls: ['./media-details.page.scss'],
})
export class MediaDetailsPage {
  private id;
  title;
  allVideos = new Array<any>();

  constructor(
    public youtube: YoutubeService,
    private route: ActivatedRoute,
    private navigation: NavigationService,
    private wl: WhiteLabelService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && this.wl.app.youtube.key) {
        this.id = params.id;
        this.youtube
          .get(this.youtube.getUrlChannelById(this.id))
          .then((res) => {
            const json = res;
            for (const a of json.items) {
              this.allVideos.push(a);
            }
            this.youtube.sanitize(this.allVideos);
          });
      } else {
        this.navigation.goTo('home');
      }
    });
  }

  ngOnInit() {}
}
