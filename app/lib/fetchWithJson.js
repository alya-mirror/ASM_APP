
/* @flow */
import timeoutPromise from './timeoutPromise';
import {FETCH_REQUEST_TIMEOUT} from '../config';

const fetchWithJson = (url:string, type:string, data:any) => {
    return timeoutPromise(FETCH_REQUEST_TIMEOUT,
        fetch(url, {
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }));
};

export default fetchWithJson;
