import { UIReducer } from './ui/ui.reducers';
import { OfficersReducer } from './officers/officers.reducers';
import { routerReducer } from '@ngrx/router-store';

export const reducers = {
  ui: UIReducer,
  officers: OfficersReducer,
  router: routerReducer,
};
