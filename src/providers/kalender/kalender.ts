import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//import moment from 'moment';

/*
  Generated class for the KalenderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class KalenderProvider {

	private googleURL: string;

   

  constructor(public http: HttpClient) {}
  	
  

 getData() {
  return new Promise(resolve => {
      let heute = new Date();

      let year = heute.getFullYear();
      let month = heute.getMonth();
      let day = heute.getDate();
      let inZweiJahren = new Date(year + 2, month, day);



      this.googleURL= "https://www.googleapis.com/calendar/v3/calendars/arilvube4af7eb1sdiil44c2uk@group.calendar.google.com/events?key=AIzaSyBUfymwqsh1vimIuCjJhioO42MPH3Nk_FU&orderBy=startTime&singleEvents=true&maxResults=2500&timeMin="+heute.toISOString()+"&timeMax="+inZweiJahren.toISOString();
      this.http.get<object[]>(this.googleURL).subscribe(data => {
      resolve(data);
      console.log("Daten erfolgreich geladen");
      
    }, err => {
      console.log(err);
      
    });
  });
  
  }

    getPastProben() {
        return new Promise(resolve => {
            let heute = new Date();

            let year = heute.getFullYear();
            let month = heute.getMonth();
            let day = heute.getDate();
            let vorEinemJahr = new Date(year - 2, month, day);
            let gestern = new Date(year , month, day-1);

            this.googleURL= "https://www.googleapis.com/calendar/v3/calendars/arilvube4af7eb1sdiil44c2uk@group.calendar.google.com/events?key=AIzaSyBUfymwqsh1vimIuCjJhioO42MPH3Nk_FU&orderBy=startTime&singleEvents=true&maxResults=2500&timeMin="+vorEinemJahr.toISOString()+"&timeMax="+heute.toISOString();
            this.http.get<object[]>(this.googleURL).subscribe(data => {
                resolve(data);
                console.log("vorherige Proben erfolgreich geladen");

            }, err => {
                console.log(err);

            });
        });

    }
  

}
