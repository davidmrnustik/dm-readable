import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PostDetail = (props) => {
  return (
    <div className='post' style={{ marginBottom: 10 }}>
      {!props.isFetching && (
        <div className='post-detail'>
          <div className='post-title'>
            <h2>{props.post.title}</h2>
          </div>
          <span className='post-author'>{props.post.author}</span>
          <div className='post-comments'>Comments: {props.post.commentCount}</div>
          <div className='post-voteScore'>Votes: {props.post.voteScore}</div>
        </div>
      )}
    </div>
  )
}

PostDetail.propTypes = {
  post: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps({ postDetail, isFetching }){
  return {
    post: postDetail.item,
    isFetching: postDetail.isFetching
  }
}

export default connect(mapStateToProps)(PostDetail);