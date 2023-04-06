import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'telephone'})
export class TelephonePipe implements PipeTransform {

  transform(value: string | number): string {
    let telephoneString = value + '';

    telephoneString = telephoneString.replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1');

    return telephoneString;
  }

}
