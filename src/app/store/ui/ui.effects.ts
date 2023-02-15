import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnackbarService } from 'src/app/services/snackbar.service';
import * as fromUI from './ui.actions';

import { tap, map } from 'rxjs';

@Injectable()
export class UIEffects {
  showSnackbarError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUI.showErrorMessage),
      map(({ message }) => {
        this.snackbarService.defaultSnackBar(message);
        return fromUI.resetErrorMessage();
      })
    )
  );

  constructor(
    private actions$: Actions,
    private snackbarService: SnackbarService
  ) {}
}
