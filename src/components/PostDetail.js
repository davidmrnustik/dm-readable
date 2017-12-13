import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostDetail = ({ id, title, author, category, commentCount, voteScore, body, onClickModify, onClickDelete, modify, showDetail = false }) => {
  return (
    <div className='post-detail'>
      <div className='post-title'>
      {showDetail
        ? <h2>{title}</h2>
        : <Link to={`${category}/${id}`}>{title}</Link>
      }
      </div>
      <span className='post-author'>Author: {author}</span>
      <div className='post-category'>Category: {category}</div>
      <div className='post-comments'>{commentCount > 1 ? 'Comments' : 'Comment'}: {commentCount}</div>
      <div className='post-voteScore'>{Math.abs(voteScore) > 1 ? 'Votes' : 'Vote'}: {voteScore}</div>
      <button onClick={onClickModify}>Edit</button>
      <button onClick={onClickDelete}>Delete</button>
      <hr/>
      {showDetail && (
        <p>{body}</p>
      )}
    </div>
    )
}

PostDetail.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  voteScore: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  showDetail: PropTypes.bool.isRequired,
  modify: PropTypes.bool.isRequired,
  onClickModify: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired
}

export default PostDetail;