import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUser from './officers.actions';
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
  on(fromUser.setCurrentOfficer, (state, { officer }) => ({
    ...state,
    currentOfficer: officer,
  })),
  on(fromUser.resetCurrentOfficer, (state) => ({
    ...state,
    currentOfficer: null,
  })),
  on(fromUser.setAvailableOfficers, (state, { officers }) => ({
    ...state,
    officers,
  }))
);

export const officerState = createFeatureSelector<OfficerState>('officers');

export const getIsAdmin = createSelector(
  officerState,
  (s) => s.currentOfficer?.ddq
);
