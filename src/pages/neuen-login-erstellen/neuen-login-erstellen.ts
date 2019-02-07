import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {NgForm} from "@angular/forms";

/**
 * Generated class for the NeuenLoginErstellenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-neuen-login-erstellen',
  templateUrl: 'neuen-login-erstellen.html',
})
export class NeuenLoginErstellenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }


    onSignUp(form: NgForm) {
        if(form.value.password !== form.value.password2) {
            const alert = this.alertCtrl.create({
                title: 'Fehler',
                message: 'Die eingegebenen Passwörter stimmen nicht überein.',
                //error.message,
                buttons: ['Ok']
            });
            alert.present();
            return
        }
        const loading = this.loadingCtrl.create({
            content: 'Einen Moment bitte...'
        });
        loading.present();
        this.authService.signup(form.value.email, form.value.password)
            .then(data => {
                loading.dismiss();
            })
            .catch(error => {
                loading.dismiss();
                const alert = this.alertCtrl.create({
                    title: 'Login kann nicht erstellt werden',
                    message: error.message,
                    buttons: ['Ok']
                });
                alert.present();
            });
    }

}
