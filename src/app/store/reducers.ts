import { UIReducer, UIState } from './ui/ui.reducers';
import { OfficerState, OfficersReducer } from './officers/officers.reducers';
import { routerReducer } from '@ngrx/router-store';

export const reducers = {
  ui: UIReducer,
  officers: OfficersReducer,
  router: routerReducer,
};

export interface AppState {
  ui: UIState;
  officers: OfficerState;
}
