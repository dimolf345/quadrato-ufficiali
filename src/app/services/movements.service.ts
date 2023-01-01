import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Movement } from '../shared/models/movement.model';
import { BehaviorSubject, map } from 'rxjs';
import { OfficerService } from './officers.service';

import * as admin from 'firebase-admin';
import { Officer } from '../shared/models/officer.model';

@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  private movementsCollection: AngularFirestoreCollection<Movement>;
  public movements: BehaviorSubject<Movement[] | any> = new BehaviorSubject([]);
  test: any;

  constructor(
    private afs: AngularFirestore,
    private officerService: OfficerService
  ) {
    this.movementsCollection = this.afs.collection<Movement>('movimenti');
    this.fetchMovements();
    this.test = this.afs.doc<Officer>('ufficiali/OrhFo4uNk7e9WQUFA8BX');
  }

  addMovement() {
    const testMovement: Movement = {
      importo: 99.99,
      descrizione: 'Movimento aggiunto da API',
      effettuato_da: this.test.ref,
      data_pagamento: new Date(),
      creato_il: new Date(),
      categoria: 'amari',
      note: 'Porco dio funziona',
    };
    this.movementsCollection.add(testMovement);
  }

  fetchMovements() {
    this.movementsCollection
      .valueChanges({ idField: 'id_movimento' })
      .pipe(
        map((movementsArr: Movement[]) =>
          movementsArr.map((mov: Movement) => {
            const officer = this.officerService.getOfficerByReference(
              mov.effettuato_da
            );

            return {
              ...mov,
              data_pagamento: (
                mov.data_pagamento as admin.firestore.Timestamp
              ).toDate(),
              effettuato_da: officer,
            };
          })
        )
      )
      .subscribe((movs) => {
        this.movements.next(movs);
      });
  }
}
