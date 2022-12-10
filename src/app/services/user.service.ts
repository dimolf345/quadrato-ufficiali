import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { query, where } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _currentOfficer = new BehaviorSubject<any>(null);
  constructor(private firestore: AngularFirestore) {}

  async getUserFromEmail(email: string) {
    const officer = this.firestore
      .collection('ufficiali', (ref) => ref.where('email', '==', email))
      .valueChanges();
    console.log(officer);
  }
}
