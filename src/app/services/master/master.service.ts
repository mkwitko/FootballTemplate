import { StoreClass } from './../../classes/store/store';
import { MasterHelperService } from 'src/app/helpers/masterHelper/master-helper.service';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { UpdateBoolean } from './../../interfaces/update/update-bool';
import { Injectable } from '@angular/core';
import { PushService } from '../push/push.service';
import { UpdateInterface } from 'src/app/interfaces/update/update-interface';
import { UserClass } from 'src/app/classes/users/user';
import { UpdateManager } from 'src/app/interfaces/managers/update-manager';
import { UpdateManagerClass } from 'src/app/classes/updateManager/update-manager';
import { Banners } from 'src/app/classes/banners/banners';
import { News } from 'src/app/classes/news/news';
import { Ads } from 'src/app/classes/ads/ads';
import { WhiteLabelService } from '../white-label/white-label.service';
import { WordpressService } from '../apis/wordpress/wordpress.service';
import { FootballService } from '../apis/football/football.service';
import { YoutubeService } from '../apis/youtube/youtube.service';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(
    private master: MasterHelperService,
    private auth: AuthService,
    private userClass: UserClass,
    private updateManager: UpdateManagerClass,
    private bannerClass: Banners,
    private newsClass: News,
    private adsClass: Ads,
    private whiteLabel: WhiteLabelService,
    private wordpress: WordpressService,
    private football: FootballService,
    private youtube: YoutubeService,
    private storeClass: StoreClass
  ) {}

  setUser(id: string) {
    this.master
      .setClassById(
        id,
        true,
        this.userClass.cachePathMyUser,
        this.userClass.collection,
        this.userClass.ref
      )
      .then((res) => {
        if (res) {
          this.userClass.set(res);
          // this.auth.auth.currentUser.getIdTokenResult().then((token) => {
          //   console.log(token);
          // });
          // this.push.init();
        }
      });
  }

  makeUpdate(shouldUpdate) {
    let data: UpdateInterface = {};
    for (const a in shouldUpdate) {
      const obj = shouldUpdate[a];
      if (a !== 'id') {
        data[a] = obj;
      }
    }
    return data;
  }

  checkUpdate(shouldUpdate: UpdateInterface): Promise<any> {
    return new Promise((resolve) => {
      const data = this.makeUpdate(shouldUpdate);
      let shouldUpdateFinal: any = [];
      const oldData = this.updateManager.getOld();
      if (oldData && Object.keys(data).length > 0) {
        Object.entries(data).forEach((e) => {
          data[e[0]] !== oldData[e[0]]
            ? (shouldUpdateFinal[e[0]] = true)
            : (shouldUpdateFinal[e[0]] = false);
        });
        resolve(shouldUpdateFinal);
      } else {
        resolve(false);
      }
    });
  }

  set(api = true) {
    this.setter();
    this.youtube.setClass();
    this.football.setClass();

    this.updateManager.setClass().then((shouldUpdate) => {
      if (shouldUpdate) {
        this.checkUpdate(shouldUpdate).then((res: UpdateBoolean) => {
          this.setter(shouldUpdate, res);
        });
      }
    });
  }

  private setter(shouldUpdate = false, res?) {
    this.master
      .setClassAll(
        shouldUpdate !== false ? res.banner : false,
        this.bannerClass.path,
        this.bannerClass.collection
      )
      .then((banners) => {
        this.bannerClass.set(banners);
      });
    if (this.whiteLabel.app.isWordpress) {
      this.wordpress.getPosts().then((news) => {
        this.newsClass.set(news);
      });
    } else {
      this.master
        .setClassAll(
          shouldUpdate !== false ? res.news : false,
          this.newsClass.path,
          this.newsClass.collection
        )
        .then((news) => {
          this.newsClass.set(news);
        });
    }
    this.master
      .setClassAll(
        shouldUpdate !== false ? res.ads : false,
        this.adsClass.path,
        this.adsClass.collection
      )
      .then((ads) => {
        this.adsClass.set(ads);
      });
    this.master
      .setClassAll(
        shouldUpdate !== false ? res.redirectCard : false,
        this.storeClass.path,
        this.storeClass.collection
      )
      .then((store) => {
        this.storeClass.set(store);
      });
  }
}
