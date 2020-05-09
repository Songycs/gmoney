import React, { Component } from 'react';
import {Container, } from 'react-bootstrap';
import isMobile from '../../utils/isMobile'

import {  
  AppBar, 
  Contents, 
  Bottom
} from '../../components'

class Home extends Component {  
  constructor(props){
    super(props)
  } 
  render() {
    let mobileFlag=isMobile.Android() || isMobile.iOS();
    return (
        <Container fluid className={`${mobileFlag? 'App-mobile': 'App'}`} >
          <AppBar mobileFlag={mobileFlag}/>
          <Contents mobileFlag={mobileFlag}/>          
          <Bottom mobileFlag={mobileFlag}/>
        </Container>
    );
  }
}
export default Home;
