import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [LoadingService],
})
export class SignupComponent implements OnInit {
  canRegister: boolean = false;
  isLoading$: Observable<boolean> = new Observable();

  constructor(
    private auth: AuthService,
    private snackbar: SnackbarService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.loading$;
  }

  async verifyEmail(emailInput: HTMLInputElement) {
    this.loadingService.startLoading();
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
      this.loadingService.stopLoading();
    }
  }

  async onSubmit(form: NgForm) {
    const { email, password, confirm_password } = form.value;
    if (password !== confirm_password) {
      this.snackbar.defaultSnackBar(
        'Le due password non corrispondono',
        'error'
      );
      return;
    }
    this.loadingService.startLoading();
    try {
      await this.auth.signup(email, password);
    } catch (error) {
      if (error instanceof Error) {
        this.snackbar.defaultSnackBar(error.message, 'error');
      }
    } finally {
      this.loadingService.stopLoading();
    }
  }
}
