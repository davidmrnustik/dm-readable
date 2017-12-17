import * as actionTypes from '../constants';
import initialState from './initialState';

export default function comments(state = initialState.comments, action) {
  const { comments, comment } = action;

  switch(action.type) {

    case actionTypes.RECEIVE_COMMENTS:
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