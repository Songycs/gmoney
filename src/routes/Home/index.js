import React, { Component } from 'react';
import {Container, } from 'react-bootstrap';

import {
  Top, 
  Contents, 
  Bottom
} from '../../components'

class Home extends Component {
  render() {
    return (    
        <Container fluid className='App'>
          <Top/>
          <Contents/>          
          <Bottom/>
        </Container>
    );
  }
}
export default Home;
