import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromOfficer from './officers.actions';
import { Officer } from '../../shared/models/officer.model';

export interface OfficerState {
  currentOfficer: Officer | null;
  officers: Officer[];
}

const initialState: OfficerState = {
  currentOfficer: null,
  officers: [],
};

export const OfficersReducer = createReducer(
  initialState,
  on(fromOfficer.setCurrentOfficer, (state, { officer }) => ({
    ...state,
    currentOfficer: officer,
  })),
  on(fromOfficer.setAvailableOfficers, (state, { officers }) => ({
    ...state,
    officers,
  }))
);

export const officerState = createFeatureSelector<OfficerState>('officers');

export const selectCurrentOfficer = createSelector(
  officerState,
  (s) => s.currentOfficer
);

export const getIsAdmin = createSelector(
  officerState,
  (s) => s.currentOfficer?.ddq
);

export const getAvailableOfficers = createSelector(
  officerState,
  (s) => s.officers
);
