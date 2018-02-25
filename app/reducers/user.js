
import {User, Action} from '../types';
import {
    LOGIN_COMPLETED,
    LOGOUT
} from '../utils/Constants';

const initialState:User = {
    id: null,
    name: 'Jodie Brigitte', // TODO -- remove default value in Production
    email: 'jodie.brigitte@gmail.com', // TODO -- remove default value in Production
    profileUrl: require('../../assets/profile/profile03.png'), // TODO -- remove default value in Production
    mobile: null,
    token: null,
    expiresIn: null,
  
};

const account = (state:User = initialState, action:Action):User => {
    switch (action.type) {
        case LOGIN_COMPLETED:
            return action.user;
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default account;
