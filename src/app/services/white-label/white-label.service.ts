import { Injectable } from '@angular/core';
import { ApiFootball } from 'src/app/interfaces/api-football';
import { Youtube } from 'src/app/interfaces/youtube/youtube';

@Injectable({
  providedIn: 'root',
})
export class WhiteLabelService {
  public firebase;
  public app = {
    appName: '',
    menu: [],
    firebase: {},
    color: {},
    tabs: [],
    isWordpress: false,
    objects: {},
    site: '',
    footballApi: {} as ApiFootball,
    youtube: {} as Youtube,
    clubPage: [],
    services: [],
    licenca: '',
    politica: '',
  };

  constructor() {}

  /* Getters */

  /* Setters */
  setSocioInfo(socioInfo) {
    // TODO implementar funcionalidade de sócio
  }
}
