import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import { If, Then, Else } from 'react-if';
import { styles } from './styles';

/**
 * VoteScore component handles voting mechanism.
 * It is imported into postlist, post and comment.
 */
const VoteScore = ({ voteScore, onClickUpvote, onClickDownvote, loading }) => {
  return (
    <div className='post-voteScore'>
      <ul className='list-inline'>
        <li>
          <If condition={loading}>
            <Then>
              <Button bsSize='xsmall' disabled>
                <Glyphicon glyph="minus"/>
              </Button>
            </Then>
            <Else>{() => 
              <Button bsSize='xsmall' onClick={onClickDownvote} >
                <Glyphicon glyph="minus"/>
              </Button>
            }</Else>
          </If>
        </li>
        <li>
          <h4 style={styles.removeMargin}>
            {loading ? <span style={styles.colorGray}>{voteScore}</span> : voteScore}
          </h4>
        </li>
        <li>
          {loading
            ? <Button bsSize='xsmall' disabled>
                <Glyphicon glyph="plus"/>
              </Button>
            : <Button bsSize='xsmall' onClick={onClickUpvote}>
                <Glyphicon glyph="plus"/>
              </Button>
          }
        </li>
      </ul>
    </div>
  )
}

VoteScore.propTypes = {
  voteScore: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  onClickUpvote: PropTypes.func.isRequired,
  onClickDownvote: PropTypes.func.isRequired
}

export default VoteScore;