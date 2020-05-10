import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {CategoryItem} from 'components'
import './Category.scss'

const INIT_RESULT_ITEM = {type:4}
class SearchResult extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        
    }

    render() {        
        return(
            <Container fluid>                
            </Container>        
        )
    }
}
export default SearchResult;
