import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { OfficerService } from './officers.service';
import { OfficerState } from '../store/officers/officers.reducers';
import { resetCurrentOfficer } from '../store/officers/officers.actions';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentOfficer: Subscription = new Subscription();
  availableOfficers: Subscription = new Subscription();
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private auth: AngularFireAuth,
    private officerService: OfficerService,
    private snackbar: SnackbarService,
    private router: Router,
    private officer: Store<{ officers: OfficerState }>
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user?.email) {
        this.currentOfficer = this.officerService.watchCurrentOfficer(
          user.email
        );
        this.availableOfficers = this.officerService.getAvailableOfficers();
        this.isAuthenticated.next(true);
        this.router.navigate(['', 'dashboard']);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  async verifyEmail(email: string): Promise<any> {
    const result = await this.officerService.getOfficerByEmail(email);
    if (result) return true;
    return false;
  }

  async login(email: string, password: string): Promise<string> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
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
    }
    return '';
  }

  async signup(email: string, password: string): Promise<void> {
    try {
      const user = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (user) this.snackbar.defaultSnackBar('Utente creato con successo');
      this.router.navigate(['', 'login']);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.snackbar.defaultSnackBar(error.message, 'error');
      }
    } finally {
    }
  }

  logout() {
    this.currentOfficer.unsubscribe();
    this.availableOfficers.unsubscribe();
    this.isAuthenticated.next(false);
    this.auth.signOut().then(() => {
      this.officer.dispatch(resetCurrentOfficer());
    });
  }
}
