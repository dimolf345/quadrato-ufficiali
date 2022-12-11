import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { UIState } from '../store/ui/ui.reducers';
import { startLoading } from '../store/ui/ui.actions';
import { UserService } from './user.service';
import { stopLoading } from 'src/app/store/ui/ui.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private ui: Store<{ ui: UIState }>,
    private user: UserService,
    private snackbar: MatSnackBar
  ) {}

  async verifyEmail(email: string): Promise<any> {
    this.ui.dispatch(startLoading());
    const result = await this.user.searchUserByEmail(email);
    if (result) return true;
    return false;
  }

  async login(email: string, password: string): Promise<string> {
    this.ui.dispatch(startLoading());
    try {
      const response = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );
      if (response.user) {
        await this.user.getUserFromEmail(email);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.snackbar.open(error.message, '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snackbar__error'],
        });
        return error.message;
      }
    } finally {
      this.ui.dispatch(stopLoading());
    }
    return '';
  }
}
