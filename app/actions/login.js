//@flow
import {
    LOGOUT,
    LOGIN_COMPLETED
} from '../utils/Constants';
import {Action, ThunkAction, Dispatch} from '../types';
import {SERVICE_URL} from '../config';
import fetchWithFormData from '../lib/fetchWithFormData';

const loginCompletedData = (data:any):Action => {
    return {
        user: {
            token: data.access_token,
            name: data.name,
            expires: new Date(data[ '.expires' ])
        },
        type: LOGIN_COMPLETED
    };
};

const _login = async (dispatch:Dispatch, userName:string, password:string) => {
    try {
        let data = {userName, password, grant_type: 'password'};
        let response = await fetchWithFormData(SERVICE_URL, 'post', data, 'application/x-www-form-urlencoded');
        let result = await response.json();
        if (response.status !== 200) {
            return {message: result.message || response.statusText};
        }
        return dispatch(loginCompletedData(result));
    }
    catch (error) {
        return {message: error.message};
    }
};

const _clearAccount = () => {
    return {type: LOGOUT};
};

const _logout = async (dispatch:Dispatch) => {
    return dispatch(_clearAccount());
};

const login = (email, password, hospitalId):ThunkAction => (dispatch:Dispatch) => _login(dispatch, email, password, hospitalId);
const logout = ():ThunkAction => (dispatch:Dispatch) => _logout(dispatch);

module.exports = {login, logout};
