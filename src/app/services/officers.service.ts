import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { lastValueFrom, map, take } from 'rxjs';
import { Officer } from '../shared/models/officer.model';
import {
  resetCurrentOfficer,
  setAvailableOfficers,
  setCurrentOfficer,
} from '../store/officers/officers.actions';
import { OfficerState } from '../store/officers/officers.reducers';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class OfficerService {
  constructor(
    private firestore: AngularFirestore,
    private snackbar: SnackbarService,
    private officer: Store<{ officers: OfficerState }>
  ) {}

  async getOfficerByEmail(email: string): Promise<Officer | boolean> {
    try {
      const search = this.firestore
        .collection('ufficiali', (ref) => ref.where('email', '==', email))
        .snapshotChanges()
        .pipe(
          take(1),
          map((results) => {
            if (!results.length) return false;
            else return results[0].payload.doc.data() as Officer;
          })
        );
      return lastValueFrom(search);
    } catch (error) {
      return false;
    } finally {
    }
  }

  watchCurrentOfficer(email: string) {
    return this.firestore
      .collection<Officer>('ufficiali', (ref) =>
        ref.where('email', '==', email)
      )
      .valueChanges({ idField: 'id_ufficiale' })
      .subscribe((officer) => {
        if (officer.length) {
          this.officer.dispatch(
            setCurrentOfficer({
              officer: officer[0],
            })
          );
        }
      });
  }

  getOfficerByReference(
    reference: DocumentReference
  ): Promise<DocumentData | undefined> | undefined {
    let officer;
    try {
      officer = reference.get().then((value) => value.data());
    } catch (error) {
      if (error instanceof Error) {
        this.snackbar.defaultSnackBar(error.message, 'error');
      }
    }
    return officer;
  }

  getAvailableOfficers() {
    return this.firestore
      .collection<Officer>('ufficiali', (ref) =>
        ref.where('attivo', '==', true)
      )
      .valueChanges({ idField: 'id_ufficiale' })
      .subscribe((officers) =>
        this.officer.dispatch(setAvailableOfficers({ officers }))
      );
  }
}
