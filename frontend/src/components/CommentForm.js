import React from 'react';
import PropTypes from 'prop-types';

const CommentForm = ({ onSubmit, onChange, comment, modify, loading }) => {
  return (
    <form onSubmit={onSubmit}>
      {!modify && (
        <div>
          <input
            type='text'
            name='author'
            value={comment.author}
            onChange={onChange}
            placeholder='Author'/>
        </div>
      )}
      <div>
        <textarea
          name='body'
          value={comment.body}
          onChange={onChange}
          placeholder='Comment text'>
        </textarea>
      </div>
      <div>
        <button
          type='submit'
          disabled={loading}
        >
          {loading ? 'Saving...' : modify ? 'Save' : 'Add Comment'}
        </button>
      </div>
    </form>
  )
}

CommentForm.postTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  modify: PropTypes.bool,
  comment: PropTypes.object.isRequired
}

export default CommentForm;