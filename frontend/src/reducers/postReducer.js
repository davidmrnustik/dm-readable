import * as actionTypes from '../constants';
import initialState from './initialState';

export function posts(state = initialState.posts, action){
  const { posts, post } = action;

  switch(action.type) {

    case actionTypes.RECEIVE_POSTS_SUCCESS:
      return posts;

    case actionTypes.ADD_POST_SUCCESS:
      return [
        ...state,
        Object.assign({}, post)
      ];

    case actionTypes.UPDATE_POST:
      return [
        ...state.filter(item => item.id !== post.id),
        Object.assign({}, post)
      ]

    default:
      return state;
  }
}

export function post(state = initialState.post, action){
  const { post } = action;

  switch(action.type) {

    case actionTypes.RECEIVE_POST_SUCCESS:
      return post;

    default:
      return state;
  }
}