import React from 'react';
import { Button, Container, Icon, Header, Segment } from 'semantic-ui-react';

const LoginForm = () => (
  <Segment inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>
  <Container text>
    <Header
      as='h1'
      content='Crypto Currency Tracker'
      inverted
      style={{
        fontSize: '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '3em',
      }}
    />
    <Header
      as='h2'
      content='Where Crypto Currencies meet...'
      inverted
      style={{
        fontSize: '1.7em',
        fontWeight: 'normal',
        marginTop: '1.5em',
        marginBottom: '1.5em',
      }}
    />
    <a href='/auth/google'>
      <Button primary size='huge'>
        Login with Google
        <Icon name='right arrow' />
      </Button>
    </a>
  </Container>
  </Segment>
);

export default LoginForm;
