import { createStore } from 'redux';
import rootReducers from './rootReducers';
import {persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key='root',
    storage
}


const persistedReducer = persistReducer(persistConfig,rootReducers);
const store = createStore(persistedReducer);

export {store,persistedReducer};