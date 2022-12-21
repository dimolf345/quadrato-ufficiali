import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Movement } from '../shared/models/movement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  private movementsCollection: AngularFirestoreCollection<Movement>;
  movements: Observable<Movement[]> = new Observable();

  constructor(private afs: AngularFirestore) {
    this.movementsCollection = this.afs.collection<Movement>('movimenti');
    this.movements = this.movementsCollection.valueChanges({
      idField: 'id_movimento',
    });
  }
}
