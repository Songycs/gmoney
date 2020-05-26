import React, { Component } from 'react';
import {Container, } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';

import {  
  AppBar, 
  Map, 
  Bottom
} from '../../components'

import './home.scss'

@inject('store')
@observer
class Home extends Component {  
  constructor(props){
    super(props)
  } 
  render() {
    return (
        <Container fluid className={'home'}>
          <AppBar/>
          <Map/>
          <Bottom/>
        </Container>
    );
  }
}
export default Home;
