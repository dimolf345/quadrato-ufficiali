import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OfficerService } from './../../services/officers.service';
import * as fromOfficer from '../officers/officers.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Injectable()
export class OfficersEffects {
  getLoggedOfficerProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficer.getLoggedOfficer),
      mergeMap((action) =>
        this.officerService.getOfficerByEmail(action.email).pipe(
          map((result) =>
            fromOfficer.setCurrentOfficer({
              officer: result[0],
            })
          ),
          catchError((err) => {
            this.snackbarService.defaultSnackBar(
              (err as Error).message,
              'error'
            );
            return of(
              fromOfficer.setCurrentOfficer({
                officer: null,
              })
            );
          })
        )
      )
    )
  );

  getActiveOfficers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficer.getActiveOfficers),
      mergeMap(() =>
        this.officerService.getActiveOfficers().pipe(
          map((result) =>
            fromOfficer.setAvailableOfficers({
              officers: result,
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private officerService: OfficerService,
    private snackbarService: SnackbarService
  ) {}
}
