import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the SetUserDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-user-data',
  templateUrl: 'set-user-data.html',
})
export class SetUserDataPage {

  vorname: any;
  stimmgruppe: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      let user = firebase.auth().currentUser.uid;
      let that=this;
      firebase.database().ref('/users/' + user).once('value').then(function(snapshot) {
          that.vorname = (snapshot.val() && snapshot.val().Name) || 'Anonymous';
          that.stimmgruppe = (snapshot.val() && snapshot.val().Stimmgruppe) || 'Anonymous';
      });
  }



    datenEintragen() {
        let user = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + user).update({
            Name: this.vorname,
            Stimmgruppe: this.stimmgruppe
        });
    }

}
