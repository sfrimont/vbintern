import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the DuringLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-during-login',
  templateUrl: 'during-login.html',
})
export class DuringLoginPage {

    loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, loadingCtrl:LoadingController) {
      this.loading = loadingCtrl.create({
          content: 'Einen Moment bitte...'
      });
      this.loading.present();

  }

    ionViewDidEnter() {

        this.loading.dismiss(); // Der Hinweis soll nur einen kurzen Moment sichtbar sein und wird gleich wieder entfernt..
    }



}
