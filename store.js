import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

export const browse = (state = {}, action) => {
  return state;
};

export const reducers = combineReducers({
  browse,
});

const initializeStore = (initialState = {}) => {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
};

export default initializeStore;
