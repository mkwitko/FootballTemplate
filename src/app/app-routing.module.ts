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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
