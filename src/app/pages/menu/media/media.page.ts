import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/apis/youtube/youtube.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
})
export class MediaPage {
  segment = 'youtube';
  segments = ['youtube', 'tv-papo'];

  constructor(
    public youtube: YoutubeService,
    private navigation: NavigationService
  ) {
    if (!this.youtube.ready) {
      this.navigation.goTo('home');
    }
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
  }

  clickPlaylist(info) {
    this.navigation.rotaId('media-details', info.id);
  }
}
