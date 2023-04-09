import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'cpf'})
export class CpfPipe implements PipeTransform {

  transform(value: string | number): string {
    let cpfString = value + '';

    cpfString = cpfString.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+$/, '$1');

    return cpfString;
  }

}
