import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the KalenderPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kalender',
  templateUrl: 'kalender.html'
})
export class KalenderPage {

  probenRoot = 'ProbenPage'
  andereTermineRoot = 'AndereTerminePage'


  constructor(public navCtrl: NavController) {

  	
  }

}
