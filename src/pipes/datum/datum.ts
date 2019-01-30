import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DatumPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'datum',
})
export class DatumPipe implements PipeTransform {
  /**
   * Konvertiert ein Datum in einen String
   */
  transform(value: string): string {
   
    if (value != undefined) {
                        let wochentag = new Date(value).getDay();
                        let wochentagBez:string;
                        if (wochentag==0) wochentagBez="So, ";
                        if (wochentag==1) wochentagBez="Mo, ";
                        if (wochentag==2) wochentagBez="Di, ";
                        if (wochentag==3) wochentagBez="Mi, ";
                        if (wochentag==4) wochentagBez="Do, ";
                        if (wochentag==5) wochentagBez="Fr, ";
                        if (wochentag==6) wochentagBez="Sa, ";
                        return (wochentagBez + new Date(value).toLocaleDateString());
    } else
                        return null;
  }
}
