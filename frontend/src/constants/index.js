export const API_URL = 'http://localhost:3001';
export const API_HEADERS = {
  'Authorization': 'readable-project-davidmrnustik',
  'Content-Type': 'application/json'
};

export const RECEIVE_CATEGORIES_SUCCESS = 'RECEIVE_CATEGORIES_SUCCESS';

export const RECEIVE_POSTS_SUCCESS = 'RECEIVE_POSTS_SUCCESS';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const UPDATE_POST = 'UPDATE_POST';
export const UPVOTE_POST_SUCCESS = 'UPVOTE_POST_SUCCESS';
export const DOWNVOTE_POST_SUCCESS = 'DOWNVOTE_POST_SUCCESS';

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

export const BEGIN_AJAX_CALL = 'BEGIN_AJAX_CALL';