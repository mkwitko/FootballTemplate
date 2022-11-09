import { MySkeletonTeam } from './../../skeleton/skeleton-team/skeleton-team.module';
import { CardGameComponent } from './card-game.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CardGameComponent],
  imports: [CommonModule, IonicModule, MySkeletonTeam],
  exports: [CardGameComponent],
  providers: [],
})
export class MyCardGame {}
