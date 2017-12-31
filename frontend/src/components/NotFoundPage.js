import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = ({ location }) => {
  return (
    <div className='container'>
      <h2>Page Not Found :(</h2>
      <p>Sorry, this page <code>{location.pathname}</code> doesn't exist. Please follow visiting our app by go to the <Link to='/'>homepage</Link>.</p>
    </div>
  )
}

export default NotFoundPage;