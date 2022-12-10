import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { UIState } from '../store/ui/ui.reducers';
import { startLoading } from '../store/ui/ui.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private ui: Store<UIState>) {}

  login() {
    this.ui.dispatch(startLoading());
  }
}
