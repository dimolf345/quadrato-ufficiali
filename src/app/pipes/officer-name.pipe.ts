import { Pipe, PipeTransform } from '@angular/core';
import { Officer } from '../shared/models/officer.model';

@Pipe({
  name: 'officerName',
})
export class OfficerNamePipe implements PipeTransform {
  transform(value: Officer | null) {
    if (value) return `${value.grado || ''} ${value.nome} ${value.cognome}`;
    else return;
  }
}
