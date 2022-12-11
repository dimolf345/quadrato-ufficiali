import { createAction, props } from '@ngrx/store';
import { User } from '../../modules/shared/models/user.model';

export const setUser = createAction('[USER] SET_USER', props<{ user: User }>());
export const resetUser = createAction('[USER] RESET_USER');
