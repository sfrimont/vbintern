import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';
import { SigninPage } from "../pages/signin/signin";

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


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SigninPage;

    isAuthenticated = false;

    name : string;
    stimmgruppe : string;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private auth: AuthProvider, private menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Termine', component: AndereTerminePage },
        { title: 'Proben', component: ProbenPage },
        { title: 'Rückblick', component: ProbenProtokollPage },
        { title: 'Noten/Übefiles', component:HomePage},
      { title: 'Aufgabenverteilung', component: AufgabenPage},
      { title: 'Bildergalerie', component: BildergaleriePage},
      { title: 'Adressliste', component: AdresslistePage}
    ];

  }

  initializeApp() {
      // Initialize Firebase
      var config = {
          apiKey: "AIzaSyA4ApcV4mLCTeKSZn44FJdQcncBW9WjM_k",
          authDomain: "bvintern-640b9.firebaseapp.com",
          databaseURL: "https://bvintern-640b9.firebaseio.com",
          projectId: "bvintern-640b9",
          storageBucket: "bvintern-640b9.appspot.com",
          messagingSenderId: "986736619854"
      };
      firebase.initializeApp(config);

      firebase.auth().onAuthStateChanged(user => {
          if (user) {
              this.isAuthenticated = true;
              this.rootPage = AndereTerminePage;
              let that=this;
              let userId = firebase.auth().currentUser.uid;
              return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
                  that.name = (snapshot.val() && snapshot.val().Name) || 'Anonymous';
                  that.stimmgruppe = (snapshot.val() && snapshot.val().Stimmgruppe) || 'Anonymous';
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
