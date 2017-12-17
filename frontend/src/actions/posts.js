import * as actionTypes from '../constants';
import { beginAjaxCall } from './ajaxStatus';
import * as APIUtil from '../util/api';
import { getIDToken } from '../util/token';

const receivePosts = posts => {
  return {
    type: actionTypes.RECEIVE_POSTS_SUCCESS,
    posts
  }
}

const addPost = post => {
  return {
    type: actionTypes.ADD_POST_SUCCESS,
    post
  }
};

const updatePost = post => {
  return {
    type: actionTypes.UPDATE_POST,
    post
  }
};

const fetchPosts = () => dispatch => {
  dispatch(beginAjaxCall());
  return APIUtil
    .fetchData('posts')
    .then(data => dispatch(receivePosts(data)))
};

const shouldFetchPosts = state => {
  const posts = state.posts.length;

  if (posts === 0) {
    return true
  } else if (posts.ajaxCallsInProgress > 0) {
    return false
  } else {
    return false
  }
}

export const fetchPostsIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts())
    } else {
      return Promise.resolve()
    }
  }
}

export const fetchPost = post => dispatch => {
  return APIUtil
    .fetchData(`posts/${post.id}`)
    .then(data => dispatch(updatePost(data)))
};

export const modifyPost = post => {
  const updatedPost = Object.assign({}, post, {
    timestamp: +new Date()
  });

  return dispatch => {
    return APIUtil
      .handleData('PUT', `posts/${updatedPost.id}`, JSON.stringify(updatedPost))
      .then(data => dispatch(updatePost(data)))
  }
}

export const savePost = post => {
  const updatedPost = Object.assign({}, post, {
    id: getIDToken(),
    timestamp: +new Date()
  });

  return dispatch => {
    dispatch(beginAjaxCall());
    return APIUtil
      .handleData('POST', 'posts', JSON.stringify(updatedPost))
      .then(data => dispatch(addPost(data)))
  }
}

export const updatePostVote = (post, type) => {
  let vote = {};

  switch(type) {
    case actionTypes.UPVOTE_POST_SUCCESS:
      vote.option = 'upVote';
      break;

    case actionTypes.DOWNVOTE_POST_SUCCESS:
      vote.option = 'downVote';
      break;

    default:
      vote = 'upVote';
  }

  return dispatch => {
    return APIUtil
      .handleData('POST', `posts/${post.id}`, JSON.stringify(vote))
      .then(data => dispatch(updatePost(data))) 
  }
}

export const removePost = post => {
  const updatedPost = Object.assign({}, post, {
    deleted: true
  });

  return dispatch => {
    return APIUtil
      .handleData('DELETE', `posts/${updatedPost.id}`, JSON.stringify(updatedPost))
      .then(data => dispatch(updatePost(data)))
  }
}