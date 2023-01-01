import { Injectable, OnDestroy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Movement } from '../shared/models/movement.model';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { OfficerService } from './officers.service';

import * as admin from 'firebase-admin';
import { Officer } from '../shared/models/officer.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovementsService implements OnDestroy {
  private movementsCollection: AngularFirestoreCollection<Movement>;
  private movementsSub: Subscription = new Subscription();
  public movements: BehaviorSubject<Movement[] | any> = new BehaviorSubject([]);

  constructor(
    private afs: AngularFirestore,
    private officerService: OfficerService,
    private auth: AuthService
  ) {
    this.movementsCollection = this.afs.collection<Movement>('movimenti');
    // Prevents error when logging out from dashboard
    this.auth.isAuthenticated.subscribe(
      (isAuth) => !isAuth && this.movementsSub.unsubscribe()
    );
  }

  addMovement() {}

  fetchMovements() {
    this.movementsSub = this.movementsCollection
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
  ngOnDestroy(): void {
    this.movementsSub.unsubscribe();
  }
}
