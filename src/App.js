import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route , Switch} from 'react-router-dom';
import {Container, Row} from 'react-bootstrap';

//import from routes for links
import {Home, } from './routes';
//import from components
import './App.css';

import Store from "./stores"
import { Provider } from "mobx-react"

const store = new Store();

class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      loading: true
    }
  } 
  
  render() {
    return (
    <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Row>
          <Switch>
            <Route exact path = "/" component={Home}/>
          </Switch>
        </Row>
      </Fragment>
    </BrowserRouter>
    </Provider>
    );
  }
}
export default App;

