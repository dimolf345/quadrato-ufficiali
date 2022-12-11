import { UIReducer } from './ui/ui.reducers';
import { userReducer } from './user/users.reducers';

export const reducers = {
  ui: UIReducer,
  user: userReducer,
};
