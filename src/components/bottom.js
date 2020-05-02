import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'components/style.scss';

class Bottom extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
        return(
            <Container fluid>
                <Row>
                    <div >
                    PIKA STUDIO / 2020 Apr
                    </div>
                </Row>
            </Container>
        )
    }
}
export default Bottom;
