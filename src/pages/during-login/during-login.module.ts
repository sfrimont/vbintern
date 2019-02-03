import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DuringLoginPage } from './during-login';

@NgModule({
  declarations: [
    DuringLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(DuringLoginPage),
  ],
})
export class DuringLoginPageModule {}
