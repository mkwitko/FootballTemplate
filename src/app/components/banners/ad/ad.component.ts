import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component, Input } from '@angular/core';
import { Banner } from 'src/app/interfaces/banner/banner';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss'],
})
export class AdComponent {
  @Input() ads: Array<Banner>;
  @Input() fixed = true;

  fixedOpts = {
    allowTouchMove: false,
  };

  moveableOpts = {
    autoplay: true,
    speed: 1200,
  };

  constructor(private navigation: NavigationService) {}

  goTo(url: string) {
    this.navigation.goTo(url);
  }

  away(url: string) {
    this.navigation.away(url);
  }
}
