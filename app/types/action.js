
import {
    LOGIN_COMPLETED,
    LOGOUT
} from '../utils/Constants';

import {User} from '../types';

// type ParseObject = Object;

export type Action =
        { type : LOGOUT}
        | { type : LOGIN_COMPLETED, user: User};

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
