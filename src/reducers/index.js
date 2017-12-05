import { combineReducers } from 'redux';
import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_POST,
  UPDATE_POST
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
  const { posts, post } = action;

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

    case ADD_POST :
      return Object.assign({}, state, {
        items: [
          ...state.items,
          post
        ]
      });

    case UPDATE_POST :
      return Object.assign({}, state, {
        items: [
          ...state.items.filter(item => item.id !== post.id),
          post
        ]
      });

    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts
});