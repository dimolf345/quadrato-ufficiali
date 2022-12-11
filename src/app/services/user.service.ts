import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, last, lastValueFrom, map, pipe, take } from 'rxjs';
import { User } from '../modules/shared/models/user.model';
import { IUser } from '../store/user/users.reducers';
import { setUser } from '../store/user/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private store: Store<{ user: IUser }>
  ) {}

  async searchUserByEmail(email: string): Promise<any> {
    try {
      const search = this.firestore
        .collection('ufficiali', (ref) => ref.where('email', '==', email))
        .snapshotChanges()
        .pipe(
          take(1),
          map((results) => {
            if (!results.length) return false;
            else return results[0].payload.doc.data();
          })
        );
      return lastValueFrom(search);
    } catch (error) {
      return false;
    } finally {
    }
  }

  // DA RIVEDERE ASSOLUTAMENTE

  async getUserFromEmail(email: string) {
    try {
      this.firestore
        .collection('ufficiali', (ref) => ref.where('email', '==', email))
        .snapshotChanges()
        .pipe(
          map((userObj) => {
            const user = userObj[0].payload.doc.data() as User;
            return {
              id: userObj[0].payload.doc.id,
              ...user,
            };
          })
        )
        .subscribe((officer) => {
          this.store.dispatch(setUser({ user: officer }));
        });
      this.router.navigate(['', 'dashboard']);
    } catch (error) {
      if (error instanceof Error) {
      }
    }
  }
}
