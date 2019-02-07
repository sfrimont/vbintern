import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

import firebase from 'firebase';

//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';


/**
 * Generated class for the MitgliedHinzufuegenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mitglied-hinzufuegen',
  templateUrl: 'mitglied-hinzufuegen.html',
})
export class MitgliedHinzufuegenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner:BarcodeScanner,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController

  ) {


  }


/*
    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        that.name = (snapshot.val() && snapshot.val().Name) || 'Anonymous';
        that.stimmgruppe = (snapshot.val() && snapshot.val().Stimmgruppe) || 'Anonymous';
    });
    firebase.database().ref('/users/' + userId).on('value',function(snapshot) {
        that.validiert = (snapshot.val() && snapshot.val().validiert) || 'nein';
        if (that.validiert == "ja") {
            that.rootPage=AndereTerminePage;
            that.isAuthenticated = true;
        } else {
            that.rootPage=ShowQrCodePage;
            that.isAuthenticated = false;
        }
    });

  */

  scanQRCode() {
      const checking = this.loadingCtrl.create({
          content: 'Die Kamera wird gestartet...'
      });
      checking.present();
      this.barcodeScanner.scan().then(barcodeData => {
          checking.dismiss();
          firebase.database().ref('users/' + barcodeData["text"]).update({
              validiert: "ja"
          });
      }).catch(err => {
          checking.dismiss();
          const alert = this.alertCtrl.create({
              title: 'QR-Code scannen nicht möglich',
              message: err.message,
              buttons: ['Ok']
          });
          alert.present();

      });
/*
      this.qrScanner.prepare()
          .then((status: QRScannerStatus) => {
              if (status.authorized) {
                  // camera permission was granted


                  // start scanning
                  let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                      console.log('Scanned something', text);

                      this.qrScanner.hide(); // hide camera preview
                      scanSub.unsubscribe(); // stop scanning
                  });

              } else if (status.denied) {
                  // camera permission was permanently denied
                  // you must use QRScanner.openSettings() method to guide the user to the settings page
                  // then they can grant the permission from there
              } else {
                  // permission was denied, but not permanently. You can ask for permission again at a later time.
              }
          })
          .catch((e: any) => console.log('Error is', e));
*/
  }

}
