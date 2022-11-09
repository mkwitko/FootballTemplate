import { Capacitor } from '@capacitor/core';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';
import { ScreenOrientationService } from './services/screen-orientation/screen-orientation.service';
import { MenuService } from './services/menu/menu.service';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';
import { environment } from 'src/environments/environment';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component } from '@angular/core';
import { AuthService } from './services/firebase/auth.service';
import { UserClass } from './classes/users/user';
import { MasterService } from './services/master/master.service';
import { RemoteConfigService } from './services/remoteConfig/remote-config.service';
import { ColorService } from './services/color/color.service';
import { WordpressService } from './services/apis/wordpress/wordpress.service';
import { ScreenService } from './services/screen/screen.service';
import { FootballService } from './services/apis/football/football.service';
import { YoutubeService } from './services/apis/youtube/youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public version = environment.global.version;

  constructor(
    public userClass: UserClass,
    public whiteLabel: WhiteLabelService,
    public football: FootballService,
    public youtube: YoutubeService,
    private nav: NavigationService,
    private auth: AuthService,
    private menu: MenuService,
    private screenOrientation: ScreenOrientationService,
    private master: MasterService,
    private remoteConfig: RemoteConfigService,
    private themer: ColorService
  ) {
    if (Capacitor.isNativePlatform()) {
      this.screenOrientation.lockPortrait();
    }
    this.remoteConfig.init().then(() => {
      this.remoteConfig.done = true;
      this.themer.setTheme(this.whiteLabel.app.color);
      this.auth.getAuth().onAuthStateChanged((user) => {
        if (user) {
          this.master.setUser(user.uid);
          this.master.set();
        }
      });
    });
  }

  goTo(url) {
    this.nav.goTo(url);
    this.menu.closeMenu();
  }
  logout() {
    this.auth.logout();
    this.menu.closeMenu();
  }
}
