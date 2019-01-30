import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the AdresslistePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adressliste',
  templateUrl: 'adressliste.html',
})
export class AdresslistePage {

  user: any;

  constructor(public httpClient:HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    // this.user = this.httpClient.get('http://h2821129.stratoserver.net/api.php/records/user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdresslistePage');
  }

}
