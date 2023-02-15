import { createAction, props } from '@ngrx/store';

export const showErrorMessage = createAction(
  '[UI] SHOW_ERROR_MESSAGE',
  props<{ message: string }>()
);

export const resetErrorMessage = createAction('[UI] RESET_ERROR_MESSAGE');
