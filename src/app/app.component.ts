import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';
import { SigninPage } from "../pages/signin/signin";
import { ShowQrCodePage } from "../pages/show-qr-code/show-qr-code";

import { ProbenProtokollPage} from "../pages/proben-protokoll/proben-protokoll";

import { HomePage } from '../pages/home/home';

import { AufgabenPage } from '../pages/aufgaben/aufgaben';
import { BildergaleriePage } from "../pages/bildergalerie/bildergalerie";
import { AdresslistePage } from "../pages/adressliste/adressliste";
import { ProbenPage } from "../pages/proben/proben";
//import { KalenderPage } from "../pages/kalender/kalender";
import { AndereTerminePage } from "../pages/andere-termine/andere-termine";

import {NavController, MenuController} from 'ionic-angular';

import {AuthProvider} from "../providers/auth/auth";
import {DuringLoginPage} from "../pages/during-login/during-login";
import {MitgliedHinzufuegenPage} from "../pages/mitglied-hinzufuegen/mitglied-hinzufuegen";
import {SetUserDataPage} from "../pages/set-user-data/set-user-data";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = DuringLoginPage;

    isAuthenticated = false;

    name : string;
    stimmgruppe : string;
    validiert: string;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private auth: AuthProvider, private menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Termine', component: AndereTerminePage },
        { title: 'Proben', component: ProbenPage },
        { title: 'Rückblick', component: ProbenProtokollPage }

        //{ title: 'Noten/Übefiles', component:HomePage},
      //{ title: 'Aufgabenverteilung', component: AufgabenPage},
      //{ title: 'Bildergalerie', component: BildergaleriePage},
      //{ title: 'Adressliste', component: AdresslistePage}
    ];



    if(!document.URL.startsWith('http')) {  // soll nur hinzugefügt werden wenn es nicht im Webbrowser betrachtet wrid
        this.pages.push({ title: 'Neues Mitglied', component: MitgliedHinzufuegenPage});
    }

    this.pages.push({title:'Einstellungen', component: SetUserDataPage});

  }

  initializeApp() {
      // Initialize Firebase
      var config = {
          apiKey: "AIzaSyBniZDN6biOh6cimoM8e26ZwkbAxFUzirU",
          authDomain: "vbintern-aa649.firebaseapp.com",
          databaseURL: "https://vbintern-aa649.firebaseio.com",
          projectId: "vbintern-aa649",
          storageBucket: "vbintern-aa649.appspot.com",
          messagingSenderId: "720228956949"
      };
      firebase.initializeApp(config);

      firebase.auth().onAuthStateChanged(user => {
          if (user) {

              this.rootPage = DuringLoginPage;
              let that=this;
              let userId = firebase.auth().currentUser.uid;
              firebase.database().ref('/users/' + userId).on('value', function(snapshot) {
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

          } else {
              this.isAuthenticated = false;
              this.rootPage = SigninPage;
          }
      });


    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

    onLogout() {
        this.auth.logout();
        this.nav.setRoot(SigninPage);
    }
}
