import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Movement } from '../shared/models/movement.model';
import { map, Observable, take } from 'rxjs';
import { OfficerService } from './officers.service';

@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  private movementsCollection: AngularFirestoreCollection<Movement>;
  movements: Observable<Movement[] | any> = new Observable();

  constructor(
    private afs: AngularFirestore,
    private officerService: OfficerService
  ) {
    this.movementsCollection = this.afs.collection<Movement>('movimenti');
    this.getMovements();
  }

  getMovements() {
    this.movements = this.movementsCollection
      .valueChanges({ idField: 'id' })
      .pipe(
        take(1),
        map((movementsArr: Movement[]) =>
          movementsArr.map(async (mov: Movement) => {
            const officer = await this.officerService.getOfficerByReference(
              mov.effettuato_da as DocumentReference
            );
            return {
              ...mov,
              data_pagamento: mov.data_pagamento.toDate(),
              effettuato_da: officer,
            };
          })
        )
      );
  }
}
