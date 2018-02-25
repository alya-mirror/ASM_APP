
/* @flow */
import {
    ENTER_PASSWORD,
    PASSWORD_MORE_THAN_SIX,
    PASSWORD_ATLEAST_ONE_LETTER,
    PASSWORD_ATLEAST_ONE_DIGIT,
    PASSWORD_SHOULD_BE_SAME
} from '../utils/WarningErrorConstants';

export const validatePassword = (password?:string):?string => {
    if (!password) {
        return ENTER_PASSWORD;
    }
    if (password.length < 6) {
        return PASSWORD_MORE_THAN_SIX;
    }
    if (password.search(/[a-z]/i) < 0) {
        return PASSWORD_ATLEAST_ONE_LETTER;
    }
    if (password.search(/[0-9]/) < 0) {
        return PASSWORD_ATLEAST_ONE_DIGIT;
    }
    return null;
};

export const validateConfirmPassword = (password:string, confirmPassword:string):string => {
    let errorMessage = validatePassword(confirmPassword);
    if (errorMessage) {
        return errorMessage;
    }
    if (password !== confirmPassword) {
        return PASSWORD_SHOULD_BE_SAME;
    }
    return null;
};

export const validateEmail = (email:?string):?string => {
    if (!email) {
        return 'Please enter email address.';
    }
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
        return 'Please enter email address.';
    }
    return null;
};

export const validateName = (name:?string):?string => {
    if (!name) {
        return 'Please enter name.';
    }
    return null;
};

export const validateAddress = (address:?string):?string => {
    if (!address) {
        return 'Please enter address.';
    }
    return null;
};

export const validateMobile = (mobile:?string):?string => {
    if (!mobile) {
        return 'Please enter mobile number.';
    }
    if (!Number.isInteger(Number(mobile)) || mobile.length !== 10) {
        return 'Please enter mobile number.';
    }
    return null;
};

export const validateOtp = (otp) => {
    if (!otp) {
        return 'Please enter OTP.';
    }
    if (!Number.isInteger(Number(otp)) || otp.length !== 5) {
        return 'Please enter OTP.';
    }
    return null;
};
