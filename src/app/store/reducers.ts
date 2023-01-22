import { OfficerState, OfficersReducer } from './officers/officers.reducers';
import { routerReducer } from '@ngrx/router-store';

export const reducers = {
  officers: OfficersReducer,
  router: routerReducer,
};

export interface AppState {
  officers: OfficerState;
}
