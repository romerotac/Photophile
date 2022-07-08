import {createStore, combineReducers} from 'redux';
import { changeProfileOnClick } from './reducers';

const rootReducer = combineReducers ({
    profileData: changeProfileOnClick,
});

export const store = createStore(rootReducer);