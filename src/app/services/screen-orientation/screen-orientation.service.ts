import { Capacitor } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Injectable({
  providedIn: 'root',
})
export class ScreenOrientationService {
  constructor(private screenOrientation: ScreenOrientation) {}

  lockLandscape() {
    if (Capacitor.isNativePlatform()) {
      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.LANDSCAPE
      );
    }
  }

  lockPortrait() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  unlock() {
    if (Capacitor.isNativePlatform()) {
      this.screenOrientation.unlock();
    }
  }
}
