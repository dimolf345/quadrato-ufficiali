import { UIReducer, UIState } from './ui/ui.reducers';
import { OfficersReducer, OfficerState } from './officers/officers.reducers';

export const reducers = {
  ui: UIReducer,
  officers: OfficersReducer,
};

export interface AppState {
  ui: UIState;
  officers: OfficerState;
}
