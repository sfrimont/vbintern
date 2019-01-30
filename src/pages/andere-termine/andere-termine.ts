import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { KalenderProvider } from '../../providers/kalender/kalender';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import firebase from 'firebase';

import { AnwesenheitPage } from '../anwesenheit/anwesenheit';

/**
 * Generated class for the AndereTerminePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-andere-termine',
  templateUrl: 'andere-termine.html',
})
export class AndereTerminePage {

    auswahl="keineAuswahl"; // in dieser Variablen wird gespeichert welche Termine angezeigt werden sollen.

    public user = firebase.auth().currentUser.uid;
    public name: string;

  public calenderData:any;
  public dataReady:boolean;
  public refresher: any;

  public  sopran = new Array();
  public  sopran2 = new Array();
  public  alt = new Array();
  public  alt2 = new Array();
  public  tenor = new Array();
  public  bariton = new Array();
  public  bass = new Array();
  public probemitglied = new Array();

    // zur Speicherung der Vornamen. Nach einem späteren Refactoring gibt es nur noch ein Objekt pro Stimme...
    public  namen = {};

  public anwesend = {};

  constructor(private bvKalenderService:KalenderProvider, public navCtrl: NavController, public modalCtrl: ModalController) {
   this.getCalData();
   this.dataReady=false;
   this.initAnwesendArray();
  }

  changeAuswahl(auswahl) {
      this.auswahl=auswahl;
  }

  terminAnzeigen(id) {
      if (this.auswahl=="unsicher") if (this.anwesend[id] && this.anwesend[id][this.user]=="unsicher") return true;
      if (this.auswahl=="alleTermine") return true;
      if (this.auswahl=="keineAuswahl") if (!(this.anwesend[id] && this.anwesend[id][this.user]) || this.anwesend[id] && this.anwesend[id][this.user]=='vielleicht') return true;
      return false;
  }

  terminNichtAuswgewaehlt(id) {
      if (this.auswahl=="keineAuswahl") if (!(this.anwesend[id] && this.anwesend[id][this.user]) || this.anwesend[id] && this.anwesend[id][this.user]=='vielleicht') return true;
      return false;
  }

    doRefresh(rf) {
      this.refreshCalData(rf);
    }

  getCalData() {
    this.bvKalenderService.getData()
    .then(data => {
      this.calenderData = data;
      this.dataReady=true;
      this.initVoiceArrays();
    });
  }

    refreshCalData(refresher) {
        this.bvKalenderService.getData()
            .then(data => {
                this.calenderData = data;
                refresher.complete();
            });
    }


    setAnwesend(eventID,status) {
        //let database = firebase.database();
        let user = firebase.auth().currentUser;
        firebase.database().ref('/termine/'+eventID+'/' + user.uid).set({
            anwesend: status
        });
    }

    anzahlNichtsAusgewaehlt() {
        let counter = 0;
        if (this.calenderData) {

            for (let termin of this.calenderData.items) {
                if (!termin.summary.includes("Probe ")) {
                    if (!(this.anwesend[termin.id] && this.anwesend[termin.id][this.user]) || this.anwesend[termin.id] && this.anwesend[termin.id][this.user] == 'vielleicht') {
                        counter++;
                    }
                }
            }
        }
        return counter;
    }

    anzahlUnsicherAusgewaehlt()
    {

        let counter = 0;
        if (this.calenderData) {

            for (let termin of this.calenderData.items) {
                if (!termin.summary.includes("Probe ")) {
                    if (this.anwesend[termin.id] && this.anwesend[termin.id][this.user]=='unsicher') {
                        counter++;
                    }
                }
            }
        }

        return counter
    }

    initAnwesendArray() {
        let database = firebase.database();
        let anwesend = database.ref('/termine/');
        let that = this;
        anwesend.on("value", function(snap) {
            snap.forEach(function (childSnap) {
                //console.log("termin: "+childSnap.key);// childSnap.child.val().anwesend;
                that.anwesend[childSnap.key]={};
                childSnap.forEach(function (user) {
                    //console.log("user: "+user.key);
                    //console.log("anwesend: "+user.val().anwesend)
                    that.anwesend[childSnap.key][user.key]=user.val().anwesend;
                return false;
                });
                return false;
            });
        });
    }

    initVoiceArrays() {

      let database = firebase.database();
      let users = database.ref('/users');
      let that = this;
      users.on("value", function (snap) {

          that.sopran = new Array();
          that.sopran2 = new Array();
          that.alt = new Array();
          that.alt2 = new Array();
          that.tenor = new Array();
          that.bariton = new Array();
          that.bass = new Array();


         snap.forEach(function (childSnap) {

             // Alle Namen in einer Hashtabelle merken (besser: gleich Objekte für User speichern..)
             that.namen[childSnap.key]=childSnap.val().Name;

            if (childSnap.val().Stimmgruppe == "Sopran 1") {
                that.sopran.push(childSnap.key);

            }

             if (childSnap.val().Stimmgruppe == "Sopran 2") {
                 that.sopran2.push(childSnap.key);
             }

             if (childSnap.val().Stimmgruppe == "Alt 1") {
                 that.alt.push(childSnap.key);
             }
             if (childSnap.val().Stimmgruppe == "Alt 2") {
                 that.alt2.push(childSnap.key);
             }
             if (childSnap.val().Stimmgruppe == "Tenor") {
                 that.tenor.push(childSnap.key);
             }
             if (childSnap.val().Stimmgruppe == "Bariton") {
                 that.bariton.push(childSnap.key);
             }
             if (childSnap.val().Stimmgruppe == "Bass") {
                 that.bass.push(childSnap.key);
             }

             if (childSnap.val().Stimmgruppe == "Probemitglied") {
                 that.probemitglied.push(childSnap.key);
             }

             return false;
         });

      });
    }

    stimmen(terminID,terminTitel,anwesend, namen, sopran,sopran2,alt,alt2,tenor,bariton,bass,probemitglied) {


        let modal = this.modalCtrl.create(AnwesenheitPage, {id: terminID,anwesend:anwesend, terminTitel:terminTitel, namen:namen, sopran: sopran, sopran2: sopran2, alt:alt, alt2:alt2, tenor:tenor, bariton:bariton, bass:bass, probemitglied:probemitglied});
        modal.present({

        });

    }

    /*
    setVoiceArrays(termin)
    database.ref().once("value", function(snap){
        snap.forEach(function(childSnap) {
            scores['Name'].push(childSnap.val().Name);
            scores['Score'].push(childSnap.val().Score);
        });
    });

    var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
starCountRef.on('value', function(snapshot) {
  updateStarCount(postElement, snapshot.val());
});
    */

  

}
