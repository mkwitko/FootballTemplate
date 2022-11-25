import { ScreenService } from 'src/app/services/screen/screen.service';
import { WhiteLabelService } from './../white-label/white-label.service';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import OneSignal from 'onesignal-cordova-plugin';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private wl: WhiteLabelService,
    private platform: Platform,
    private screen: ScreenService
  ) {}

  async init() {
    if (this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
        OneSignal.setAppId(this.wl.app.appId);

        OneSignal.setNotificationOpenedHandler((jsonData) => {
        });

        OneSignal.setNotificationWillShowInForegroundHandler((event) => {
        });

        OneSignal.promptForPushNotificationsWithUserResponse((accepted) => {
          
        });
      });
    }
  }
}
