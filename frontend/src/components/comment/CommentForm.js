import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm} from 'redux-form';

const validate = values => {
  const errors = {}
  if(!values.author){
    errors.author = 'Required'
  } else if (values.author.length < 2) {
    errors.author = 'Author must be 2 characters at least.'
  }
  if(!values.body){
    errors.body = 'Required'
  } else if (values.body.length < 3) {
    errors.body = 'Body must be 3 characters at least.'
  }
  return errors
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      {type === 'textarea' ? <textarea {...input}>{label}</textarea> : <input {...input} placeholder={label} type={type} />}
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

let CommentForm = ({ handleSubmit, comment, modify, loading }) => {
  return (
    <form onSubmit={handleSubmit}>
      {!modify && (
        <div>
          <Field
            name="author"
            component={renderField}
            type="text"
            placeholder="Author"
            label="Author"
          />
        </div>
      )}
      <div>
        <Field
          name="body"
          component={renderField}
          label="Text"
          type="textarea"
          placeholder="Text"
        />
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
  loading: PropTypes.bool.isRequired,
  modify: PropTypes.bool,
  comment: PropTypes.object.isRequired
}

CommentForm = reduxForm({
  form: 'commentForm',
  validate
})(CommentForm);

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.comment
  }
}

export default connect(mapStateToProps)(CommentForm);