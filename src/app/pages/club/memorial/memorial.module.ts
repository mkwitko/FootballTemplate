import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemorialPageRoutingModule } from './memorial-routing.module';

import { MemorialPage } from './memorial.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemorialPageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
  ],
  declarations: [MemorialPage],
})
export class MemorialPageModule {}
