import React, { Component } from 'react';
import {Container, } from 'react-bootstrap';

import {  
  AppBar, 
  Contents, 
  Bottom,
  isMobile
} from '../../components'

class Home extends Component {  
  constructor(props){
    super(props)
  } 
  render() {
    let mobileFlag=isMobile.Android() || isMobile.iOS();
    return (
        <Container fluid className={`${mobileFlag? 'App-mobile': 'App'}`} >
          <AppBar/>
          <Contents/>          
          <Bottom/>
        </Container>
    );
  }
}
export default Home;
