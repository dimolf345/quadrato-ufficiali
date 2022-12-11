import { createReducer, on } from '@ngrx/store';
import * as fromUser from './user.actions';
import { User } from '../../modules/shared/models/user.model';

export interface IUser {
  currentUser: User | null;
}

const initialState: IUser = {
  currentUser: null,
};

export const userReducer = createReducer(
  initialState,
  on(fromUser.setUser, (_, { user }) => ({
    currentUser: user,
  })),
  on(fromUser.resetUser, () => ({
    currentUser: null,
  }))
);
