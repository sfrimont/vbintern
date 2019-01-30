import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ProbenfilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'probenfilter',
})
export class ProbenfilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(termin: any[]) {
      var neueTermine = termin.filter(item => (item.summary.includes("Probe ")));
      // console.log(neueTermine);
      return neueTermine;

  }
}
