
/* global XMLHttpRequest, FormData */

/* @flow */
//noinspection JSUnresolvedVariable
import {each, isEmpty, map} from 'lodash';
const fileUpload = (url:string, actionType:string, formParams:any, files:any, token:string, progressCallback) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(actionType, url);
        xhr.onload = () => {
            if (xhr.status !== 200 || !xhr.responseText) {
                return reject({message: xhr.responseText || 'Upload failed'});
            }
            return resolve(JSON.parse(xhr.responseText));
        };
        var formdata = new FormData();
        map(formParams, (value, key) => {
            formdata.append(key, JSON.stringify(value));
        });
        if (!isEmpty(files)) {
            each(files, (fileInfo) => {
                formdata.append('rx', {...fileInfo, type: 'image/jpg', name: 'image1.jpg'});
            });
        }
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                progressCallback(event.loaded, event.total, event.loaded / event.total);
            }
        };
        xhr.setRequestHeader('Authorization', `bearer ${token}`);
        xhr.send(formdata);
    });
};

export default fileUpload;
