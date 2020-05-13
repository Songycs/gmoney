import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Map,Category,isMobile} from 'components'
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
        let mobileFlag=isMobile.Android() || isMobile.iOS();
        return(
            <Container fluid>
                <Row className={`contents${mobileFlag ? '-mobile' : ''}`}>
                    <Map mobileFlag={mobileFlag}/>
                    <Category mobileFlag={mobileFlag}/>
                </Row>
            </Container>        
        )
    }
}
export default Contents;