import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { UIState } from '../store/ui/ui.reducers';
import { startLoading } from '../store/ui/ui.actions';
import { OfficerService } from './officers.service';
import { stopLoading } from 'src/app/store/ui/ui.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OfficerState } from '../store/officers/officers.reducers';
import { resetCurrentOfficer } from '../store/officers/officers.actions';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MovementsService } from './movements.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentOfficer: Subscription = new Subscription();
  availableOfficers: Subscription = new Subscription();
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private auth: AngularFireAuth,
    private ui: Store<{ ui: UIState }>,
    private officerService: OfficerService,
    private snackbar: MatSnackBar,
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
    this.ui.dispatch(startLoading());
    const result = await this.officerService.getOfficerByEmail(email);
    if (result) return true;
    return false;
  }

  async login(email: string, password: string): Promise<string> {
    this.ui.dispatch(startLoading());
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
      this.ui.dispatch(stopLoading());
    }
    return '';
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
