import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, takeWhile, take, takeUntil } from 'rxjs';
import { Officer } from '../shared/models/officer.model';
import * as fromOfficers from '../store/officers/officers.actions';
import { OfficerState } from '../store/officers/officers.reducers';
import { SnackbarService } from './snackbar.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class OfficerService {
  constructor(
    private firestore: AngularFirestore,
    private snackbar: SnackbarService,
    private officerStore: Store<{ officers: OfficerState }>,
    private auth: AngularFireAuth
  ) {}

  // on Login loads the logged officer profile and gets the active officers in order to same them into the store
  setLoggedAndActiveOfficers(loggedEmail: string): void {
    this.officerStore.dispatch(
      fromOfficers.getLoggedOfficer({
        email: loggedEmail,
      })
    );
    this.officerStore.dispatch(fromOfficers.getActiveOfficers());
  }

  getOfficerByEmail(email: string): Observable<Officer[]> {
    return this.firestore
      .collection<Officer>('ufficiali', (ref) =>
        ref.where('email', '==', email)
      )
      .valueChanges({ idField: 'id_ufficiale' });
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

  getActiveOfficers(): Observable<Officer[]> {
    return this.firestore
      .collection<Officer>('ufficiali', (ref) =>
        ref.where('attivo', '==', true)
      )
      .valueChanges({ idField: 'id_ufficiale' });
  }

  resetCurrentOfficer(): void {
    this.officerStore.dispatch(fromOfficers.resetCurrentOfficer());
  }
}
