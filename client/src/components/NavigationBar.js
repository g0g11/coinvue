import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Image, Menu, Button, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../resources/logo.png';

class NavigationBar extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div>
            <a href='/auth/google'>
              <Button inverted secondary size='large'>Log in</Button>
            </a>
            <Button as='a' style={{ marginLeft: '0.5em' }} inverted secondary size='large'>Sign Up</Button>
          </div>
        );
      default:
        const options = [
          { key: 'settings', text: 'Settings', icon: 'settings', as: 'a', to: '/' },
          { key: 'sign-out', text: 'Sign out', icon: 'sign out', as: 'a', href: '/api/auth/logout' },
        ];

        const trigger = (
          <span>
            <Image avatar src={ this.props.auth.picture } />
            { this.props.auth.firstName }
          </span>
        );

        return (
          <div>
            <Dropdown options={ options } trigger={ trigger } pointing='top left' icon={ null } />
          </div>
        );
    }
  }

  render() {
    return (
      <Menu className='navbar' fixed='top' animation='uncover' inverted>
        <Container>
          <Menu.Item header>
            <Link to={ this.props.auth ? '/dashboard' : '/login' }>
              <Image size='small' src={ logo } style={{ marginRight: '1.5em' }} />
            </Link>
          </Menu.Item>
          <Menu.Item as={ Link } to='/dashboard'>Dashboard</Menu.Item>
          <Menu.Item as={ Link } to='/overview'>Coin overview</Menu.Item>
          <Menu.Item as={ Link } to='/exchanges'>Exchanges</Menu.Item>
          <Menu.Item position='right'>
            { this.renderContent() }
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(NavigationBar);
