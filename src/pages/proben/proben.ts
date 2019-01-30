import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AnwesenheitPage} from "../anwesenheit/anwesenheit";
import {KalenderProvider} from "../../providers/kalender/kalender";
import firebase from 'firebase';
import {AnwesenheitProbePage} from "../anwesenheit-probe/anwesenheit-probe";

/**
 * Generated class for the ProbenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proben',
  templateUrl: 'proben.html',
})
export class ProbenPage {
    public user = firebase.auth().currentUser.uid;

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

    // zur Speicherung der Vornamen. Nach einem späteren Refactoring gibt es nur noch ein Objekt pro Stimme...
    public  namen = {};

    public anwesend = {};

    constructor(private bvKalenderService:KalenderProvider, public navCtrl: NavController, public modalCtrl: ModalController) {
        this.getCalData();
        this.dataReady=false;
        this.initAnwesendArray();
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

                return false;
            });

        });
    }

    stimmen(terminID,anwesend, namen, sopran,sopran2,alt,alt2,tenor,bariton,bass) {
        console.log("hallo");

        let modal = this.modalCtrl.create(AnwesenheitProbePage, {id: terminID,anwesend:anwesend, namen:namen, sopran: sopran, sopran2: sopran2, alt:alt, alt2:alt2, tenor:tenor, bariton:bariton, bass:bass});
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
