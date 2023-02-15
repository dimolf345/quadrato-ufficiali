import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { OfficerService } from './officers.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';
import { Officer } from '../shared/models/officer.model';
import { AppState } from '../store/reducers';
import { Store } from '@ngrx/store';
import * as fromOfficer from '../store/officers/officers.reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private auth: AngularFireAuth,
    private officerService: OfficerService,
    private snackbar: SnackbarService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user?.email) {
        this.officerService.setLoggedAndActiveOfficers(user.email);
        this.isAuthenticated.next(true);
        this.router.navigate(['', 'dashboard']);
      } else {
        this.isAuthenticated.next(false);
        this.officerService.resetCurrentOfficer();
        this.router.navigate(['']);
      }
    });
  }

  ngOnInit(): void {}

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
        return error.message;
      }
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
    this.auth.signOut();
  }
}
