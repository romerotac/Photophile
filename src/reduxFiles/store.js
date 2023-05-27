import {createStore, combineReducers, applyMiddleware} from 'redux';
import { postState, changeProfileOnClick, setLiked, commentState } from './reducers';
import thunk from 'redux-thunk';


const rootReducer = combineReducers ({
    profileData: changeProfileOnClick,
    postState: postState,
    like: setLiked,
    comments: commentState,
});

export const store = createStore(rootReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());