import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button, HelpBlock } from 'react-bootstrap';

/**
 * Frontend validation functionality when adding a new post or modify an existing one.
 * There is a server-side validation as well with the same conditionals,
 * but only for create a new post.
 * https://redux-form.com/7.2.0/examples/
 */
 const validate = values => {
  const errors = {}
  if(!values.title){
    errors.title = 'Required'
  } else if (values.title.length < 3) {
    errors.title = 'Title must have 3 characters at least.'
  }
  if(!values.author){
    errors.author = 'Required'
  } else if (values.author.length < 2) {
    errors.author = 'Author must have 2 characters at least.'
  }
  if(!values.body){
    errors.body = 'Required'
  } else if (values.body.length < 5) {
    errors.body = 'Body must have 5 characters at least.'
  }
  if(!values.category){
    errors.category = 'Required'
  }
  return errors
}

/**
 * renderField handles errors, warnings and renders form fields
 * of types input and textarea.
 * https://redux-form.com/7.2.0/examples/
 */
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <FormGroup
    controlId='formBasicText'
    validationState={touched && ((error && 'error') || (warning && 'warning') || 'success') || null}
  >
    <Col componentClass={ControlLabel} sm={2}>
      {label}
    </Col>
    <Col sm={10}>
      {type === 'textarea'
        ? <FormControl
            {...input}
            componentClass="textarea"
            placeholder={label}
          />
        : <FormControl
            {...input}
            placeholder={label}
            type={type}
          />
      }
      <FormControl.Feedback />
        
      {touched &&
        ((error && <HelpBlock>{error}</HelpBlock>) ||
          (warning && <HelpBlock>{warning}</HelpBlock>))}
    </Col>
  </FormGroup>
)

/**
 * renderField handles errors, warnings and renders form fields
 * of types select.
 * https://stackoverflow.com/questions/39493993/redux-form-v6-show-validation-error-for-select-field
 */
const renderSelect = ({
  input,
  label,
  type,
  children,
  meta: { touched, error, warning }
}) => (
  <FormGroup
    controlId='formBasicText'
    validationState={touched && ((error && 'error') || (warning && 'warning') || 'success') || null}
  >
    <Col componentClass={ControlLabel} sm={2}>
      {label}
    </Col>
    <Col sm={10}>
      <FormControl
          componentClass="select"
          placeholder="select"
          {...input}
      >
        {children}
      </FormControl>
      <FormControl.Feedback />

      {touched &&
        ((error && <HelpBlock>{error}</HelpBlock>) ||
          (warning && <HelpBlock>{warning}</HelpBlock>))}
    </Col>
  </FormGroup>
)

/**
 * PostForm component handles modal form of the post.
 * We us redux-form to handle form data and validate them.
 * https://redux-form.com/7.2.0/examples/
 */
let PostForm = ({ handleSubmit, categories, post, modify, loading }) => {
  return (
    <Form onSubmit={handleSubmit} horizontal>
      <Field
        name="title"
        component={renderField}
        type="text"
        placeholder="Title"
        label="Post Title"
      />
      {!modify && (
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
          <Field
            name="author"
            component={renderField}
            type="text"
            placeholder="Author"
            label="Post Author"
          />
        </div>
      )}
      <Field
        name="body"
        component={renderField}
        label="Post text"
        type="textarea"
        placeholder="Text"
      />
      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit" disabled={loading} bsStyle="primary">
            {loading ? 'Saving...' : modify ? 'Save' : 'Add Post'}
          </Button>
        </Col>
      </FormGroup>
    </Form>
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