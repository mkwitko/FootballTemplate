import { ScreenService } from './../screen/screen.service';
import { environment } from 'src/environments/environment';
import { CacheHelperService } from './../../helpers/cacheHelper/cache-helper.service';
import { Injectable } from '@angular/core';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';
import { WhiteLabelService } from '../white-label/white-label.service';
import { NavigationService } from '../navigation/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  public done = false;
  constructor(
    private remoteConfig: AngularFireRemoteConfig,
    private whiteLabel: WhiteLabelService,
    private cache: CacheHelperService,
    private navigation: NavigationService,
    private screen: ScreenService
  ) {}

  public async init(update = true): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .getterCache(environment.global.paths.remoteConfig)
        .then((cache) => {
          if (cache) this.setter(cache);
          else this.navigation.goTo('loading');

          this.remoteConfig
            .fetchAndActivate()
            .then(() => {
              this.cache
                .getterCache(environment.global.paths.remoteConfig)
                .then((cache) => {
                  if (!cache || update) {
                    this.getAll().then((all) => {
                      this.setter(all);
                      this.cache
                        .setterCache(all, environment.global.paths.remoteConfig)
                        .then(() => {
                          this.screen.dismissloading();
                          resolve(all);
                        });
                    });
                  } else {
                    this.cache
                      .getterCache(environment.global.paths.remoteConfig)
                      .then((cache) => {
                        this.setter(cache);
                        resolve(cache);
                      });
                  }
                });
            })
            .catch((err) => {
              reject(err);
            });
        });
    });
  }

  public async getValueByKey(key: string): Promise<any> {
    return this.remoteConfig
      .getString(key)
      .then((value) => {
        return value;
      })
      .catch((err) => {
        return err;
      });
  }

  private async getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.remoteConfig
        .getAll()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  private setter(value) {
    Object.entries(value).forEach((e) => {
      try {
        this.whiteLabel.app[e[0]] = JSON.parse(e[1]['_value']);
      } catch {
        this.whiteLabel.app[e[0]] = e[1]['_value'];
      }
    });
    if (this.navigation.getRoute() === '/loading') {
      this.screen.dismissloading();
      this.navigation.goTo('home');
    }
  }
}
