import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { UIState } from '../store/ui/ui.reducers';
import { startLoading } from '../store/ui/ui.actions';
import { UserService } from './user.service';
import { stopLoading } from 'src/app/store/ui/ui.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private ui: Store<UIState>,
    private user: UserService
  ) {}

  async login(email: string, password: string) {
    this.ui.dispatch(startLoading());

    try {
      const response = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );
      if (response.user) {
        await this.user.getUserFromEmail(email);
      }
      this.ui.dispatch(stopLoading());
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
