export const API_URL = 'http://localhost:3001';
export const API_HEADERS = {
  'Authorization': 'readable-project-davidmrnustik',
  'Content-Type': 'application/json'
};

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const REQUEST_POST_UPDATE = 'REQUEST_POST_UPDATE';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const INCREASE_POST_COMMENT_COUNT = 'INCREASE_POST_COMMENT_COUNT';
export const DECREASE_POST_COMMENT_COUNT = 'DECREASE_POST_COMMENT_COUNT';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const REQUEST_COMMENT_UPDATE = 'REQUEST_COMMENT_UPDATE';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';

export const SORT_POST_DEFAULT = '-timestamp';
export const SORT_POST_ITEMS = [
  { name: "Newest", value: "-timestamp"},
  { name: "Oldest", value: "timestamp"},
  { name: "Best voted", value: "-voteScore"},
  { name: "Worst voted", value: "voteScore"},
  { name: "Title A-Z", value: "title"},
  { name: "Title Z-A", value: "-title"}
];
export const SORT_COMMENT_DEFAULT = SORT_POST_DEFAULT;
export const SORT_COMMENT_ITEMS = [
  { name: "Newest", value: "-timestamp"},
  { name: "Oldest", value: "timestamp"},
  { name: "Best voted", value: "-voteScore"},
  { name: "Worst voted", value: "voteScore"},
  { name: "Author A-Z", value: "author"},
  { name: "Author Z-A", value: "-author"}
];