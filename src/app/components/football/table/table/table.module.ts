import { TableComponent } from './table.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTopInfo } from '../top-info/top-info.module';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, IonicModule, MyTopInfo],
  exports: [TableComponent],
  providers: [],
})
export class MyTable {}
