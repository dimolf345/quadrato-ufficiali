import { Injectable, OnDestroy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import {
  BehaviorSubject,
  Observable,
  lastValueFrom,
  map,
  takeLast,
} from 'rxjs';
import { Account } from '../shared/models/account.model';
import { Movement } from '../shared/models/movement.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements OnDestroy {
  private accountDoc: AngularFirestoreDocument<Account> | null;
  account: BehaviorSubject<Account | any> = new BehaviorSubject(null);

  constructor(private afs: AngularFirestore) {
    this.accountDoc = this.afs.doc('/fondo/1QsXAQKQzQHk0iGHjftM');
    this.accountDoc.valueChanges({ idField: 'id_account' }).subscribe((x) => {
      this.account.next(x);
    });
  }

  updateBalance(
    newMovement: Movement,
    actionType: 'DEPOSIT' | 'WITHDRAW' | 'UPDATE',
    oldImport: number = 0
  ) {
    const oldBalance = this.account.value.saldo;
    switch (actionType) {
      case 'DEPOSIT':
        this.accountDoc?.update({
          saldo: oldBalance - newMovement.importo,
        });
        break;
      case 'WITHDRAW':
        this.accountDoc?.update({
          saldo: oldBalance + newMovement.importo,
        });
        break;
      case 'UPDATE':
        this.accountDoc?.update({
          saldo: oldBalance + oldImport - newMovement.importo,
        });
        break;
      default:
        return;
    }
  }

  ngOnDestroy(): void {
    this.accountDoc = null;
  }
}
