import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment, onClickModify, onClickDelete }) => {
  return (
    <div className='comment-detail'>
      <span className='comment-author'>Author: {comment.author}</span><br/>
      <span className='comment-voteScore'>{Math.abs(comment.voteScore) > 1 ? 'Votes' : 'Vote'}: {comment.voteScore}</span><br/>
      <span className='comment-body'>Text: {comment.body}</span><br/>
      <button onClick={onClickModify}>Modify</button>
      <button onClick={onClickDelete}>Delete</button>
      <div> ------------------------------------ </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onClickModify: PropTypes.func,
  onClickDelete: PropTypes.func
}

export default Comment;