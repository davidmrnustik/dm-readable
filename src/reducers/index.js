import { combineReducers } from 'redux';
import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../constants';

const initialState = {
  isFetching: false,
  items: []
}

function categories(state = initialState, action){
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

function posts(state = initialState, action){
  const { posts } = action;

  switch(action.type) {
    case REQUEST_POSTS :
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_POSTS :
      return Object.assign({}, state, {
        isFetching: false,
        items: posts
      });
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts
});