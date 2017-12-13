import {
  REQUEST_COMMENTS,
  REQUEST_COMMENT_UPDATE,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT
} from '../constants';
import * as APIUtil from '../util/api';
import { getIDToken } from '../util/token';

function requestComments () {
  return {
    type: REQUEST_COMMENTS
  }
}
function requestCommentUpdate () {
  return {
    type: REQUEST_COMMENT_UPDATE
  }
}
function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}
export const fetchComments = (post) => dispatch => (
  dispatch(requestComments()),
  APIUtil
    .fetchData(`posts/${post}/comments`)
    .then(json => dispatch(receiveComments(json)))
);

const addComment = comment => {
  return {
    type: ADD_COMMENT,
    comment
  }
};

const updateComment = comment => {
  return {
    type: UPDATE_COMMENT,
    comment
  }
};

export function modifyComment(comment) {
  const updatedComment = Object.assign({}, comment, {
    timestamp: +new Date()
  });
  
  return function(dispatch) {
    dispatch(requestComments())
    return APIUtil
      .handleData('PUT', `comments/${updatedComment.id}`, JSON.stringify(updatedComment))
      .then(() => {
        dispatch(updateComment(updatedComment));
      })
  }
}

export function saveComment(comment, post = null) {
  const updatedComment = Object.assign({}, comment, {
    id: getIDToken(),
    timestamp: +new Date()
  });

  return function(dispatch) {
    dispatch(requestComments())
    return APIUtil
      .handleData('POST', 'comments', JSON.stringify(updatedComment))
      .then(() => {
        dispatch(addComment(updatedComment));
      })
  }
}

export const updateCommentVote = (comment, type) => {
  let vote = {};

  switch(type) {
    case UPVOTE_COMMENT:
      vote.option = 'upVote';
      break;

    case DOWNVOTE_COMMENT:
      vote.option = 'downVote';
      break;

    default:
      vote = 'upVote';
  }

  return function(dispatch) {
    dispatch(requestCommentUpdate())
    return APIUtil
      .handleData('POST', `comments/${comment.id}`, JSON.stringify(vote))
      .then(data => dispatch(updateComment(data))) 
  }
}

export function removeComment(comment) {
  const updatedComment = Object.assign({}, comment, {
    deleted: true
  });
  
  return function(dispatch) {
    dispatch(requestComments())
    return APIUtil
      .handleData('DELETE', `comments/${updatedComment.id}`, JSON.stringify(updatedComment))
      .then(() => {
        dispatch(updateComment(updatedComment));
      })
  }
}

export const fetchPostCommentAndRemoveIt = post => dispatch => {
  APIUtil
    .fetchData(`posts/${post}/comments`)
    .then(comments => comments.map(comment => {
      dispatch(removePostComment(comment))
    }))
}

export function removePostComment(comment) {
  const updatedComment = Object.assign({}, comment, {
    parentDeleted: true
  });
  
  return function(dispatch) {
    dispatch(requestComments())
    return APIUtil
      .handleData('DELETE', `comments/${updatedComment.id}`, JSON.stringify(updatedComment))
      .then(() => {
        dispatch(updateComment(updatedComment));
      })
  }
}