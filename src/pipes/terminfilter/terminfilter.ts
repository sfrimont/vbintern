import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TerminfilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'terminfilter',
})
export class TerminfilterPipe implements PipeTransform {


  // Keine Probentermine anzeigen deren Ort noch nicht feststehen


  transform(termin: any[]) {
  	   var neueTermine = termin.filter(item => (!item.summary.includes("Probe ")));
    // console.log(neueTermine);
    return neueTermine;
  	
  }

}
