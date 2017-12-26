import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';

const VoteScore = ({ voteScore, onClickUpvote, onClickDownvote, loading }) => {
  return (
    <div className='post-voteScore'>
      <ul className='list-inline'>
        <li>
          {loading
            ? <Button bsSize='xsmall' disabled>
                <Glyphicon glyph="minus"/>
              </Button>
            : <Button bsSize='xsmall' onClick={onClickDownvote} >
                <Glyphicon glyph="minus"/>
              </Button>
            }
        </li>
        <li>
          <h4 style={{ margin: 0 }}>
            {loading ? <span style={{ color: 'gray' }}>{voteScore}</span> : voteScore}
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