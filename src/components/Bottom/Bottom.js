import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';
import './Bottom.scss';

@inject("store")
@observer
class Bottom extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
        let mobile=this.props.store.util.getMobileClassName();
        return(
            <Container fluid className={`bottom-container ${mobile}`}>
                <Row className='bottom-row'>
                    <span >©PickStudio, 2020</span>
                    <div className='bottom-button-editor'>경기콕콕을 만든 사람들</div>
                </Row>
            </Container>
        )
    }
}
export default Bottom;
