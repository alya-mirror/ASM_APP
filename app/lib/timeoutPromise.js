
/* @flow */

const timeoutPromise = (ms:number, promise:Promise, message:String = 'Request Timeout') => {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            return reject(new Error(message));
        }, ms);
        promise.then(
            (res) => {
                clearTimeout(timeoutId);
                return resolve(res);
            },
            (err) => {
                clearTimeout(timeoutId);
                return reject(err);
            }
        );
    });
};

export default timeoutPromise;
