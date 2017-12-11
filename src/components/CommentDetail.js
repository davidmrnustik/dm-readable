import React from 'react';
import PropTypes from 'prop-types';

const CommentDetail = ({ author, body, openModifyModal, onClickDelete }) => {
  return (
    <div className='comment-detail'>
      <div className='comment-author'><em>{author}</em></div>
      <div className='comment-body'>{body}</div>
      <button onClick={openModifyModal}>Modify</button>
      <button onClick={onClickDelete}>Delete</button>
      <div> ------------------ </div>
    </div>
  )
}

CommentDetail.propTypes = {
  author: PropTypes.string,
  body: PropTypes.string,
  openModifyModal: PropTypes.func,
  onClickDelete: PropTypes.func
}

export default CommentDetail;