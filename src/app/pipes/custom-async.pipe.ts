import { Pipe, PipeTransform } from '@angular/core';
import { Movement } from '../shared/models/movement.model';
import { Officer } from '../shared/models/officer.model';

@Pipe({
  name: 'customAsync',
})
export class CustomAsyncPipe implements PipeTransform {
  transform(value: Officer | null) {
    if (value) return `${value.grado} ${value.nome} ${value.cognome}`;
    else return;
  }
}
