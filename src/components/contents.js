import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Map,Search} from 'components'

class Contents extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }   

    componentDidMount() {

    }//componentDidMount

    render() {
        return(
            <Container fluid>
                <Row className="contents">
                    <Map></Map>
                    <Search></Search>                 
                </Row>
            </Container>        
        )
    }
}
export default Contents;