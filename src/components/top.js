import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../logo.svg'
import arrowright from '../arrow_right.svg'

class Top extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
        return(
            <Container fluid>
                <Row className='top'>                    
                    <div className='logo'>
                        <img src={logo} />
                    </div>
                    
                    <div className='editorlink'>
                        경기콕콕을 만든 사람들
                        <img src={arrowright} className='arrowright'/>
                    </div>
                </Row>
            </Container>
        )
    }
}
export default Top;
