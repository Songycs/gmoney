import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import 'components/style.scss';
// import 'style.scss';

class Intro extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
        return(
            <Container fluid>
                <Row className='center tmpHeight night-blue'>
                    {/* title */}
                    <div>
                        지역화폐 가맹점 찾기
                    </div>

                    {/* description */}
                    <div>
                        description
                    </div>
                </Row>
            </Container>
        )
    }
}
export default Intro;
