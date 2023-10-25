import { combineReducers } from 'redux';
import items from './items';
import user from './user';

const rootReducer = combineReducers({
  items,
  user
});

export default rootReducer;