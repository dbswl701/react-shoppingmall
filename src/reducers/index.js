// const counter = (state, action) => {
//   switch (action.type) {
//     case "INCREMENT":
//       return state + 1
//     case "DECREMENT":
//       return state - 1
//     default:
//       return state
//   }
// }

// export default counter;

import { combineReducers } from 'redux';
import items from './items';
// import todos from './todos';

const rootReducer = combineReducers({
  items,
  // todos
});

export default rootReducer;