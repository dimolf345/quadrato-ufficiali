import { createReducer, on } from '@ngrx/store';
import { startLoading, stopLoading } from './ui.actions';

export interface UIState {
  isLoading: boolean;
}

const initialState = {
  isLoading: false,
};

export const UIReducer = createReducer(
  initialState,
  on(startLoading, () => ({
    isLoading: true,
  })),
  on(stopLoading, () => ({
    isLoading: false,
  }))
);

export const getIsLoading = (state: UIState) => state.isLoading;
