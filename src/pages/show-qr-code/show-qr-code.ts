import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { NgxQRCode } from 'ngx-qrcode2';
import firebase from 'firebase';

/**
 * Generated class for the ShowQrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-qr-code',
  templateUrl: 'show-qr-code.html',
})
export class ShowQrCodePage {

  elementType : 'url' | 'canvas' | 'img' = 'url';
  value:string = "";

  vorname="";
  stimmgruppe="";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.value = firebase.auth().currentUser.uid;
  }

    datenEintragen() {
        firebase.database().ref('users/' + this.value).update({
            validiert: "nein",
            Name: this.vorname,
            Stimmgruppe: this.stimmgruppe
        });
    }



}
