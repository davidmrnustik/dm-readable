import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_POST,
  UPDATE_POST,
  UPDATE_POST_COMMENT
} from '../constants';
import * as APIUtil from '../util/api';
import { getIDToken } from '../util/token';

function requestPosts () {
  return {
    type: REQUEST_POSTS
  }
}
function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}
export const fetchPosts = () => dispatch => (
  dispatch(requestPosts()),
  APIUtil
    .fetchData('posts')
    .then(json => dispatch(receivePosts(json)))
);

const addPost = post => {
  return {
    type: ADD_POST,
    post
  }
};

const updatePost = post => {
  return {
    type: UPDATE_POST,
    post
  }
};

const updatePostCommentCount = post => {
  return {
    type: UPDATE_POST_COMMENT,
    post
  }
};

export function updatePostComment(post) {
  const updatedPost = Object.assign({}, post, {
    commentCount: post.commentCount++
  });

  return function(dispatch) {
    return APIUtil
      .handleData('PUT', `posts/${updatedPost.id}`, JSON.stringify(updatedPost))
      .then(() => {
        dispatch(updatePostCommentCount(post))
      })
  }
}

export function modifyPost(post) {
  const updatedPost = Object.assign({}, post, {
    timestamp: +new Date()
  });
  
  return function(dispatch) {
    return APIUtil
      .handleData('PUT', `posts/${updatedPost.id}`, JSON.stringify(updatedPost))
      .then(() => {
        dispatch(updatePost(updatedPost))
      })
  }
}

export function savePost(post) {
  const updatedPost = Object.assign({}, post, {
    id: getIDToken(),
    timestamp: +new Date()
  });

  return function(dispatch) {
    return APIUtil
      .handleData('POST', 'posts', JSON.stringify(updatedPost))
      .then(() => {
        dispatch(addPost(updatedPost));
      })
  }
}