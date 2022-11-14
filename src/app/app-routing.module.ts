import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/tabs/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'forgot',
    loadChildren: () =>
      import('./pages/auth/forgot/forgot.module').then(
        (m) => m.ForgotPageModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'tab2',
    loadChildren: () =>
      import('./pages/tabs/news/news.module').then((m) => m.NewsPageModule),
  },
  {
    path: 'tab3',
    loadChildren: () =>
      import('./pages/tabs/conv/conv.module').then((m) => m.ConvPageModule),
  },
  {
    path: 'tab4',
    loadChildren: () =>
      import('./pages/tabs/profile/profile-home/profile-home.module').then(
        (m) => m.ProfileHomePageModule
      ),
  },
  {
    path: 'profile-edit',
    loadChildren: () =>
      import('./pages/tabs/profile/profile-edit/profile-edit.module').then(
        (m) => m.ProfileEditPageModule
      ),
  },
  {
    path: 'loading',
    loadChildren: () =>
      import('./pages/loading/loading/loading.module').then(
        (m) => m.LoadingPageModule
      ),
  },
  {
    path: 'tabela',
    loadChildren: () =>
      import('./pages/menu/tabela/tabela.module').then(
        (m) => m.TabelaPageModule
      ),
  },
  {
    path: 'calendario',
    loadChildren: () =>
      import('./pages/menu/calendario/calendario.module').then(
        (m) => m.CalendarioPageModule
      ),
  },
  {
    path: 'media',
    loadChildren: () =>
      import('./pages/menu/media/media.module').then((m) => m.MediaPageModule),
  },
  {
    path: 'clube',
    loadChildren: () =>
      import('./pages/menu/clube/clube.module').then((m) => m.ClubePageModule),
  },
  {
    path: 'media-details',
    loadChildren: () =>
      import('./pages/menu/media-details/media-details.module').then(
        (m) => m.MediaDetailsPageModule
      ),
  },
  {
    path: 'news-details',
    loadChildren: () =>
      import('./pages/tabs/news-details/news-details.module').then(
        (m) => m.NewsDetailsPageModule
      ),
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./pages/club/history/history.module').then(
        (m) => m.HistoryPageModule
      ),
  },
  {
    path: 'wallpaper',
    loadChildren: () =>
      import('./pages/club/wallpaper/wallpaper.module').then(
        (m) => m.WallpaperPageModule
      ),
  },
  {
    path: 'playlist',
    loadChildren: () =>
      import('./pages/club/playlist/playlist.module').then(
        (m) => m.PlaylistPageModule
      ),
  },
  {
    path: 'memorial',
    loadChildren: () =>
      import('./pages/club/memorial/memorial.module').then(
        (m) => m.MemorialPageModule
      ),
  },
  {
    path: 'carteira-socio',
    loadChildren: () =>
      import('./pages/modal/carteira-socio/carteira-socio.module').then(
        (m) => m.CarteiraSocioPageModule
      ),
  },
  {
    path: 'galeria-modal',
    loadChildren: () =>
      import('./pages/modal/galeria-modal/galeria-modal.module').then(
        (m) => m.GaleriaModalPageModule
      ),
  },
  {
    path: 'licenca',
    loadChildren: () =>
      import('./pages/termos/licenca/licenca.module').then(
        (m) => m.LicencaPageModule
      ),
  },
  {
    path: 'politica',
    loadChildren: () =>
      import('./pages/termos/politica/politica.module').then(
        (m) => m.PoliticaPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
