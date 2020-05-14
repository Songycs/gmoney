import React, { Component } from 'react';
import {Container, } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';

import {  
  AppBar, 
  Contents, 
  Bottom,
  isMobile
} from '../../components'

@inject('store')
@observer
class Home extends Component {  
  constructor(props){
    super(props)
  } 
  render() {
    const store = this.props;
    let mobileFlag=isMobile.Android() || isMobile.iOS();
    return (
        <Container fluid className={`${mobileFlag? 'App-mobile': 'App'}`} >
          <AppBar/>
          <Contents store= {store}/>          
          <Bottom/>
        </Container>
    );
  }
}
export default Home;
