import { OfficerState, OfficersReducer } from './officers/officers.reducers';
import { routerReducer } from '@ngrx/router-store';
import { UIReducer, UIState } from './ui/ui.reducers';

export const reducers = {
  officers: OfficersReducer,
  router: routerReducer,
  ui: UIReducer,
};

export interface AppState {
  officers: OfficerState;
  ui: UIState;
}
