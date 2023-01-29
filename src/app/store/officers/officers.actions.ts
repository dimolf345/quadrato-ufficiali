import { createAction, props } from '@ngrx/store';
import { Officer } from 'src/app/shared/models/officer.model';

export const setCurrentOfficer = createAction(
  '[OFFICERS] SET_CURRENT_OFFICER',
  props<{ officer: Officer | null }>()
);
export const resetCurrentOfficer = createAction(
  '[OFFICERS] RESET_CURRENT_OFFICER'
);
export const setAvailableOfficers = createAction(
  '[OFFICERS] SET_AVAILABLE_OFFICERS',
  props<{ officers: Officer[] }>()
);

export const getLoggedOfficer = createAction(
  '[Login Page] GET_LOGGED_OFFICER_PROFILE',
  props<{ email: string }>()
);

export const getActiveOfficers = createAction(
  '[Dashboard] GET_ACTIVE_OFFICERS'
);

export const getLoggedOfficerError = createAction(
  '[Login Page] GET_LOGGED_OFFICER_ERROR',
  props<{ message?: string }>()
);
