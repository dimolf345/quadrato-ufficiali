import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUser from './officers.actions';
import { Officer } from '../../shared/models/officer.model';
import { AppState } from '../reducers';

export interface OfficerState {
  currentOfficer: Officer | null;
}

const initialState: OfficerState = {
  currentOfficer: null,
};

export const OfficersReducer = createReducer(
  initialState,
  on(fromUser.setCurrentOfficer, (_, { officer }) => ({
    currentOfficer: officer,
  })),
  on(fromUser.resetCurrentOfficer, (_) => ({
    currentOfficer: null,
  }))
);

export const officerState = createFeatureSelector<OfficerState>('officers');

export const getIsAdmin = createSelector(
  officerState,
  (s) => s.currentOfficer?.ddq
);
