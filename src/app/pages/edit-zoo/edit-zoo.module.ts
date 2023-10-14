import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditZooPageRoutingModule } from './edit-zoo-routing.module';

import { EditZooPage } from './edit-zoo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditZooPageRoutingModule
  ],
  declarations: [EditZooPage]
})
export class EditZooPageModule {}
