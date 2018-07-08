

import {applyMiddleware, createStore} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';

let logger = createLogger();

const middleware = __DEV__ ? [ thunk, logger ] : [ thunk ];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const configureStore = (onComplete:?() => void) => {
    const store = autoRehydrate()(createStoreWithMiddleware)(reducers);
    // add list of reducers where persist of state is not required like overlay, drawer
    persistStore(store, {storage: AsyncStorage, blacklist: [ 'overlay' ]}, onComplete);
    return store;
};

export default configureStore;
