import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  constructor(
    public whiteLabel: WhiteLabelService,
    private navigation: NavigationService,
    private router: Router
  ) {
    this.activeTab();
  }

  goTo(url: string) {
    this.navigation.goTo(url);
  }

  activeTab() {
    for (const a of this.whiteLabel.app.tabs) {
      if (this.router.url === '/' + a.path) {
        a.active = true;
      } else {
        a.active = false;
      }
    }
  }
}
