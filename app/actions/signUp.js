//@flow
import {
    SIGNUP_COMPLETED
} from '../utils/Constants';
import {Action, ThunkAction, Dispatch} from '../types';
import {SERVICE_URL} from '../config';
import fetchWithFormData from '../lib/fetchWithFormData';
import SignUp from "../components/Auth/SignUp";

const SignUpCompletedData = (data:any):Action => {
    return {
        user: {
            token: data.access_token,
            name: data.name,
            expires: new Date(data[ '.expires' ])
        },
        type: SIGNUP_COMPLETED
    };
};

const _SignUp = async (dispatch:Dispatch, email:string, password:string, firstName:string) => {
    try {
        let data = {email, password, firstName, grant_type: 'password'};
        let response = await fetchWithFormData(SERVICE_URL, 'post', data, 'application/x-www-form-urlencoded');
        let result = await response.json();
        if (response.status !== 200) {
            return {message: result.message || response.statusText};
        }
        return dispatch(SignUpCompletedData(result));
    }
    catch (error) {
        return {message: error.message};
    }
};



const signUp = (email, password,firstName):ThunkAction => (dispatch:Dispatch) => _SignUp(dispatch, email, password,firstName);


module.exports = {signUp};
