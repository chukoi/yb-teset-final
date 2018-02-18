/**
 * currencyConvert.pipe.ts
 *
 * @dateCreated 18/02/2018
 * @author Dean Heffernan
 */

// Imports.
import {Pipe, PipeTransform} from '@angular/core';

// Transforms number string to include commas.
@Pipe({name: 'currencyConvert'})
export class CurrencyConvertPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString();
  }
}
