import { ClubCardComponent } from './club-card.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ClubCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [ClubCardComponent],
  providers: [],
})
export class MyClubCardModule {}
