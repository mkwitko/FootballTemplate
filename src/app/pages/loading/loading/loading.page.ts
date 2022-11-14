import { ScreenService } from './../../../services/screen/screen.service';
import { Component, OnInit } from '@angular/core';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';
import { RemoteConfigService } from 'src/app/services/remoteConfig/remote-config.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {
  constructor(private screen: ScreenService) {
    this.init();
  }

  async init() {
    await this.screen.presentLoading();
  }

  ngOnInit() {}
}
