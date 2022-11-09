import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WallpaperPage } from './wallpaper.page';

const routes: Routes = [
  {
    path: '',
    component: WallpaperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WallpaperPageRoutingModule {}
