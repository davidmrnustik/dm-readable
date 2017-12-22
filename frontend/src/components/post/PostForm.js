import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm} from 'redux-form';

const validate = values => {
  const errors = {}
  if(!values.title){
    errors.title = 'Required'
  } else if (values.title.length < 3) {
    errors.title = 'Title must be 3 characters at least.'
  }
  if(!values.author){
    errors.author = 'Required'
  } else if (values.author.length < 2) {
    errors.author = 'Author must be 2 characters at least.'
  }
  if(!values.body){
    errors.body = 'Required'
  } else if (values.body.length < 5) {
    errors.body = 'Body must be 5 characters at least.'
  }
  if(!values.category){
    errors.category = 'Required'
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

const renderSelect = ({
  input,
  label,
  type,
  children,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <select {...input}>
        {children}
      </select>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

let PostForm = ({ handleSubmit, categories, post, modify, loading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="title"
          component={renderField}
          type="text"
          placeholder="Title"
          label="Post Title"
        />
      </div>
      {!modify && (
        <div>
          <div>
            <Field name="category" component={renderSelect} type="select" label="Post Category">
              <option value=''>Select category</option>
              {categories.map(category => (
                <option
                  value={category.path}
                  key={category.path}
                >
                  {category.name}
                </option>
              ))}
            </Field>
          </div>
          <div>
            <Field
              name="author"
              component={renderField}
              type="text"
              placeholder="Author"
              label="Post Author"
            />
          </div>
        </div>
      )}
      <div>
        <Field
          name="body"
          component={renderField}
          label="Post text"
          type="textarea"
          placeholder="Text"
        />
      </div>
      <div>
        <button
          type='submit'
          disabled={loading}
        >
          {loading ? 'Saving...' : modify ? 'Save' : 'Add Post'}
        </button>
      </div>
    </form>
  )
}

PostForm.postTypes = {
  modify: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  categories: PropTypes.array,
  post: PropTypes.object.isRequired
}

PostForm = reduxForm({
  form: 'postForm',
  validate
})(PostForm);

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.post
  }
}

export default connect(mapStateToProps)(PostForm);