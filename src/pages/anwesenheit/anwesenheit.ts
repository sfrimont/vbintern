import {Component, OnChanges} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the AnwesenheitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-anwesenheit',
  templateUrl: 'anwesenheit.html',
})
export class AnwesenheitPage {

  public terminID;
  public terminTitel;
  public sopran;
  public sopran2;
  public alt;
  public alt2;
  public tenor1;
  public tenor2;
  public bariton;
  public bass;
  public probemitglied;

  public anwesend;
  public namen;

  public zusagen = 0;
  public absagen = 0;
  public unsicher = 0;
  public keineAngabe = 0;

  public zusageSopran1 = 0;
  public absageSopran1 = 0;
  public unsicherSopran1 = 0;
  public keineAngabeSopran1 = 0;

    public zusageSopran2 = 0;
    public absageSopran2 = 0;
    public unsicherSopran2 = 0;
    public keineAngabeSopran2 = 0;

    public zusageAlt1 = 0;
    public absageAlt1 = 0;
    public unsicherAlt1 = 0;
    public keineAngabeAlt1 = 0;

    public zusageAlt2 = 0;
    public absageAlt2 = 0;
    public unsicherAlt2 = 0;
    public keineAngabeAlt2 = 0;

    public zusageTenor1 = 0;
    public absageTenor1 = 0;
    public unsicherTenor1 = 0;
    public keineAngabeTenor1 = 0;

    public zusageTenor2 = 0;
    public absageTenor2 = 0;
    public unsicherTenor2 = 0;
    public keineAngabeTenor2 = 0;

  public zusageBariton = 0;
  public absageBariton = 0;
  public unsicherBariton = 0;
  public keineAngabeBariton = 0;

    public zusageBass = 0;
    public absageBass = 0;
    public unsicherBass = 0;
    public keineAngabeBass = 0;



  public anwesendSopran2 = 0;
  public anwesendAlt1 = 0;
  public anwesendAlt2 = 0;
  public anwesendTenor = 0;
  public anwesendBariton = 0;
  public anwesendBass = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
      this.terminID = this.navParams.get('id');
      this.terminTitel = this.navParams.get('terminTitel');
      this.anwesend = this.navParams.get('anwesend');
      this.namen = this.navParams.get('namen');
      this.sopran = this.navParams.get('sopran');
      this.sopran2 = this.navParams.get('sopran2');
      this.alt = this.navParams.get('alt');
      this.alt2 = this.navParams.get('alt2');
      this.tenor1 = this.navParams.get('tenor1');
      this.tenor2 = this.navParams.get('tenor2');
      this.bariton = this.navParams.get('bariton');
      this.bass = this.navParams.get('bass');
      this.probemitglied = this.navParams.get('probemitglied');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnwesenheitPage');
  }



   dismiss() {
       this.viewCtrl.dismiss();
   }

    zaehleSopran1() {
       this.zusageSopran1 = 0;
       this.absageSopran1 = 0;
       this.unsicherSopran1 = 0;
       this.keineAngabeSopran1 =0;

       for (let voice in this.sopran) {
           if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.sopran[voice]] == "ja") this.zusageSopran1++;
           else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.sopran[voice]] == "nein") this.absageSopran1++;
           else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.sopran[voice]] == "unsicher") this.unsicherSopran1++;
           else this.keineAngabeSopran1++;
       }
        this.aktualisiereSummen();
    }

    zaehleSopran2() {
        this.zusageSopran2 = 0;
        this.absageSopran2 = 0;
        this.unsicherSopran2 = 0;
        this.keineAngabeSopran2 =0;

        for (let voice in this.sopran2) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.sopran2[voice]] == "ja") this.zusageSopran2++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.sopran2[voice]] == "nein") this.absageSopran2++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.sopran2[voice]] == "unsicher") this.unsicherSopran2++;
            else this.keineAngabeSopran2++;
        }
        this.aktualisiereSummen();
    }

    zaehleAlt1() {
        this.zusageAlt1 = 0;
        this.absageAlt1 = 0;
        this.unsicherAlt1 = 0;
        this.keineAngabeAlt1 =0;

        for (let voice in this.alt) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.alt[voice]] == "ja") this.zusageAlt1++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.alt[voice]] == "nein") this.absageAlt1++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.alt[voice]] == "unsicher") this.unsicherAlt1++;
            else this.keineAngabeAlt1++;
        }
        this.aktualisiereSummen();
    }

    zaehleAlt2() {
        this.zusageAlt2 = 0;
        this.absageAlt2 = 0;
        this.unsicherAlt2 = 0;
        this.keineAngabeAlt2 =0;

        for (let voice in this.alt2) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.alt2[voice]] == "ja") this.zusageAlt2++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.alt2[voice]] == "nein") this.absageAlt2++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.alt2[voice]] == "unsicher") this.unsicherAlt2++;
            else this.keineAngabeAlt2++;
        }

        this.aktualisiereSummen();
    }

    zaehleTenor1() {
        this.zusageTenor1 = 0;
        this.absageTenor1 = 0;
        this.unsicherTenor1 = 0;
        this.keineAngabeTenor1 =0;

        for (let voice in this.tenor1) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.tenor1[voice]] == "ja") this.zusageTenor1++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.tenor1[voice]] == "nein") this.absageTenor1++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.tenor1[voice]] == "unsicher") this.unsicherTenor1++;
            else this.keineAngabeTenor1++;
        }
        this.aktualisiereSummen();
    }

    zaehleTenor2() {
        this.zusageTenor2 = 0;
        this.absageTenor2 = 0;
        this.unsicherTenor2 = 0;
        this.keineAngabeTenor2 =0;

        for (let voice in this.tenor2) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.tenor2[voice]] == "ja") this.zusageTenor2++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.tenor2[voice]] == "nein") this.absageTenor2++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.tenor2[voice]] == "unsicher") this.unsicherTenor2++;
            else this.keineAngabeTenor2++;
        }
        this.aktualisiereSummen();
    }



    zaehleBariton() {
        this.zusageBariton = 0;
        this.absageBariton = 0;
        this.unsicherBariton = 0;
        this.keineAngabeBariton =0;

        for (let voice in this.bariton) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.bariton[voice]] == "ja") this.zusageBariton++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.bariton[voice]] == "nein") this.absageBariton++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.bariton[voice]] == "unsicher") this.unsicherBariton++;
            else this.keineAngabeBariton++;
        }
        this.aktualisiereSummen();
    }

    zaehleBass() {
        this.zusageBass = 0;
        this.absageBass = 0;
        this.unsicherBass = 0;
        this.keineAngabeBass =0;

        for (let voice in this.bass) {
            if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.bass[voice]] == "ja") this.zusageBass++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.bass[voice]] == "nein") this.absageBass++;
            else if (this.anwesend[this.terminID] && this.anwesend[this.terminID][this.bass[voice]] == "unsicher") this.unsicherBass++;
            else this.keineAngabeBass++;
        }
        this.aktualisiereSummen();
    }



    aktualisiereSummen() {

    this.zusagen = this.zusageSopran1+this.zusageSopran2+this.zusageAlt1+this.zusageAlt2+this.zusageTenor1+this.zusageTenor2+this.zusageBariton+this.zusageBass;
    this.absagen = this.absageSopran1+this.absageSopran2+this.absageAlt1+this.absageAlt2+this.absageTenor1+this.absageTenor2+this.absageBariton+this.absageBass;
    this.unsicher = this.unsicherSopran1+this.unsicherSopran2+this.unsicherAlt1+this.unsicherAlt2+this.unsicherTenor2+this.unsicherTenor2+this.unsicherBariton+this.unsicherBass;
    this.keineAngabe = this.keineAngabeSopran1+this.keineAngabeSopran2+this.keineAngabeAlt1+this.keineAngabeAlt2+this.keineAngabeTenor1+this.keineAngabeTenor2+this.keineAngabeBariton+this.keineAngabeBass;


    }

}
