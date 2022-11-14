import { ScreenService } from 'src/app/services/screen/screen.service';
import { WhiteLabelService } from './../white-label/white-label.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { Platform } from '@ionic/angular';

import OneSignal from 'onesignal-cordova-plugin';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    // private oneSignal: OneSignal,
    private wl: WhiteLabelService,
    private platform: Platform,
    private screen: ScreenService
  ) {}

  // init() {
  //   if (this.platform.is('capacitor')) {
  //     this.platform.ready().then(() => {
  //       this.oneSignal.startInit(this.wl.app.appId);
  //       this.oneSignal.handleNotificationReceived().subscribe((received) => {
  //         this.screen.presentToast('Received - ' + received, '1');
  //       });
  //       this.oneSignal.handleNotificationOpened().subscribe((opened) => {
  //         this.screen.presentToast('opened - ' + opened, '1');
  //       });
  //       this.oneSignal.handleInAppMessageClicked().subscribe((inapp) => {
  //         this.screen.presentToast('inapp - ' + inapp, '1');
  //       });
  //     });
  //   }
  // }

  async init() {
    if (this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
        OneSignal.setAppId(this.wl.app.appId);

        OneSignal.setNotificationOpenedHandler((jsonData) => {
          this.screen.presentToast('Opened - ' + JSON.stringify(jsonData), '1');
        });

        OneSignal.setNotificationWillShowInForegroundHandler((event) => {
          this.screen.presentToast('event - ' + JSON.stringify(event), '1');
        });

        OneSignal.promptForPushNotificationsWithUserResponse((accepted) => {
          this.screen.presentToast(
            'Accepted - ' + JSON.stringify(accepted),
            '1'
          );
        });
      });
    }
  }
}
