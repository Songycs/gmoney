import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import {Container, } from 'react-bootstrap';

import {Intro, Map, Category, Franchise, Footer} from 'components'

class Home extends Component {
  render() {
    return (
    
        <Container fluid>
          <Intro/>
          <Map/>
          <Category/>
          <Franchise/>
          <Footer/>
        </Container>

    );
  }
}
export default Home;
