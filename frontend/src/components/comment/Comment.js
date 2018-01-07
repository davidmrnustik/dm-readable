import React from 'react';
import PropTypes from 'prop-types';
import VoteScore from '../common/VoteScore';
import Moment from 'react-moment';
import { Button, Panel, Row, Col } from 'react-bootstrap';
import { styles } from '../common/styles';

/**
 * Comment component renders comment detail on post detail page.
 */
const Comment = ({
  author,
  timestamp,
  voteScore,
  body,
  onClickModify,
  onClickDelete,
  onClickUpvoteComment,
  onClickDownvoteComment,
  loading }) => {
  const footer = (
    <Row>
      <Col xs={6}>
        <em>Author: {author}</em>
      </Col>
      <Col xs={6} className='text-right'>
        <small style={styles.publishedDate}>Published: <Moment format="DD MMMM YYYY">{timestamp}</Moment></small>
      </Col>
    </Row>
  )
  return (
    <div className='comment-detail'>
      <Panel footer={footer}>
        <p style={styles.commentBody}>{body}</p>
        <Row>
          <Col xs={6}>
            <VoteScore
              loading={loading}
              voteScore={voteScore}
              onClickUpvote={onClickUpvoteComment}
              onClickDownvote={onClickDownvoteComment}
            />
          </Col>
          <Col xs={6} className='text-right'>
            <div className='post-actions'>
              <Button
                bsStyle='primary'
                onClick={onClickModify}
                bsSize='small'
              >
                Edit Comment
              </Button>
              {' '}
              <Button
                onClick={onClickDelete}
                bsSize='small'
              >
                Delete
              </Button>
            </div>
          </Col>
        </Row>
      </Panel>
    </div>
  )
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  voteScore: PropTypes.number.isRequired,
  body: PropTypes.string,
  onClickModify: PropTypes.func,
  onClickDelete: PropTypes.func,
  onClickUpvoteComment: PropTypes.func,
  onClickDownvoteComment: PropTypes.func,
  loading: PropTypes.bool.isRequired
}

export default Comment;