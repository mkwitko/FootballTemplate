import { fire } from './firebase';

// TODO alterar 'app' e 'firebase'
export const global = {
  version: '0.0.2',
  erroGenerico: 'Ocorreu um erro inesperado',
  app: {
    logo: './../assets/whiteLabel/logo.png',
    anon: {
      name: 'Anonimo',
      email: 'anon@anon.com',
    },
  },
  firebase: fire.firebase,
  notify: {
    base: 'https://ntfy.sh/',
  },
  paths: {
    users: {
      myUser: 'myUser',
      allUsers: 'allUsers',
    },
    banner: 'banner',
    ads: 'ads',
    news: 'news',
    club: 'club',
    noticialength: 'noticia-length',
    update: 'update',
    remoteConfig: 'remoteConfig',
    pics: 'FotosPerfil',
    footballApi: {
      games: 'gamesApi',
      league: 'leagueApi',
      regional: 'regionalApi',
      stats: 'statsApi',
    },
  },
  apiFootball: {
    base: 'https://apiv3.apifootball.com/?action=',
    events: 'get_events',
    standing: 'get_standings',
    league: 'league_id',
    timezone: 'timezone=America/Sao_Paulo',
    club: 'team_id=',
  },

  apiYoutube: {
    basePlaylistExclusiva:
      'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=',
    baseChannel:
      'https://youtube.googleapis.com/youtube/v3/playlists?part=snippet,status%2Cid&channelId=',
    baseLive:
      'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=',
    baseActivity:
      'https://youtube.googleapis.com/youtube/v3/activities?part=contentDetails',
    // Canal Donos da Bola Teste Live
    // juveChannel: 'UCjlcZ5YIXlBTaob0BkS_gDg',
    maxResults: '&maxResults=20',
    //Key para teste
    // key: '&key=AIzaSyDGZUqTieHyjTtohq_cSAYLFViSISxMUgA',
    cachePath: {
      playlist: 'youtube-playlist',
      playlistExclusiva: 'youtube-playlistExclusiva',
      live: 'youtube-live',
      update: 'youtube-update',
    },
    upcoming: 'upcoming',
    live: 'live',
    firebasePath: 'Playlist-Exclusiva-Youtube',
  },
};
