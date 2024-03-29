import { CacheHelperService } from 'src/app/helpers/cacheHelper/cache-helper.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WhiteLabelService } from '../../white-label/white-label.service';
import { NavigationService } from '../../navigation/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class FootballService {
  public games;
  public league;
  public regional;
  public gamesNow;
  private activeTable;
  private infoObj;
  private gamesFinder = [];
  private statsFinder = [];

  public ready = false;

  private path = {
    games: environment.global.paths.footballApi.games,
    league: environment.global.paths.footballApi.league,
    regional: environment.global.paths.footballApi.regional,
    stats: environment.global.paths.footballApi.stats,
  };

  constructor(
    private http: HttpClient,
    private wl: WhiteLabelService,
    private nav: NavigationService,
    private cache: CacheHelperService
  ) {}

  get(which): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(which).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  getActiveTable() {
    return this.activeTable;
  }

  setActiveTable(value) {
    this.activeTable = value;
    this.setInfoObj(value);
  }

  getInfoObj() {
    return this.infoObj;
  }

  setInfoObj(value) {
    this.infoObj = this.find(value);
  }

  public gamesUrl() {
    return (
      environment.global.apiFootball.base +
      environment.global.apiFootball.events +
      '&' +
      environment.global.apiFootball.timezone +
      '&from=' +
      this.wl.app.footballApi.init +
      '&to=' +
      this.wl.app.footballApi.end +
      '&' +
      environment.global.apiFootball.club +
      this.wl.app.footballApi.club +
      '&APIkey=' +
      this.wl.app.footballApi.api
    );
  }

  public tableUrl(leagueId) {
    return (
      environment.global.apiFootball.base +
      environment.global.apiFootball.standing +
      '&' +
      environment.global.apiFootball.league +
      '=' +
      leagueId +
      '&APIkey=' +
      this.wl.app.footballApi.api
    );
  }

  public statisticUrl(home, away) {
    return (
      'https://apiv3.apifootball.com/?action=get_H2H&firstTeamId=' +
      home +
      '&secondTeamId= ' +
      away +
      '&APIkey=' +
      this.wl.app.footballApi.api
    );
  }

  private setGames(value) {
    this.games = value;
    this.fillGames();
    for (const a of this.games) {
      a.match_stadium = this.setNomeEstadio(a.match_stadium);
      a.league_name = this.setNomeCompeticao(a.league_name);
    }
    this.gamesNow = this.now(value);
  }

  public findGame(id) {
    return this.gamesFinder[id];
  }

  private fillGames() {
    this.games.forEach((element) => {
      this.gamesFinder[element.match_id] = element;
    });
  }

  setClass(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache.getterCache(this.path.games).then((cacheGames) => {
        if (cacheGames) {
          this.setGames(cacheGames);
        }
        this.cache.getterCache(this.path.league).then((leagueCache) => {
          this.league = leagueCache;
          this.setActiveTable(leagueCache);
        });
        this.cache.getterCache(this.path.regional).then((regionalCache) => {
          this.regional = regionalCache;
        });
      });
      this.get(this.gamesUrl())
        .then((games) => {
          this.setGames(games);
          this.setClassStats(games).then((res) => {
            this.fillStat(res);
          });
          this.cache.setterCache(games, this.path.games);
          this.get(this.tableUrl(this.wl.app.footballApi.league))
            .then((table) => {
              this.league = table;
              this.setActiveTable(this.league);
              this.cache.setterCache(table, this.path.league);
              this.get(this.tableUrl(this.wl.app.footballApi.regionalLeague))
                .then((regional) => {
                  this.regional = regional;
                  this.cache.setterCache(regional, this.path.regional);
                  this.ready = true;
                  resolve(true);
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  setNomeCompeticao(who: string) {
    let w = who;
    if (w.includes('Gaúcho')) who = 'Gauchão';
    if (w.includes('Semi-finals')) who += ' Semi Final';
    if (w.includes('Copa do Brasil')) who = 'Copa do Brasil';
    if (w.includes('Serie A')) who = 'Serie A';
    if (w.includes('Serie B')) who = 'Serie B';
    if (w.includes('Serie C')) who = 'Serie C';
    if (w.includes('Serie D')) who = 'Serie D';

    return who;
  }

  setNomeEstadio(who) {
    who = who.replace('Estádio', '');
    who = who.slice(0, who.lastIndexOf('('));
    if (who.includes('(')) {
      who = who.substring(who.indexOf('(') + 1);
      who = who.slice(0, who.lastIndexOf(')'));
    }
    if (who.includes(',')) {
      who = who.split(',')[0];
    }
    return who;
  }

  finished(games) {
    return games.filter((each) => each.match_status === 'Finished');
  }

  notFinished(games) {
    return games.filter((each) => each.match_status !== 'Finished');
  }

  now(games) {
    let finished = this.finished(games);
    let notFinished = this.notFinished(games);

    let end = [];
    let target = 5;

    if (notFinished.length >= 3) {
      end.push(...finished.slice(finished.length - 2, finished.length));
      end.push(...notFinished.slice(0, 3));
    } else {
      let howMuch = target - notFinished.length;
      end.push(...finished.slice(finished.length - howMuch, finished.length));
      end.push(...notFinished.slice(0, notFinished.length));
    }
    return end;
  }

  find(who) {
    if (who && who.length > 0) {
      return who.filter(
        (each) =>
          each.team_id.toString() === this.wl.app.footballApi.club.toString()
      )[0];
    }
  }

  public findStats(id1, id2) {
    return this.statsFinder[id1 + '/' + id2];
  }

  private fillStat(value) {
    value.forEach((element) => {
      this.statsFinder[element.id] = element.data;
    });
  }

  private stats(game): Promise<any> {
    return new Promise((resolve, reject) => {
      let id1 = game.match_hometeam_id;
      let id2 = game.match_awayteam_id;
      let returner = {};
      this.get(this.statisticUrl(id1, id2)).then((res) => {
        returner = {
          id: id1 + '/' + id2,
          data: res,
        };
        resolve(returner);
      });
    });
  }

  setClassStats(games, update = false): Promise<any> {
    return new Promise((resolve) => {
      this.cache.getterCache(this.path.stats).then((cache) => {
        if (!cache || cache.length < games.length || update) {
          let count = 0;
          let cache = [];
          games.forEach((element) => {
            this.stats(element).then((res) => {
              count++;
              cache.push(res);
              if (count === games.length) {
                this.cache.setterCache(cache, this.path.stats).then(() => {
                  resolve(cache);
                });
              } else {
                this.cache.setterCache(cache, this.path.stats);
              }
            });
          });
        } else {
          resolve(cache);
        }
      });
    });
  }
}
