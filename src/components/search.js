import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {MerchantList,Category} from 'components'

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        
    }

    render() {
        return(
            <Container fluid className='stretch column'>
                <Category></Category>
                <MerchantList></MerchantList>
            </Container>        
        )
    }
}
export default Search;
