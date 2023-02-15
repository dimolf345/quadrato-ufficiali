import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUI from './ui.actions';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface UIState {
  error: string;
}

const initialState: UIState = {
  error: '',
};

export const UIReducer = createReducer(
  initialState,
  on(fromUI.showErrorMessage, (state, { message }) => ({
    ...state,
    error: message,
  })),
  on(fromUI.resetErrorMessage, (state) => ({
    ...state,
    error: '',
  }))
);
