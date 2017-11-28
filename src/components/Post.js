import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as APIUtil from '../util/api';
import CommentList from './CommentList';
import Loading from './Loading';

class Post extends Component {
  constructor(props) {
    super(props);
      
    this.state = {
      comments: [],
      commentIsLoading: false
    }
  }

  componentDidMount() {
    this.setState({ commentIsLoading: true });
    APIUtil.fetchData(`posts/${this.props.post.id}/comments`)
      .then(
        response => response.json(),
        error => console.log('An error occured', error)
      )
      .then(comments => (
        this.setState({
          comments,
          commentIsLoading: false
        })
      ))
  }

  render() {
    const { post, postIsFetching } = this.props;
    const { comments, commentIsLoading } = this.state;

    return (
      <div className='post' style={{ marginBottom: 10 }}>
        {postIsFetching ? <Loading/> : (
          <div>
            <h2 className='post-title'>{post.title}</h2>
            <span className='post-author'>{post.author}</span>
            <div className='post-comments'>Comments: {post.commentCount}</div>
            <div className='post-voteScore'>Votes: {post.voteScore}</div>
            <hr/>
            <h4>Comments</h4>
            {commentIsLoading ? <Loading/> : <CommentList comments={comments}/>}
          </div>
        )}
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.any,
  postIsFetching: PropTypes.bool.isRequired
}

function mapStateToProps({ posts }, ownProps){
  const postID = ownProps.match ? ownProps.match.params.post_id : null;
  return {
    post: postID && posts.items.filter(post => post.id === postID)[0],
    postIsFetching: posts.isFetching
  }
}

export default connect(mapStateToProps)(Post);