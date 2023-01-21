import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { UIState } from '../../store/ui/ui.reducers';
import { Store } from '@ngrx/store';
import { startLoading } from '../../store/ui/ui.actions';
import { SnackbarService } from '../../services/snackbar.service';
import { stopLoading } from 'src/app/store/ui/ui.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  canRegister: boolean = false;
  loading$: Observable<boolean> = new Observable();

  constructor(
    private auth: AuthService,
    private store: Store<{ ui: UIState }>,
    private snackbar: SnackbarService
  ) {
    this.loading$ = this.store
      .select('ui')
      .pipe(map((state: UIState) => state.isLoading));
  }
  ngOnInit(): void {}

  async verifyEmail(emailInput: HTMLInputElement) {
    this.store.dispatch(startLoading());
    try {
      const result = await this.auth.verifyEmail(emailInput.value);
      if (!result) {
        this.snackbar.defaultSnackBar(
          `L'indirizzo email ${emailInput.value} non è presente all'interno del DB. Contattare il direttore di quadrato.`,
          'error'
        );
        return;
      } else {
        this.canRegister = true;
      }
    } catch (error) {
      if (error instanceof Error) {
        this.snackbar.defaultSnackBar(error.message, 'error');
      }
    } finally {
      this.store.dispatch(stopLoading());
    }
  }

  onSubmit(form: NgForm) {
    const { email, password, confirm_password } = form.value;
    console.log(form);
    console.log(password, confirm_password);
    if (password !== confirm_password) {
      this.snackbar.defaultSnackBar(
        'Le due password non corrispondono',
        'error'
      );
      return;
    }
    this.auth.signup(email, password);
  }
}
