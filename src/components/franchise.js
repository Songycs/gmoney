import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import 'components/style.scss';
// import 'style.scss';

class Franchise extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <Container fluid>
                <Row>
                    {/* title */}
                    <div className='center tmpHeight night-blue'>
                        Franchise section
                        <li>1. #################</li>
                        <li>2. $$$$$$$$$$$$$$$$$</li>
                        <li>3. %%%%%%%%%%%%%%%%%</li>


                    </div>

                </Row>
            </Container>
        )
    }
}
export default Franchise;
