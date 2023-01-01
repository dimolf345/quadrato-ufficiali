import { Injectable, OnDestroy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Account } from '../shared/models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements OnDestroy {
  private accountDoc: AngularFirestoreDocument<Account> | null;
  account: Observable<Account | undefined> = new Observable();

  constructor(private afs: AngularFirestore) {
    this.accountDoc = this.afs.doc('/fondo/1QsXAQKQzQHk0iGHjftM');
    this.account = this.accountDoc.valueChanges({ idField: true });
  }

  updateBalance(movement: any) {}

  ngOnDestroy(): void {
    this.accountDoc = null;
  }
}
