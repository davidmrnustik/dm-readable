import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm} from 'redux-form';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button, HelpBlock } from 'react-bootstrap';

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