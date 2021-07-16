import {combineReducers} from 'redux';

import {reducerApp} from '../reducers/reducerApp';

const allReducer = combineReducers({
  appState: reducerApp,
});

export default allReducer;
