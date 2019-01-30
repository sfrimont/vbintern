import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the UhrzeitPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'uhrzeit',
})
export class UhrzeitPipe implements PipeTransform {
  /**
   * Extrahiert die Uhrzeit
   */
  transform(value: string): string {
    if (value !== undefined)
                        return value.substring(11,16) + " Uhr";
                    else
                        return null;
  }
}
