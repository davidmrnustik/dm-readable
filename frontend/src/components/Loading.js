import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ text }) => {
  return (
    <div className='loading'>
      <p>{text || 'Loading...'}</p>
    </div>
  )
}

Loading.propTypes = {
  text: PropTypes.string
}

export default Loading;