import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Loading from './Loading';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/**
 * Header component renders top navigation.
 * It receives categories props from store.
 */
const Header = ({ categories, loading }) => {
  return (
    <div className='header'>
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/' replace>
              Readable
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer exact={true} to='/' replace>
              <NavItem eventKey={1}>
                Home
              </NavItem>
            </LinkContainer>
            {categories.map(category => (
              <LinkContainer to={`/${category.path}`} key={category.path} replace>
                <NavItem eventKey={2}>
                  {category.name}
                </NavItem>
              </LinkContainer>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

Header.propTypes = {
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default withRouter(connect(mapStateToProps)(Header));