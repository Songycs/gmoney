import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Map,Category} from 'components'
import './Contents.scss'

class Contents extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }   

    componentDidMount() {

    }//componentDidMount

    render() {
        const {mobileFlag} = this.props;
        return(
            <Container fluid>
                <Row className={`contents${mobileFlag ? '-mobile' : ''}`}>
                    <Map></Map>
                    <Category mobileFlag={this.mobileFlag}></Category>
                </Row>
            </Container>        
        )
    }
}
export default Contents;