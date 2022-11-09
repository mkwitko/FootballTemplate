import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component, OnInit } from '@angular/core';
import { Ads } from 'src/app/classes/ads/ads';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';

@Component({
  selector: 'app-clube',
  templateUrl: './clube.page.html',
  styleUrls: ['./clube.page.scss'],
})
export class ClubePage implements OnInit {
  constructor(
    public adsClass: Ads,
    public wl: WhiteLabelService,
    private nav: NavigationService
  ) {}

  ngOnInit() {}

  goTo(item) {
    if (item.out) {
      this.nav.away(item.path);
    } else {
      this.nav.goTo(item.path);
    }
  }
}
