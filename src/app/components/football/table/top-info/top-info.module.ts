import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopInfoComponent } from './top-info.component';

@NgModule({
  declarations: [TopInfoComponent],
  imports: [CommonModule, IonicModule],
  exports: [TopInfoComponent],
  providers: [],
})
export class MyTopInfo {}
