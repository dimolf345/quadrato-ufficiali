import { createAction, props } from '@ngrx/store';
import { Officer } from 'src/app/shared/models/officer.model';

export const setCurrentOfficer = createAction(
  '[OFFICERS] SET_CURRENT_OFFICER',
  props<{ officer: Officer }>()
);
export const resetCurrentOfficer = createAction(
  '[OFFICERS] RESET_CURRENT_OFFICER'
);
