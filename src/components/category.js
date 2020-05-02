import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import shop from '../shop.svg'

class Category extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        var categoryContainer = document.getElementById('category');
    }

    render() {
        return(
            <Container fluid>
                <Row className='category'>
                    <div className='title'>
                        <img src={shop}/>업장 카테고리
                    </div>
                    <div className='body' id='category'>
                        <div className='row'>
                            <div className='btn'>1</div>
                            <div className='btn'>1</div>
                            <div className='btn'>1</div>
                            <div className='btn'>1</div>
                            <div className='btn'>1</div>
                        </div>
                        <div className='row'>
                            <div className='btn'>1</div>
                            <div className='btn'>1</div>
                            <div className='btn'>1</div>
                            <div className='btn'>1</div>
                            <div className='btn'>1</div>
                        </div>
                        <div className='row'>
                            <div className='btn'>1</div>
                            <div className='btn'>1</div>
                            <div className='btn'>1</div>
                            <div className='btn'>1</div>
                            <div className='btn'>1</div>
                        </div>
                        <div className='row'>
                            <div className='btn'>1</div>
                            <div className='btn'>1</div>
                            <div className='btn'>1</div>
                            
                        </div>
                    </div>
                </Row>                
            </Container>        
        )
    }
}
export default Category;
