import { combineReducers } from 'redux';
import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POST_DETAIL,
  RECEIVE_POST_DETAIL,
  REQUEST_POSTS_BY_CATEGORY,
  RECEIVE_POSTS_BY_CATEGORY
} from '../constants';

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

function posts(state = {
  isFetching: false,
  items: []
}, action
){
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

function postDetail(state = {
  isFetching: false,
  item: {}
}, action
){
  const { postID } = action;

  switch(action.type) {
    case REQUEST_POST_DETAIL :
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_POST_DETAIL :
      return Object.assign({}, state, {
        isFetching: false,
        item: postID
      });
    default:
      return state;
  }
}

function postsByCategory(state = {
  isFetching: false,
  items: []
}, action
){
  const { posts } = action;

  switch(action.type) {
    case REQUEST_POSTS_BY_CATEGORY :
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_POSTS_BY_CATEGORY :
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
  posts,
  postDetail,
  postsByCategory
});