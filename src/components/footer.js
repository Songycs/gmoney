import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'components/style.scss';
//import 'style.scss';

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
        return(
            <Container fluid>
                <Row className='center tmpHeight sand'>
                    <div >
                    PIKA STUDIO / 2020 Apr
                    </div>

                </Row>
            </Container>
        )
    }
}
export default Footer;
