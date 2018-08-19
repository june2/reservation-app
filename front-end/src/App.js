import React, { Component } from 'react';
import { Container } from 'reactstrap';
import HomeContainer from './containers/HomeContainer';

class App extends Component { 
  render() {
    return (
      <Container>
        <HomeContainer />
      </Container>
    );
  }
}

export default App;
