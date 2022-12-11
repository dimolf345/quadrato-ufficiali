import { createReducer, on } from '@ngrx/store';
import * as fromUI from './ui.actions';

export interface UIState {
  isLoading: boolean;
}

const initialState = {
  isLoading: false,
};

export const UIReducer = createReducer(
  initialState,
  on(fromUI.startLoading, () => ({
    isLoading: true,
  })),
  on(fromUI.stopLoading, () => ({
    isLoading: false,
  }))
);

export const getIsLoading = (state: UIState) => state.isLoading;
