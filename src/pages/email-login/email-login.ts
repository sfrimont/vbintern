import { Component } from '@angular/core';
import { LoadingController, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { NeuenLoginErstellenPage } from '../../pages/neuen-login-erstellen/neuen-login-erstellen';
import {NgForm} from "@angular/forms";
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the EmailLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email-login',
  templateUrl: 'email-login.html',
})
export class EmailLoginPage {

  neuesLogin: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authService: AuthProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController
              ) {
    this.neuesLogin = NeuenLoginErstellenPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailLoginPage');
  }

    onSignin(form: NgForm) {
        const loading = this.loadingCtrl.create({
            content: 'Einen Moment bitte...'
        });
        loading.present();
        this.authService.signin(form.value.email, form.value.password)
            .then(data => {
                loading.dismiss();
            })
            .catch(error => {
                loading.dismiss();
                const alert = this.alertCtrl.create({
                    title: 'Login nicht möglich',
                    message: 'Email-Adresse oder Passwort nicht bekannt! Passwort vergessen? Kein Problem! Für ein neues Passwort bitte nur die Email-Adresse eintragen und dann "Passwort vergessen" auswählen.',
                    //error.message,
                    buttons: ['Ok']
                });
                alert.present();
            });
    }

    onResetPassword(form: NgForm) {
        if (form.value.email=="") {
            const alert = this.alertCtrl.create({
                message: 'Bitte geben Sie Ihre Email-Adresse in das obere Feld ein.',
                buttons: ['Ok']
            })
            alert.present();
            return
        }
        const checking = this.loadingCtrl.create({
            content: 'Einen Moment bitte...'
        });
        checking.present();
        this.authService.resetPassword(form.value.email)
            .then( data => {
                const alert = this.alertCtrl.create({
                    title: 'Email mit Anweisungen versendet an:',
                    message: form.value.email,
                    buttons: ['Ok']
                })
                alert.present();
                checking.dismiss();
            })
            .catch( error => {
                checking.dismiss();

                const alert = this.alertCtrl.create({
                    title: 'Unbekanntes Login',
                    message: "Die oben eingegebene Email-Adresse ist dem System unbekannt. Oder es gibt einen Tippfehler...",
                    buttons: ['Ok']
                })
                alert.present();


            });

    }

}
