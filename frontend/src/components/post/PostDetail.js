import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../common/Loading';
import { Link } from 'react-router-dom';
import { Panel, Button, Label, Row, Col, Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import VoteScore from '../common/VoteScore';

/**
 * PostDetail component renders details of the post.
 */
const PostDetail = ({ timestamp, id, title, author, category, commentCount, voteScore, body, onClickModify, onClickDelete, onClickUpvotePost, onClickDownvotePost, modify, loading }) => {
  return (
    <div>
      <Breadcrumb>
        <LinkContainer exact={true} to='/'>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to={`/${category}`}>
          <Breadcrumb.Item>{category}</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <h3>{title}</h3>
      <p>
        Author: {author}<br/>
        Category: {category}
      </p>
      <p className='lead'>{body}</p>
      <Row>
        <Col sm={6}>
          <VoteScore
            loading={loading}
            voteScore={voteScore}
            onClickUpvote={onClickUpvotePost}
            onClickDownvote={onClickDownvotePost}
          />
        </Col>
        <Col sm={6} className='text-right'>
          <Button bsStyle='primary' onClick={onClickModify}>Edit Post</Button>
          {' '}
          <Button onClick={onClickDelete}>Delete</Button>

        </Col>
      </Row>
    </div>
  )
}

PostDetail.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  voteScore: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  modify: PropTypes.bool.isRequired,
  onClickModify: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickUpvotePost: PropTypes.func.isRequired,
  onClickDownvotePost: PropTypes.func.isRequired
}

export default PostDetail;