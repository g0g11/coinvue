import React from 'react';
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, Sidebar, Button } from 'semantic-ui-react';
import logo from '../resources/logo.png';

const NavigationBar = () => {
  return (
    <Menu fixed='top' animation='uncover' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='small' src={ logo } style={{ marginRight: '1.5em' }} />
        </Menu.Item>
        <Menu.Item as='a'>Dashboard</Menu.Item>
        <Menu.Item as='a'>Coin overview</Menu.Item>
        <Menu.Item position='right'>
          <Button as='a' inverted pointing secondary size='large'>Log in</Button>
          <Button as='a' style={{ marginLeft: '0.5em' }} inverted pointing secondary size='large'>Sign Up</Button>
        </Menu.Item>
      </Container>
    </Menu>
  )
};

export default NavigationBar;
