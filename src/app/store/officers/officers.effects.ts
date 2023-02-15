import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OfficerService } from './../../services/officers.service';
import * as fromOfficer from './officers.actions';
import * as fromUI from '../ui/ui.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class OfficersEffects {
  resetOfficer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficer.resetCurrentOfficer),
      map(() =>
        fromOfficer.setCurrentOfficer({
          officer: null,
        })
      )
    )
  );

  getLoggedOfficerProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficer.getLoggedOfficer),
      switchMap((action) =>
        this.officerService.getOfficerByEmail(action.email).pipe(
          map((result) =>
            fromOfficer.setCurrentOfficer({
              officer: this.authService.isAuthenticated.value
                ? result[0]
                : null,
            })
          ),
          catchError((err: any) => {
            return of(
              fromUI.showErrorMessage({
                message: err.message,
              }),
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
    private authService: AuthService
  ) {}
}
