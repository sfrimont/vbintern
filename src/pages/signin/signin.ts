import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController } from "ionic-angular";

import { AuthProvider } from '../../providers/auth/auth'

@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html'
})
export class SigninPage {

    constructor(private authService: AuthProvider,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController) {

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
                    title: 'Signin failed!',
                    message: error.message,
                    buttons: ['Ok']
                });
                alert.present();
            });
    }

    onResetPassword(form: NgForm) {
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
                        title: 'Unbekanntes login',
                        message: "Die oben eingegebene Email-Adresse ist dem System unbekannt. Vermutlich ist sie noch nicht als Adresse eines Chormitgliedes registriert. Bitte wende Dich an Sven :)<br>Hinweis : Alle im alten internen Bereich bekannten Email-Adressen wurden in das neue System übernommen.",
                        buttons: ['Ok']
                    })
                    alert.present();


            });

    }
}
