import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { lastValueFrom, map, switchMap, take, Observable } from 'rxjs';
import { Officer } from '../shared/models/officer.model';
import * as fromOfficers from '../store/officers/officers.actions';
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

  // on Login loads the logged officer profile and gets the active officers in order to same them into the store
  setLoggedAndActiveOfficers(loggedEmail: string) {
    this.officer.dispatch(
      fromOfficers.getLoggedOfficer({
        email: loggedEmail,
      })
    );
    this.officer.dispatch(fromOfficers.getActiveOfficers());
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
}
