import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {KalenderProvider} from "../../providers/kalender/kalender";

/**
 * Generated class for the ProbenProtokollPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proben-protokoll',
  templateUrl: 'proben-protokoll.html',
})
export class ProbenProtokollPage {

    public calenderData:any;
    public dataReady:boolean;
    public refresher: any;

  constructor(private bvKalenderService:KalenderProvider, public navCtrl: NavController, public navParams: NavParams) {
      this.getCalData();
      this.dataReady=false;
  }

    doRefresh(rf) {
        this.refreshCalData(rf);
    }

    getCalData() {
        this.bvKalenderService.getPastProben()
            .then(data => {
                this.calenderData = data;
                this.dataReady=true;
            });
    }

    refreshCalData(refresher) {
        this.bvKalenderService.getPastProben()
            .then(data => {
                this.calenderData = data;
                refresher.complete();
            });
    }



}
