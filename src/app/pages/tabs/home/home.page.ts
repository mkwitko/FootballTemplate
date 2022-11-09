import { Component, OnInit } from '@angular/core';
import { Ads } from 'src/app/classes/ads/ads';
import { Banners } from 'src/app/classes/banners/banners';
import { News } from 'src/app/classes/news/news';
import { FootballService } from 'src/app/services/apis/football/football.service';
import { MasterService } from 'src/app/services/master/master.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(
    public football: FootballService,
    public bannerClass: Banners,
    public adsClass: Ads,
    public newsClass: News,
    private screen: ScreenService,
    private master: MasterService
  ) {}

  async refresh(event) {
    await this.screen.presentLoading();
    this.master.set(false);
    if (event) {
      this.screen.dismissloading();
      event.target.complete();
    }
  }
}
