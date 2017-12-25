import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Loading from './Loading';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  }

  render() {
    const { loading, categories, location } = this.props;

    return (
      <div className='header'>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>
                Readable
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer exact={true} to='/'>
                <NavItem eventKey={1}>
                  Home
                </NavItem>
              </LinkContainer>
              {categories.map(category => (
                <LinkContainer to={`/${category.path}`} key={category.path}>
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
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default withRouter(connect(mapStateToProps)(Header));