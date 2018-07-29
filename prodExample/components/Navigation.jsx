import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from 'reactstrap';
import { Zoom, Fade } from 'react-reveal';
import classNames from 'classnames';
import offset from 'document-offset';
import PropTypes from 'prop-types';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.state = {
      isOpen: false,
      dimensions: {
        offsetTop: 0,
      },
    };
  }

  onScroll() {
    const target = document.querySelector('.navbar');
    const { top } = offset(target);

    this.setState({
      dimensions: {
        offsetTop: top,
      }
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { isOpen } = this.state;
    const { offsetTop } = this.state.dimensions;
    const { theme } = this.props;

    const darkTheme = classNames(
      {
        'navbar-dark': offsetTop > 0 || _.isEqual(theme, 'dark')
      },
    );

    return (
      <Navbar fixed="top" color="light" light expand="lg" className={classNames({'isOpen': isOpen, 'navbar-dark': darkTheme})}>
        <Container>
          <NavbarBrand>
            <NavLink to='/'>
              <img src={require(`../../img/${'logo-white'}.png`)} className="img-fluid" alt="logo"/>
            </NavLink>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className='justify-content-lg-between align-items-lg-center py-2'>
              <NavItem>
                <NavLink exact={true} activeClassName="link-active" to="/" className="nav-link nav-link-large">Рекламодателям</NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact={true} activeClassName="link-active" to="/bloggers" className="nav-link nav-link-large">Блогерам</NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact={true} activeClassName="link-active" to="/contacts" className="nav-link">Контакты</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/login" className="btn btn-success btn-inline">Войти</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  // avilable themes: "default", "dark"
  theme: PropTypes.string
}

export {
  Navigation
}