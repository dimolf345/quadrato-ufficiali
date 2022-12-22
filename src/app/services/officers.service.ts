import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { lastValueFrom, map, pipe, take } from 'rxjs';
import { Officer } from '../shared/models/officer.model';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class OfficerService {
  constructor(
    private firestore: AngularFirestore,
    private snackbar: SnackbarService
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

  async getOfficerByReference(
    reference: DocumentReference
  ): Promise<DocumentData | undefined> {
    let officer;
    try {
      const temp = await reference.get();
      officer = temp.data();
    } catch (error) {
      if (error instanceof Error) {
        this.snackbar.defaultSnackBar(error.message, 'error');
      }
    }
    return officer;
  }
}
