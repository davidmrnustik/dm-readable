import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ author, voteScore, body, onClickModify, onClickDelete, onClickUpvoteComment, onClickDownvoteComment, isUpdating }) => {
  return (
    <div className='comment-detail'>
      <span className='comment-author'>Author: {author}</span><br/>
      <div className='comment-voteScore'>{Math.abs(voteScore) > 1 ? 'Votes' : 'Vote'}: 
        <span className='comment-vote'>
          <small>
            {isUpdating
              ? <span style={{ color: 'gray' }}>DOWNVOTE </span>
              : <a href='#' onClick={onClickDownvoteComment}>DOWNVOTE </a>
            }
          </small>
          <strong>{isUpdating ? <span style={{ color: 'gray' }}>{voteScore}</span> : voteScore}</strong>
          <small>
            {isUpdating
              ? <span style={{ color: 'gray' }}> UPVOTE</span>
              : <a href='#' onClick={onClickUpvoteComment}> UPVOTE</a>
            }
          </small>
        </span>
      </div><br/>
      <span className='comment-body'>Text: {body}</span><br/>
      <button onClick={onClickModify}>Modify</button>
      <button onClick={onClickDelete}>Delete</button>
      <div> ------------------------------------ </div>
    </div>
  )
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  body: PropTypes.string,
  onClickModify: PropTypes.func,
  onClickDelete: PropTypes.func,
  onClickUpvoteComment: PropTypes.func,
  onClickDownvoteComment: PropTypes.func
}

export default Comment;