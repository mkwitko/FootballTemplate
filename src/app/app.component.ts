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
    private nav: NavigationService,
    private auth: AuthService,
    private menu: MenuService,
    private screenOrientation: ScreenOrientationService,
    private master: MasterService,
    private remoteConfig: RemoteConfigService
  ) {
    this.screenOrientation.lockPortrait();
    this.remoteConfig.init();
    this.auth.getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.master.setUser(user.uid);
      }
    });
    // this.master.set();
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
