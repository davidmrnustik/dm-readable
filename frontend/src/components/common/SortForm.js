import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

/**
 * SortForm component renders select form that sorts posts and comments.
 */
const SortForm = ({ sort, onChange, items }) => {
  return (
    <Form inline>
      <FormGroup controlId="formInlineSortBy">
        <ControlLabel>Sort by:</ControlLabel>
        {' '}
        <FormControl
          componentClass="select"
          placeholder="select"
          name='sort-form'
          onChange={onChange}
          value={sort}
        >
          {items.map((item, index) => (
            <option
              key={index}
              value={item.value}
            >
              {item.name}
            </option>
          ))}
        </FormControl>
      </FormGroup>
    </Form>
  )
}

SortForm.propTypes = {
  sort: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SortForm;