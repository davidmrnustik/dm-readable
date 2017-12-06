import {
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
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
    .then(
      response => response.json(),
      error => console.log('An error occured', error)
    )
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
    return APIUtil
      .handleData('PUT', `comments/${updatedComment.id}`, JSON.stringify(updatedComment))
      .then(
        response => response.json(),
        error => console.log('An error occured', error)
      )
      .then(() => {
        dispatch(updateComment(updatedComment));
      })
  }
}

export function saveComment(comment) {
  const updatedComment = Object.assign({}, comment, {
    id: getIDToken(),
    timestamp: +new Date()
  });

  return function(dispatch) {
    return APIUtil
      .handleData('POST', 'comments', JSON.stringify(updatedComment))
      .then(
        response => response.json(),
        error => console.log('An error occured', error)
      )
      .then(() => {
        dispatch(addComment(updatedComment));
      })
  }
}