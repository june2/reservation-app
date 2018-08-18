import React, { Component } from 'react';
import { Container } from 'reactstrap';
import HomeContainer from './containers/HomeContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <HomeContainer />
      </Container>
    );
  }
}

export default App;
