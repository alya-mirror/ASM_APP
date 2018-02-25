
/* @flow */
import timeoutPromise from './timeoutPromise';
import {FETCH_REQUEST_TIMEOUT} from '../config';

const fetchWithFormData = (url: string, type: string, formParams, contentType) => {
    
    const str = [];
    Object.keys(formParams).forEach(key => {
        str.push(`${encodeURIComponent(key)}=${encodeURIComponent(formParams[ key ])}`);
    });
    const body = str.join('&');
    
    let request = {
        method: type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': contentType,
        },
        body
    };
    return timeoutPromise(FETCH_REQUEST_TIMEOUT,
        fetch(url, request));
};

export default fetchWithFormData;
