import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component, Input } from '@angular/core';
import { Banner } from 'src/app/interfaces/banner/banner';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss'],
})
export class AdComponent {
  @Input() ads: Array<Banner>;
  @Input() path = false;
  @Input() fixed = true;

  fixedOpts = {
    allowTouchMove: false,
  };

  moveableOpts = {
    autoplay: true,
    speed: 1200,
  };

  constructor(
    public wl: WhiteLabelService,
    private navigation: NavigationService
  ) {}

  goTo(url: string) {
    this.navigation.goTo(url);
  }

  away(url: string) {
    this.navigation.away(url);
  }
}
