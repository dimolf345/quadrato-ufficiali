import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {
  open;

  constructor(public snackbar: MatSnackBar) {
    this.open = snackbar.open;
  }

  defaultSnackBar(
    message: string,
    theme: 'error' | 'standard' = 'standard',
    duration: number = 3000
  ) {
    this.snackbar.open(message, '', {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: theme === 'error' ? ['snackbar__error'] : [],
    });
  }
}
