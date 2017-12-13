import { combineReducers } from 'redux';
import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  REQUEST_POST_UPDATE,
  RECEIVE_POSTS,
  ADD_POST,
  UPDATE_POST,
  REQUEST_COMMENTS,
  REQUEST_COMMENT_UPDATE,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT
} from '../constants';

const initialState = {
  isFetching: false,
  isUpdating: false,
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

    case REQUEST_POST_UPDATE :
      return Object.assign({}, state, {
        isUpdating: true
      });

    case RECEIVE_POSTS :
      return Object.assign({}, state, {
        isFetching: false,
        items: posts.filter(post => !post.deleted)
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
        ],
        isFetching: false,
        isUpdating: false
      });

    default:
      return state;
  }
}

function comments(state = initialState, action) {
  const { comments, comment } = action;

  switch(action.type) {
    case REQUEST_COMMENTS :
      return Object.assign({}, state, {
        isFetching: true
      });

    case REQUEST_COMMENT_UPDATE :
      return Object.assign({}, state, {
        isUpdating: true
      });

    case RECEIVE_COMMENTS :
      return Object.assign({}, state, {
        isFetching: false,
        items: comments.filter(comment => !comment.deleted)
      });

    case ADD_COMMENT :
      return Object.assign({}, state, {
        isFetching: false,
        items: [
          ...state.items,
          comment
        ]
      })

    case UPDATE_COMMENT :
      return Object.assign({}, state, {
        isFetching: false,
        items: [
          ...state.items.filter(item => item.id !== comment.id),
          comment
        ],
        isUpdating: false
      });

    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  comments
});