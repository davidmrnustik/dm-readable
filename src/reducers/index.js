import { combineReducers } from 'redux';
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from '../constants';

function categories(state = {
  isFetching: false,
  items: []
}, action
){
  const { categories } = action;

  switch(action.type) {
    case REQUEST_CATEGORIES :
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_CATEGORIES :
      return Object.assign({}, state, {
        isFetching: false,
        items: categories['categories']
      });
    default:
      return state;
  }
}

export default combineReducers({
  categories
});