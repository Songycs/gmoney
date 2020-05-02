import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import emptyImg from '../ef.png'
class MerchantList extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){

    }

    render(){
        return(
            <Container fluid>
                <Row className='merchant-list'>
                    <div className='empty-list'>
                        <div className='caption'>
                            <p>경기지역화폐, 어디서 쓸 수 있지?</p>
                            <p>경기도 방방곳곳</p>
                            <p>콕콕 찝어 알려드릴게요</p>
                        </div>
                        <img src={emptyImg}/>
                    </div>
                </Row>
            </Container>
        )
    }
    
}
export default MerchantList;