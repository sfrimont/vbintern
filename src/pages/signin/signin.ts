import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController } from "ionic-angular";


//import { Facebook } from "@ionic-native/facebook/ngx";
import firebase  from 'firebase';

import { AuthProvider } from '../../providers/auth/auth';

import { EmailLoginPage } from '../email-login/email-login';

@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html'
})
export class SigninPage {

    emailLogin:any;

    constructor(private authService: AuthProvider,
                private loadingCtrl: LoadingController,
                public alertCtrl: AlertController,
                 ) {
        this.emailLogin=EmailLoginPage;
    }



    loginWithFB() {
        let provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithRedirect(provider).then(() =>{

           firebase.auth().getRedirectResult().then((result)=>{


           }).catch(function(error) {
               const alert = this.alertCtrl.create({
                   title: 'Es ist ein Fehler aufgetreten:',
                   message: error,
                   buttons: ['Ok']
               })
               alert.present();

           });
        });

        //firebase.auth().signInWithPopup(provider);  // vielleicht später mal..
    }

    loginWithGG() {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(() =>{

            firebase.auth().getRedirectResult().then((result)=>{

            }).catch(function(error) {
                alert(JSON.stringify(error));
            });
        });
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
                    message: 'Email-Adresse oder Passwort nicht bekannt! Passwort vergessen? Kein Problem! Für ein neues Passwort bitte nur die Email-Adresse eintragen und dann "Passwort einrichten oder zurücksetzen" auswählen.',
                    //error.message,
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
                        title: 'Unbekanntes Login',
                        message: "Die oben eingegebene Email-Adresse ist dem System unbekannt. Oder es gibt einen Tippfehler...",
                        buttons: ['Ok']
                    })
                    alert.present();


            });

    }
}
