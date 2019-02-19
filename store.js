import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const reconfigureBrowseData = state => ({
  title: state.title,
  collections: state._embedded.items,
  links: state._links,
  count: state.count,
  totla: state.total,
});

export const browseItems = (state = [], action) => {
  switch (action.type) {
    case 'SET_INITIAL_BROWSE_ITEMS':
      return action.browse;
    case 'UPDATE_BROWSE_ITEMS':
      return Object.assign({}, state, reconfigureBrowseData(action.browse));
    default:
      return state;
  }
};

export const reducers = combineReducers({
  browse: browseItems,
});

const initializeStore = (initialState = {}) => {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
};

export default initializeStore;
