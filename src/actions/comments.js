import {
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT
} from '../constants';
import * as APIUtil from '../util/api';
import { getIDToken } from '../util/token';

function requestComments () {
  return {
    type: REQUEST_COMMENTS
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