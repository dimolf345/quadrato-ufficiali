import { createReducer, on, createSelector } from '@ngrx/store';
import * as fromUser from './officers.actions';
import { Officer } from '../../shared/models/officer.model';

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
