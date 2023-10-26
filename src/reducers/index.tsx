import { combineReducers } from 'redux';
import items from './items';
import user from './user';
import loading from './loading';

const rootReducer = combineReducers({
  items,
  user,
  loading
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;