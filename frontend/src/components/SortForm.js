import React from 'react';
import PropTypes from 'prop-types';

const SortForm = ({ sort, onChange, items }) => {
  return (
    <div className='sort'>
      Sort by:
      <select
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
      </select>
    </div>
  )
}

SortForm.propTypes = {
  sort: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SortForm;