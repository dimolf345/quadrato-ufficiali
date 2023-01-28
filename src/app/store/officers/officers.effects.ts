import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OfficerService } from './../../services/officers.service';

@Injectable()
export class OfficersEffects {
  constructor(
    private actions$: Actions,
    private officerService: OfficerService
  );
}
