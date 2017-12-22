import * as actionTypes from '../constants';
import * as APIUtil from '../util/api';
import { beginAjaxCall } from './ajaxStatus';
import { getIDToken } from '../util/token';

const receiveComments = comments => {
  return {
    type: actionTypes.RECEIVE_COMMENTS_SUCCESS,
    comments
  }
}

const receiveComment = comment => {
  return {
    type: actionTypes.RECEIVE_COMMENT_SUCCESS,
    comment
  }
}

const addComment = comment => {
  return {
    type: actionTypes.ADD_COMMENT,
    comment
  }
};

const updateComment = comment => {
  return {
    type: actionTypes.UPDATE_COMMENT,
    comment
  }
};

export const fetchComments = post => dispatch => {
  dispatch(beginAjaxCall());
  return APIUtil
    .fetchData(`posts/${post}/comments`)
    .then(data => dispatch(receiveComments(data)))
};

export const fetchComment = comment => dispatch => {
  dispatch(beginAjaxCall());
  return APIUtil
    .fetchData(`comments/${comment.id}`)
    .then(data => dispatch(receiveComment(data)))
};

export const modifyComment = comment => {
  const updatedComment = Object.assign({}, comment, {
    timestamp: +new Date()
  });
  
  return dispatch => {
    return APIUtil
      .handleData('PUT', `comments/${updatedComment.id}`, JSON.stringify(updatedComment))
      .then(data => dispatch(updateComment(data)))
  }
}

export const saveComment = (comment, post = null) => {
  const updatedComment = Object.assign({}, comment, {
    id: getIDToken(),
    timestamp: +new Date()
  });

  return dispatch => {
    return APIUtil
      .handleData('POST', 'comments', JSON.stringify(updatedComment))
      .then(data => dispatch(addComment(data)))
  }
}

export const updateCommentVote = (comment, type) => {
  let vote = {};

  switch(type) {
    case actionTypes.UPVOTE_COMMENT:
      vote.option = 'upVote';
      break;

    case actionTypes.DOWNVOTE_COMMENT:
      vote.option = 'downVote';
      break;

    default:
      vote = 'upVote';
  }

  return dispatch => {
    return APIUtil
      .handleData('POST', `comments/${comment.id}`, JSON.stringify(vote))
      .then(data => dispatch(updateComment(data))) 
  }
}

export const removeComment = comment => {
  const updatedComment = Object.assign({}, comment, {
    deleted: true
  });
  
  return dispatch => {
    return APIUtil
      .handleData('DELETE', `comments/${updatedComment.id}`, JSON.stringify(updatedComment))
      .then(data => dispatch(updateComment(data)))
  }
}

export const fetchPostCommentAndRemoveIt = post => dispatch => {
  APIUtil
    .fetchData(`posts/${post}/comments`)
    .then(comments => comments.map(comment => {
      dispatch(removePostComment(comment))
    }))
}

const removePostComment = comment => {
  const updatedComment = Object.assign({}, comment, {
    parentDeleted: true
  });
  
  return dispatch => {
    return APIUtil
      .handleData('DELETE', `comments/${updatedComment.id}`, JSON.stringify(updatedComment))
      .then(data => dispatch(updateComment(data)))
  }
}