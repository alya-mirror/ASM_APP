
import timeoutPromise from './timeoutPromise';
import {FETCH_REQUEST_TIMEOUT} from '../config';

const fetchWithAuth = (url: string, type: string, data: any, token: string) => {
    let fetchUrl = url;
    let request = {
        method: type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    };
    if (type.toUpperCase() !== 'GET') {
        request.body = JSON.stringify(data);
    }
    else {
        const str = [];
        Object.keys(data).forEach(key => {
            str.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[ key ])}`);
        });
        const body = str.join('&');
        fetchUrl = `${url}?${body}`;
    }
    
    return timeoutPromise(FETCH_REQUEST_TIMEOUT,
        fetch(fetchUrl, request));
};

export default fetchWithAuth;
