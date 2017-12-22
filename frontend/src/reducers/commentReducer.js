import * as actionTypes from '../constants';
import initialState from './initialState';

export function comments(state = initialState.comments, action) {
  const { comments, comment } = action;

  switch(action.type) {

    case actionTypes.RECEIVE_COMMENTS_SUCCESS:
      return comments;

    case actionTypes.ADD_COMMENT:
      return [
        ...state,
        Object.assign({}, comment)
      ];

    case actionTypes.UPDATE_COMMENT:
      return [
        ...state.filter(item => item.id !== comment.id),
        Object.assign({}, comment)
      ]

    default:
      return state;
  }
}

export function comment(state = initialState.comment, action) {
  const { comment } = action;

  switch(action.type) {

    case actionTypes.RECEIVE_COMMENT_SUCCESS:
      return comment;

    default:
      return state;
  }
}