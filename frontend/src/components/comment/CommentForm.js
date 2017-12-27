import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm} from 'redux-form';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button, HelpBlock } from 'react-bootstrap';

/**
 * Frontend validation functionality when adding a new comment or modify an existing one.
 * There is a server-side validation as well with the same conditionals,
 * but only for create a new comment.
 */
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

/**
 * renderField handles errors, warnings and renders form fields
 * of types input and textarea.
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
 * CommentForm component handles modal form of the comment.
 * We us redux-form to handle form data and validate them.
 */
let CommentForm = ({ handleSubmit, comment, modify, loading }) => {
  return (
    <Form onSubmit={handleSubmit} horizontal>
      {!modify && (
        <Field
          name="author"
          component={renderField}
          type="text"
          placeholder="Author"
          label="Author"
        />
      )}
      <Field
        name="body"
        component={renderField}
        label="Text"
        type="textarea"
        placeholder="Text"
      />
      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit" disabled={loading} bsStyle="primary">
            {loading ? 'Saving...' : modify ? 'Save' : 'Add Comment'}
          </Button>
        </Col>
      </FormGroup>
    </Form>
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