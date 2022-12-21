import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Account } from '../shared/models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountDoc: AngularFirestoreDocument<Account>;
  account: Observable<Account | undefined> = new Observable();

  constructor(private afs: AngularFirestore) {
    this.accountDoc = this.afs.doc('/fondo/1QsXAQKQzQHk0iGHjftM');
    this.account = this.accountDoc.valueChanges({ idField: true });
  }

  updateBalance(movement: any) {}
}
