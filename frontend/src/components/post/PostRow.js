import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../common/Loading';
import { Link } from 'react-router-dom';
import { If, Then, Else } from 'react-if';
import { Panel, Button, Label, Row, Col } from 'react-bootstrap';
import VoteScore from '../common/VoteScore';
import Moment from 'react-moment';
import { styles } from '../common/styles';

/**
 * PostRow component renders post detail on post list type pages.
 */
const PostRow = ({ timestamp, id, title, author, category, commentCount, voteScore, body, onClickModify, onClickDelete, onClickUpvotePost, onClickDownvotePost, modify, loading }) => {
  const panelTitle = (
    <Row>
      <Col sm={8} xs={12}>
        <Link to={`${category}/${id}`}><strong>{title}</strong></Link>
        { ' ' }
        <em>by {author}</em>
        { ' ' }
        <Label>{category}</Label>
      </Col>
      <Col sm={4} xs={12} className='text-right'>
        <small style={styles.colorGray}>Published: <Moment format="DD MMMM YYYY">{timestamp}</Moment></small>
      </Col>
    </Row>
  )

  return (
    <Panel header={panelTitle}>
      <Row>
        <Col xs={6}>
          <ul className='list-inline'>
            <li>
              <VoteScore
                loading={loading}
                voteScore={voteScore}
                onClickUpvote={onClickUpvotePost}
                onClickDownvote={onClickDownvotePost}
              />
            </li>
            <li>
              <If condition={commentCount === 0}>
                <Then>
                  No comments yet.
                </Then>
                <Else>{() => 
                  commentCount > 1 ? `Comments: ${commentCount}` : `Comment: ${commentCount}`
                }</Else>
              </If>
            </li>
          </ul>
        </Col>
        <Col xs={6} className='text-right'>
          <div className='post-actions'>
            <Button bsStyle='primary' onClick={onClickModify}>Edit</Button>
            {' '}
            <Button onClick={onClickDelete}>Delete</Button>
          </div>
        </Col>
      </Row>
    </Panel>
  )
}

PostRow.propTypes = {
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

export default PostRow;